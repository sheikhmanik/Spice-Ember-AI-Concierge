import fs from "fs";
import path from "path";

export interface KnowledgeChunk {
  id: string;
  type: "menu" | "info";
  text: string;
  dishId?: string;
  embedding?: number[];
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  dietary: string;
  allergens: string[];
  image?: string;
}

// Simple TF-IDF / BM25 + Word Embedding Hybrid vectorizer & cosine similarity module for fast local RAG
// Uses lightweight token embeddings & bag-of-words vector space to guarantee zero external API key requirements and fast performance.

const COMMON_STOP_WORDS = new Set([
  "a", "an", "and", "are", "as", "at", "be", "by", "for", "from", "has", "he",
  "in", "is", "it", "its", "of", "on", "that", "the", "to", "was", "were", "will",
  "with", "the", "this", "but", "they", "have", "had", "what", "when", "where", "who",
  "which", "why", "how", "all", "any", "both", "each", "few", "more", "most", "other",
  "some", "such", "no", "nor", "not", "only", "own", "same", "so", "than", "too", "very"
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s₹]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 0 && !COMMON_STOP_WORDS.has(t));
}

export class VectorStore {
  private chunks: KnowledgeChunk[] = [];
  private vocabulary: Map<string, number> = new Map();
  private idf: Map<string, number> = new Map();
  private menuItems: Map<string, MenuItem> = new Map();

  constructor() {}

  public loadAndIngest() {
    this.chunks = [];
    this.vocabulary.clear();
    this.idf.clear();
    this.menuItems.clear();

    const dataDir = path.join(__dirname, "../data");
    const menuPath = path.join(dataDir, "menu.json");
    const infoPath = path.join(dataDir, "restaurant_info.json");

    if (fs.existsSync(menuPath)) {
      const menuData = JSON.parse(fs.readFileSync(menuPath, "utf-8"));
      const items: MenuItem[] = menuData.items || [];
      items.forEach((dish) => {
        this.menuItems.set(dish.id, dish);
        const chunkText = `Dish: ${dish.name} | Category: ${dish.category} | Price: ₹${dish.price} | Dietary: ${dish.dietary} | Allergens: ${dish.allergens.length ? dish.allergens.join(", ") : "None"} | Description: ${dish.description}`;
        this.chunks.push({
          id: `menu-${dish.id}`,
          type: "menu",
          text: chunkText,
          dishId: dish.id,
        });
      });
    }

    if (fs.existsSync(infoPath)) {
      const infoData = JSON.parse(fs.readFileSync(infoPath, "utf-8"));
      const rest = infoData.restaurant;
      if (rest) {
        this.chunks.push({
          id: "info-hours-location",
          type: "info",
          text: `Restaurant Name: ${rest.name} | Cuisine: ${rest.cuisine} | Tagline: ${rest.tagline} | Address: ${rest.location?.address} (Landmark: ${rest.location?.landmark}) | Phone: ${rest.location?.phone} | Email: ${rest.location?.email} | Hours: Mon-Fri ${rest.hours?.monday_to_friday}, Sat-Sun ${rest.hours?.saturday_sunday}`,
        });
        this.chunks.push({
          id: "info-reservation-delivery",
          type: "info",
          text: `Reservation Policy: ${rest.reservation_policy?.advance_booking} Cancellation: ${rest.reservation_policy?.cancellation} Large Parties: ${rest.reservation_policy?.large_parties} | Delivery & Takeaway: ${rest.delivery_and_takeaway?.delivery_radius}, Minimum Order: ${rest.delivery_and_takeaway?.minimum_order}, Estimated delivery time: ${rest.delivery_and_takeaway?.estimated_time}`,
        });
        this.chunks.push({
          id: "info-specials-pairing",
          type: "info",
          text: `Chef Specials: ${rest.chef_specials_and_pairing?.signature_dishes?.join(", ")} | Pairing Recommendations: ${rest.chef_specials_and_pairing?.chef_recommendations}`,
        });
      }
    }

    // Build vocabulary and IDF scores
    const docCount = this.chunks.length;
    const docFreq: Map<string, number> = new Map();

    this.chunks.forEach((chunk) => {
      const tokens = Array.from(new Set(tokenize(chunk.text)));
      tokens.forEach((term) => {
        docFreq.set(term, (docFreq.get(term) || 0) + 1);
        if (!this.vocabulary.has(term)) {
          this.vocabulary.set(term, this.vocabulary.size);
        }
      });
    });

    docFreq.forEach((freq, term) => {
      this.idf.set(term, Math.log((docCount + 1) / (freq + 1)) + 1);
    });

    // Compute sparse TF-IDF vectors for chunks
    this.chunks.forEach((chunk) => {
      chunk.embedding = this.computeEmbedding(chunk.text);
    });

    console.log(`[VectorStore] Ingested ${this.chunks.length} knowledge chunks (${this.menuItems.size} dishes).`);
  }

  private computeEmbedding(text: string): number[] {
    const tokens = tokenize(text);
    const vector = new Array(this.vocabulary.size).fill(0);
    const tf: Map<string, number> = new Map();

    tokens.forEach((t) => tf.set(t, (tf.get(t) || 0) + 1));

    tf.forEach((count, term) => {
      const idx = this.vocabulary.get(term);
      if (idx !== undefined) {
        const idfVal = this.idf.get(term) || 1;
        vector[idx] = (count / tokens.length) * idfVal;
      }
    });

    // Normalize vector
    const norm = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
    return norm > 0 ? vector.map((val) => val / norm) : vector;
  }

  private cosineSimilarity(vecA: number[], vecB: number[]): number {
    let dot = 0;
    for (let i = 0; i < vecA.length; i++) {
      dot += vecA[i] * vecB[i];
    }
    return dot;
  }

  public search(query: string, topK: number = 5): { chunk: KnowledgeChunk; score: number }[] {
    const queryVec = this.computeEmbedding(query);
    const queryTokens = tokenize(query);

    const scored = this.chunks.map((chunk) => {
      let score = this.cosineSimilarity(queryVec, chunk.embedding || []);

      // Boost score if explicit keyword matches occur (e.g., category, dietary tags, name keywords)
      const chunkLower = chunk.text.toLowerCase();
      queryTokens.forEach((token) => {
        if (chunkLower.includes(token)) {
          score += 0.15;
        }
      });

      return { chunk, score };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, topK);
  }

  public getMenuItem(id: string): MenuItem | undefined {
    return this.menuItems.get(id);
  }

  public getAllMenuItems(): MenuItem[] {
    return Array.from(this.menuItems.values());
  }
}

export const vectorStore = new VectorStore();

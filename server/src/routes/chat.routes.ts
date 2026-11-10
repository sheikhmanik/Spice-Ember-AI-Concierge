import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { vectorStore } from "../services/vectorStore";
import Groq from "groq-sdk";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequestBody {
  message: string;
  history: ChatMessage[];
}

interface MenuItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  dietary: string;
  allergens: string[];
  image: string;
}

interface RestaurantInfo {
  restaurant: {
    name: string;
    cuisine: string;
    tagline: string;
    hours: { monday_to_friday: string; saturday_sunday: string };
    location: { address: string; landmark: string; phone: string; email: string };
    reservation_policy: { advance_booking: string; cancellation: string; large_parties: string };
    delivery_and_takeaway: { delivery_radius: string; minimum_order: string; estimated_time: string };
    chef_specials_and_pairing: { signature_dishes: string[]; chef_recommendations: string };
  };
}

// Load JSON data files dynamically so Ember never suggests items that aren't on the menu.
const DATA_DIR = path.join(__dirname, "..", "data");
const MENU_PATH = path.join(DATA_DIR, "menu.json");
const INFO_PATH = path.join(DATA_DIR, "restaurant_info.json");

function loadJson<T>(filePath: string): T | null {
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

const menuData = loadJson<{ items: MenuItem[] }>(MENU_PATH);
const infoData = loadJson<RestaurantInfo>(INFO_PATH);

// Fallback quick-reference strings used only if the JSON files are unavailable at runtime.
const FALLBACK_MENU_QUICKREF = `
- Smoked Garlic Butter Naan (Starter) - ₹140 (Vegetarian)
- Woodfired Tandoori Fish (Starter) - ₹420 (Gluten-Free)
- Woodfired Lamb Rogan Josh (Main) - ₹720 (Gluten-Free)
- Tandoori Butter Chicken (Main) - ₹650 (Gluten-Free)
- Gulab Jamun (Dessert) - ₹180 (Vegetarian)
- Spiced Mango Lassi (Beverage) - ₹140 (Vegetarian)
`;

const FALLBACK_RESTAURANT_INFO = `RESTAURANT INFO:
- Hours: Mon-Fri 12:00 PM - 11:00 PM | Sat-Sun 11:30 AM - 11:30 PM
- Delivery & Takeaway: Delivery within 8 km. Free delivery on orders of ₹300 and above. Estimated time: 30-45 minutes.
- Reservations: Recommended up to 14 days in advance. Free cancellation up to 2 hours prior. Call directly for groups > 8.
- Location: 45 Flame & Spice Avenue, Metro City (+91 98765 43210).
- Signature Dishes: Hyderabadi Dum Biryani (₹580), Dal Makhani (₹420), Tandoori Tiger Prawns (₹680), Woodfired Lamb Rogan Josh (₹720), Tandoori Butter Chicken (₹650).`;

// Build the menu quick-reference dynamically from menu.json so it always matches the actual menu.
const menuQuickRef = menuData
  ? menuData.items
      .map((item) => `- ${item.name} (${item.category}) - ₹${item.price} (${item.dietary})`)
      .join("\n")
  : FALLBACK_MENU_QUICKREF;

// Build the restaurant info quick-reference dynamically from restaurant_info.json.
const restaurantInfoQuickRef = infoData
  ? [
      `RESTAURANT INFO:`,
      `- Hours: Mon-Fri ${infoData.restaurant.hours.monday_to_friday} | Sat-Sun ${infoData.restaurant.hours.saturday_sunday}`,
      `- Delivery & Takeaway: ${infoData.restaurant.delivery_and_takeaway.delivery_radius}. ${infoData.restaurant.delivery_and_takeaway.minimum_order}. Estimated time: ${infoData.restaurant.delivery_and_takeaway.estimated_time}.`,
      `- Reservations: ${infoData.restaurant.reservation_policy.advance_booking}. ${infoData.restaurant.reservation_policy.cancellation}. Call directly for groups > 8.`,
      `- Location: ${infoData.restaurant.location.address} (${infoData.restaurant.location.phone}).`,
      `- Signature Dishes: ${infoData.restaurant.chef_specials_and_pairing.signature_dishes.join(", ")}.`,
    ].join("\n")
  : FALLBACK_RESTAURANT_INFO;

export async function chatRoutes(app: FastifyInstance) {
  app.post("/api/chat", async (req: FastifyRequest<{ Body: ChatRequestBody }>, reply: FastifyReply) => {
    try {
      const { message, history = [] } = req.body;

      if (!message) {
        return reply.status(400).send({ error: "Message is required" });
      }

      const apiKey = process.env.GROQ_API_KEY;
      if (!apiKey) {
        return reply.status(500).send({ error: "Groq API key is missing on the server." });
      }

      // 1. Vector Search
      const cleanedMessage = message.replace(/[^a-zA-Z0-9\s]/g, " ").trim();
      let topKResults = vectorStore.search(cleanedMessage, 5);

      if (!topKResults || topKResults.length === 0) {
        topKResults = vectorStore.search("menu food starters main dessert", 5);
      }

      const searchContext = topKResults
        .map((res) => `• ${res.chunk.text} (Dish ID: ${res.chunk.dishId || "N/A"})`)
        .join("\n");

      // 2. Comprehensive Menu Quick-Reference (built dynamically from menu.json)
      const menuQuickRefStr = menuQuickRef.trim();

      // 3. Ultra-Precise System Prompt
      const systemPrompt = `You are Ember, the receptionist at Spice & Ember restaurant.

MASTER MENU REFERENCE:
${menuQuickRefStr}

${restaurantInfoQuickRef}

RELEVANT SEARCH DETAILS:
${searchContext}

STRICT RESPONSE RULES:
1. BREVITY: Keep answers 1-2 direct sentences max. No fluff or lengthy explanations.
2. AVAILABILITY & ITEMS:
   - If asked about an item we DO have (like chicken, naan, fish, lamb, dessert, lassi), reply with "Yes!" and list the dish name and price in ₹.
   - If asked about an item we DO NOT have (like beef, pork, sushi), reply directly: "No, we do not serve [item] at Spice & Ember."
   - If asked "What do you have?", briefly list 2-3 key dishes with prices.
3. SYNONYMS: Treat 'mutton' and 'lamb' as synonymous.
4. GROUNDING: ONLY confirm items that are explicitly listed in the MASTER MENU REFERENCE. If an item is not in the list, answer 'No, we do not serve [item] at Spice & Ember.'
5. SCOPE: You can assist with both menu items/prices AND restaurant details (location, hours, delivery policy, parking, and reservations). If asked about delivery, hours, or location, answer directly and concisely based on the restaurant info. Delivery IS free for orders ₹300 or above — always state this clearly when asked about delivery charges. You may answer questions about delivery, timings, location, and reservations with 100% accuracy based on the restaurant info above.
6. OUT OF SCOPE: Only refuse if asked about non-dining topics (coding, sports, weather).`;

      const recentHistory = history.slice(-2).map((msg) => ({
        role: msg.role === "user" ? ("user" as const) : ("assistant" as const),
        content: msg.content,
      }));

      const messages = [
        { role: "system" as const, content: systemPrompt },
        ...recentHistory,
        { role: "user" as const, content: message },
      ];

      const groq = new Groq({ apiKey });
      const completion = await groq.chat.completions.create({
        model: "qwen/qwen3.8-27b",
        messages,
        temperature: 0.1,
        max_tokens: 100,
      });

      const responseText = completion.choices[0]?.message?.content || "No response generated.";

      const recommendedDishIds = Array.from(
        new Set(
          topKResults
            .map((res) => res.chunk.dishId)
            .filter((id): id is string => Boolean(id))
        )
      );

      return reply.send({
        response: responseText,
        recommendedDishIds,
      });

    } catch (error: any) {
      app.log.error("Chat endpoint error: %s", error?.message || error);
      return reply.status(500).send({
        error: "Internal server error",
        details: error?.message || "Unknown error"
      });
    }
  });
}
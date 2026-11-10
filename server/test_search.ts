import { vectorStore } from "./src/services/vectorStore";
vectorStore.loadAndIngest();
const results = vectorStore.search("Hi, what do you have for dinner?", 5);
results.forEach((r, i) => console.log(`${i + 1}. [score=${r.score.toFixed(3)}] ${r.chunk.text}`));

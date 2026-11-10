"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const vectorStore_1 = require("../services/vectorStore");
// This script initializes the vector store by loading and ingesting menu data
// It's called at server startup to ensure the RAG system is ready
console.log("[embed_menu] Initializing vector store...");
try {
    vectorStore_1.vectorStore.loadAndIngest();
    console.log("[embed_menu] Vector store initialized successfully!");
    console.log(`[embed_menu] Ready for RAG queries with ${vectorStore_1.vectorStore.getAllMenuItems().length} menu items.`);
}
catch (error) {
    console.error("[embed_menu] Failed to initialize vector store:", error);
    process.exit(1);
}

# Spice & Ember AI Concierge 🌶️🔥

An intelligent, high-performance AI receptionist ("Ember") built for **Spice & Ember** woodfired restaurant. The system provides factual, concise, and zero-hallucination responses regarding menu items, pricing, dietary options, hours, location, and delivery policies.

---

## 🚀 Elevator Pitch
> "A full-stack AI Concierge application built with Next.js, Fastify, and Groq, utilizing a custom hybrid RAG pipeline with TF-IDF vector retrieval and fallback guardrails to deliver real-time, zero-hallucination restaurant inquiries."

---

## 🛠️ Tech Stack
* **Frontend**: Next.js, React, Tailwind CSS, real-time streaming UI with auto-scrolling.
* **Backend**: Fastify (TypeScript).
* **AI / LLM**: Groq API (utilizing high-speed LPU inference).
* **Data Sources**: Local JSON files (`menu.json`, `restaurant_info.json`).

---

## 🧠 Core Architecture & AI Features

1. **Custom TF-IDF Vector Search Engine (`server/src/services/vectorStore.ts`)**
   * An in-memory lexical similarity search engine that indexes local menu chunks and restaurant information on server startup without requiring heavy external vector databases.
2. **Hybrid RAG Pipeline**
   * **Retrieval**: Fetches relevant menu and policy chunks based on user queries.
   * **Fallback Guardrails**: Automatically triggers default menu categories if zero keyword matches are found (e.g., for broad or single-word queries), ensuring the prompt context is never empty.
   * **Augmentation & Grounding**: Dynamically injects retrieved context and strict system prompts into the LLM payload.
3. **Strict Guardrails & Prompt Engineering**
   * **Zero Hallucination**: Forces the AI to rely exclusively on the provided menu/info reference base.
   * **Brevity & Persona**: Capped token limits (`max_tokens: 100-120`) and low temperature enforce short, direct, 1-2 sentence host responses.
   * **Synonym Mapping**: Intelligent mapping of colloquial terms (e.g., mapping "mutton" directly to "Woodfired Lamb Rogan Josh").

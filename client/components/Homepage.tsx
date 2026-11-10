"use client";

import { useState } from "react";

export default function Homepage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! Welcome to Spice & Ember. Ask me anything about our menu, dietary options, or reservations!" }
  ]);
  const [inputQuery, setInputQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;

    const userMsg = inputQuery;
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setInputQuery("");
    setIsLoading(true);

    try {
      // Connects to your RAG backend endpoint later
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userMsg }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.answer || "Sorry, I couldn't fetch an answer right now." }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Our AI server is currently offline. Please try again in a moment." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-slate-800 bg-slate-950/80 backdrop-blur fixed top-0 w-full z-40">
        <div className="text-xl font-bold tracking-wide text-amber-500">
          Spice & Ember
        </div>
        <div className="flex gap-6 text-sm font-medium text-slate-300">
          <a href="#about" className="hover:text-amber-400 transition">About</a>
          <a href="#menu" className="hover:text-amber-400 transition">Menu</a>
          <a href="#contact" className="hover:text-amber-400 transition">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-36 pb-20 px-6 text-center max-w-4xl mx-auto">
        <span className="text-amber-500 font-semibold text-sm tracking-wider uppercase bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20">
          Crafted Woodfired Flavors
        </span>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mt-6 leading-tight">
          Experience Authentic Culinary Artistry
        </h1>
        <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
          From slow-roasted artisan dishes to curated organic sides, explore our fresh menu handcrafted daily.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <a
            href="#menu"
            className="px-6 py-3 bg-amber-500 text-slate-950 font-semibold rounded-lg hover:bg-amber-400 transition shadow-lg shadow-amber-500/20"
          >
            Explore Menu
          </a>
          <button
            onClick={() => setIsChatOpen(true)}
            className="px-6 py-3 bg-slate-800 text-slate-200 border border-slate-700 font-semibold rounded-lg hover:bg-slate-700 transition"
          >
            Ask AI Assistant ✨
          </button>
        </div>
      </header>

      {/* Highlights Grid */}
      <section id="about" className="py-16 px-6 max-w-6xl mx-auto border-t border-slate-900">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-800">
            <h3 className="text-lg font-bold text-amber-400">100% Organic Ingredients</h3>
            <p className="text-sm text-slate-400 mt-2">
              Sourced locally from sustainable farm partners within 50 kilometers.
            </p>
          </div>
          <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-800">
            <h3 className="text-lg font-bold text-amber-400">Dietary Inclusive</h3>
            <p className="text-sm text-slate-400 mt-2">
              Extensive vegan, gluten-free, and nut-allergy conscious preparation options.
            </p>
          </div>
          <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-800">
            <h3 className="text-lg font-bold text-amber-400">Instant AI Concierge</h3>
            <p className="text-sm text-slate-400 mt-2">
              Ask our intelligent web assistant for real-time allergen check and ingredient details.
            </p>
          </div>
        </div>
      </section>

      {/* Menu Preview Section */}
      <section id="menu" className="py-16 px-6 max-w-5xl mx-auto border-t border-slate-900">
        <h2 className="text-3xl font-bold text-center mb-10">Popular Menu Highlights</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="p-5 bg-slate-900 rounded-lg border border-slate-800 flex justify-between items-start">
            <div>
              <h4 className="font-semibold text-lg text-slate-100">Smoked Garlic Butter Naan</h4>
              <p className="text-xs text-slate-400 mt-1">Clay oven roasted whole wheat flatbread.</p>
              <span className="inline-block mt-3 text-xs bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded border border-emerald-500/20">Vegetarian</span>
            </div>
            <span className="font-bold text-amber-500">₹140</span>
          </div>
          <div className="p-5 bg-slate-900 rounded-lg border border-slate-800 flex justify-between items-start">
            <div>
              <h4 className="font-semibold text-lg text-slate-100">Woodfired Tandoori Fish</h4>
              <p className="text-xs text-slate-400 mt-1">Marinated fresh catch with house green chutney.</p>
              <span className="inline-block mt-3 text-xs bg-amber-500/10 text-amber-400 px-2.5 py-0.5 rounded border border-amber-500/20">Gluten-Free</span>
            </div>
            <span className="font-bold text-amber-500">₹420</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-8 text-center text-xs text-slate-500 border-t border-slate-900">
        <p>© 2026 Spice & Ember Restaurant. Built with Next.js & Fastify RAG Service.</p>
      </footer>

      {/* Floating Chat Widget Trigger */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 z-50 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold p-4 rounded-full shadow-xl flex items-center gap-2 transition-all transform hover:scale-105"
      >
        <span className="text-xl">💬</span>
        <span className="hidden sm:inline text-sm">Ask Menu AI</span>
      </button>

      {/* Chat Window Popup */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-50 flex flex-col h-[450px]">
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950 rounded-t-xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <h3 className="font-semibold text-sm text-slate-200">Spice & Ember AI</h3>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-slate-400 hover:text-slate-200 text-sm"
            >
              ✕
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.sender === "user"
                      ? "bg-amber-500 text-slate-950 font-medium"
                      : "bg-slate-800 text-slate-200 border border-slate-700"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 text-slate-400 border border-slate-700 rounded-lg p-3 text-xs italic">
                  Searching menu context...
                </div>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800 flex gap-2">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="e.g. Do you have gluten-free options?"
              className="flex-1 bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-3 py-2 rounded-md font-bold text-xs transition"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

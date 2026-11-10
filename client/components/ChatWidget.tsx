"use client";

import React, { useState, useEffect, useRef, FormEvent } from "react";
import { API_BASE_URL } from "@/lib/api";

interface Message {
  sender: "user" | "bot";
  text: string;
  recommendedDishIds?: string[];
}

interface ChatResponse {
  response: string;
  recommendedDishIds: string[];
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "Hello! Welcome to Spice & Ember. Ask me anything about our menu, dietary options, or reservations!" }
  ]);
  const [inputQuery, setInputQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentHistory, setCurrentHistory] = useState<{ role: string; content: string }[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;
  
    const userMsg = inputQuery.trim();
    const newHistory = [...currentHistory, { role: "user" as const, content: userMsg }];
  
    // Optimistically update UI with user message
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setInputQuery("");
    setIsLoading(true);
    setCurrentHistory(newHistory);
  
    try {
      const res = await fetch(`${API_BASE_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          history: newHistory,
        }),
      });
  
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.details || errData.error || `HTTP ${res.status}`);
      }
  
      const data = await res.json();
  
      // Append AI text response + pass dish IDs as data props
      if (data.response) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: data.response,
            recommendedDishIds: data.recommendedDishIds || [],
          },
        ]);
        setCurrentHistory((prev) => [
          ...prev,
          { role: "assistant" as const, content: data.response },
        ]);
      }
    } catch (err: any) {
      console.error("Chat API Error:", err);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: `Error connecting to AI: ${err.message || "Server offline"}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };  

  return (
    <>
      {/* Floating Chat Widget Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold p-4 rounded-full shadow-xl flex items-center gap-2 transition-all transform hover:scale-105"
      >
        <span className="text-xl">💬</span>
        <span className="hidden sm:inline text-sm">Ask Menu AI</span>
      </button>

      {/* Chat Window Popup */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-50 flex flex-col h-[450px]">
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950 rounded-t-xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <h3 className="font-semibold text-sm text-slate-200">Spice & Ember AI</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-200 text-sm"
            >
              ✕
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-sm">
            {messages.map((msg, idx) => (
              <div key={idx} className="...">
                <p className="text-sm">{msg.text}</p>

                {/* Interactive Dish Recommendations */}
                {msg.recommendedDishIds && msg.recommendedDishIds.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2 pt-2 border-t border-slate-800/80">
                    {msg.recommendedDishIds.map((dishId: string) => (
                      <a
                        key={dishId}
                        href={`/menu#${dishId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs px-2.5 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-md hover:bg-amber-500/20 transition flex items-center gap-1 font-medium"
                      >
                        <span>🍽️</span> View Dish #{dishId}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 flex items-center space-x-1.5">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                </div>
              </div>
            )}
            {/* Bottom anchor for auto-scroll */}
            <div ref={messagesEndRef} />
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
    </>
  );
}
"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CategoryFilter } from "@/components/CategoryFilter";
import { MenuCard } from "@/components/MenuCard";
import { ChatWidget } from "@/components/ChatWidget";

interface MenuItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  dietary: string;
  allergens: string[];
  image?: string;
}

interface MenuData {
  items: MenuItem[];
}

export default function MenuPage() {
  const [menuData, setMenuData] = useState<MenuData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/menu");
        if (!response.ok) {
          throw new Error("Failed to fetch menu data.");
        }
        const data = await response.json();
        setMenuData(data);
      } catch (err) {
        setError("Unable to load menu. Please make sure the backend server is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const filteredItems = menuData
    ? menuData.items.filter((item) => {
        const matchesCategory =
          selectedCategory === "All" || item.category.toLowerCase() === selectedCategory.toLowerCase();
        const matchesSearch =
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
    : [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col relative selection:bg-amber-500 selection:text-slate-950">
      <Navbar />

      {/* Hero Header Banner */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden border-b border-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format&fit=crop" 
            alt="Ambiance" 
            className="w-full h-full object-cover opacity-15 filter blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
          <span className="text-amber-500 font-semibold tracking-widest text-xs uppercase px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full inline-block">
            Culinary Offerings
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Explore Our <span className="text-amber-400">Crafted Menu</span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Every dish is prepared using organic ingredients sourced locally within 50km and roasted over authentic woodfire clay ovens.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="py-12 px-6 max-w-7xl mx-auto flex-1 w-full">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-400 text-sm">Crafting menu presentation...</p>
          </div>
        ) : error ? (
          <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl text-center max-w-md mx-auto my-12 text-red-400">
            {error}
          </div>
        ) : (
          <div className="space-y-8">
            {/* Filter & Search Controls */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-900">
              <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
              
              <div className="w-full md:w-72">
                <input
                  type="text"
                  placeholder="Search dishes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition"
                />
              </div>
            </div>

            {/* Grid Layout for Dishes */}
            {filteredItems.length === 0 ? (
              <div className="text-center py-16 text-slate-500">
                No culinary items found matching your filter criteria.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <MenuCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    category={item.category}
                    description={item.description}
                    price={item.price}
                    dietary={item.dietary}
                    allergens={item.allergens}
                    image={item.image}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
}

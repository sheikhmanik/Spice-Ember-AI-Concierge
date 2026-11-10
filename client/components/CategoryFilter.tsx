"use client";

import React from "react";

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = ["All", "Starters", "Mains", "Desserts", "Beverages"];

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {categories.map((cat) => {
        const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
        return (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
              isActive
                ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 font-semibold"
                : "bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-slate-700 hover:bg-slate-900"
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}

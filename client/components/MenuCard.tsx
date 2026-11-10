"use client";

import React, { useState } from "react";

interface MenuItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  dietary: string;
  allergens: string[];
  images?: string[];
  image?: string;
}

export function MenuCard({ 
  id, 
  name, 
  category, 
  description, 
  price, 
  dietary, 
  allergens = [], 
  images,
  image 
}: MenuItem) {
  const [showAllergenDetails, setShowAllergenDetails] = useState(false);
  
  // Collect all potential image URLs provided in the JSON
  const availableImages = [
    ...(images && images.length > 0 ? images : []),
    ...(image ? [image] : [])
  ];

  const [imgIndex, setImgIndex] = useState(0);
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    if (imgIndex < availableImages.length - 1) {
      setImgIndex(prev => prev + 1); // Try next image in the array
    } else {
      setHasError(true); // If all images fail, trigger the dummy food icon fallback
    }
  };

  return (
    <div className="p-5 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col justify-between gap-4 hover:border-amber-500/30 transition shadow-lg">
      <div className="space-y-3">
        <div className="aspect-video rounded-lg bg-slate-800/80 flex items-center justify-center overflow-hidden border border-slate-700/50">
          {!hasError && availableImages.length > 0 ? (
            <img 
              src={availableImages[imgIndex]} 
              alt={name} 
              onError={handleImageError}
              className="w-full h-full object-cover hover:scale-105 transition duration-300"
            />
          ) : (
            /* Professional Dummy Food Icon (Fork, Knife & Plate) */
            <div className="flex flex-col items-center justify-center gap-2 text-slate-500 select-none">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="w-12 h-12 stroke-current opacity-60" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth="1.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
              <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">Fresh Culinary Item</span>
            </div>
          )}
        </div>

        <div className="flex justify-between items-start gap-2">
          <div>
            <h4 className="font-bold text-lg text-slate-100">{name}</h4>
            <span className="text-xs text-amber-500/80 font-medium uppercase tracking-wider">{category}</span>
          </div>
          <span className="font-extrabold text-amber-400 text-lg whitespace-nowrap">₹{price}</span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
      </div>

      <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between">
        <span className={`inline-block text-xs px-2.5 py-0.5 rounded font-medium ${
          dietary === "Vegetarian" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
          dietary === "Vegan" ? "bg-teal-500/10 text-teal-400 border border-teal-500/20" :
          dietary === "Gluten-Free" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
          "bg-slate-800/20 text-slate-400 border border-slate-700/20"
        }`}>
          {dietary}
        </span>
        <button
          onClick={() => setShowAllergenDetails(!showAllergenDetails)}
          className="text-xs text-amber-400/90 hover:text-amber-300 hover:underline font-medium"
        >
          {showAllergenDetails ? "Hide Allergens" : "Allergens"}
        </button>
      </div>

      {showAllergenDetails && (
        <div className="text-xs pt-1">
          <span className={`inline-block px-2.5 py-1 rounded text-slate-300 ${
            allergens.length > 0 ? "bg-amber-500/10 border border-amber-500/20" : "bg-slate-800/40 border border-slate-700/30 text-slate-400"
          }`}>
            {allergens.length > 0 ? `Contains: ${allergens.join(", ")}` : "No common allergens"}
          </span>
        </div>
      )}
    </div>
  );
}

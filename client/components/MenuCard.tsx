"use client";

import React, { useState } from "react";
import Image from "next/image";

const PLACEHOLDER_IMAGE = "/images/placeholders/food-placeholder.jpg";

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
  const [imgSrc, setImgSrc] = useState(availableImages[0] || PLACEHOLDER_IMAGE);

  const handleImageError = () => {
    if (imgIndex < availableImages.length - 1) {
      const nextIndex = imgIndex + 1;
      setImgIndex(nextIndex); // Try next image in the array
      setImgSrc(availableImages[nextIndex]);
    } else if (imgSrc !== PLACEHOLDER_IMAGE) {
      setImgSrc(PLACEHOLDER_IMAGE); // If all images fail, fall back to the placeholder image
    }
  };

  return (
    <div className="p-5 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col justify-between gap-4 hover:border-amber-500/30 transition shadow-lg">
      <div className="space-y-3">
        <div className="relative aspect-video rounded-lg bg-slate-800/80 overflow-hidden border border-slate-700/50">
          <Image
            src={imgSrc}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={handleImageError}
            className="object-cover hover:scale-105 transition duration-300"
          />
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

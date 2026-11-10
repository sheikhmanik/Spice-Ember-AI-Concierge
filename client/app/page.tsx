"use client";

import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { ChatWidget } from "@/components/ChatWidget";
import { MenuCard } from "@/components/MenuCard";

export default function Homepage() {
  // Featured dishes from the menu data
  const featuredDishes = [
    {
      id: "starter-001",
      name: "Smoked Garlic Butter Naan",
      category: "Starters",
      description: "Clay oven roasted whole wheat flatbread brushed with smoked garlic butter and fresh cilantro.",
      price: 140,
      dietary: "Vegetarian",
      allergens: ["Dairy", "Gluten"],
      images: ["https://images.unsplash.com/photo-1601051099645-23b2f39a688c?q=80&w=800&auto=format&fit=crop"]
    },
    {
      id: "starter-002",
      name: "Woodfired Tandoori Fish",
      category: "Starters",
      description: "Marinated fresh catch with house green chutney, charred in a traditional clay oven.",
      price: 420,
      dietary: "Gluten-Free",
      allergens: ["Fish"],
      images: ["https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=800&auto=format&fit=crop"]
    },
    {
      id: "main-001",
      name: "Woodfired Lamb Rogan Josh",
      category: "Mains",
      description: "Slow-braised lamb in aromatic Kashmiri chili gravy, finished in the clay oven with fresh ginger.",
      price: 720,
      dietary: "Gluten-Free",
      allergens: [],
      images: ["https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop"]
    },
    {
      id: "main-002",
      name: "Tandoori Butter Chicken",
      category: "Mains",
      description: "Succulent boneless chicken in rich tomato-cashew gravy, finished with fenugreek and cream.",
      price: 650,
      dietary: "Gluten-Free",
      allergens: ["Dairy", "Nuts"],
      images: ["https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800&auto=format&fit=crop"]
    },
    {
      id: "dessert-001",
      name: "Gulab Jamun",
      category: "Desserts",
      description: "Soft milk-solid dumplings soaked in rose-scented sugar syrup, served warm with pistachio garnish.",
      price: 180,
      dietary: "Vegetarian",
      allergens: ["Dairy", "Nuts"],
      images: ["https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800&auto=format&fit=crop"]
    },
    {
      id: "beverage-001",
      name: "Spiced Mango Lassi",
      category: "Beverages",
      description: "Blended yogurt drink with ripe mango, cardamom, and a pinch of saffron.",
      price: 140,
      dietary: "Vegetarian",
      allergens: ["Dairy"],
      images: ["https://images.unsplash.com/photo-1553530666-ba11a7da3888?q=80&w=800&auto=format&fit=crop"]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-x-hidden">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <header className="relative pt-44 sm:pt-48 pb-16 sm:pb-24 px-4 sm:px-6 text-center max-w-5xl mx-auto">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
            alt="Woodfired restaurant ambiance with clay oven"
            className="w-full h-full object-cover opacity-50"
            style={{ filter: "brightness(0.5)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-slate-950/90 rounded-3xl"></div>
        </div>
        
        <div className="inline-block px-4 py-1.5 mb-4 rounded-full border border-amber-500/20 bg-amber-500/10">
          <span className="text-amber-500 font-semibold text-xs sm:text-sm tracking-wider uppercase">
            Woodfired Flavors Crafted with Care
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight">
          Experience Authentic <span className="text-amber-500">Culinary Artistry</span>
        </h1>
        
        <p className="mt-4 text-base sm:text-xl text-slate-400 max-w-2xl mx-auto px-2">
          From slow-roasted artisan dishes to curated organic sides, explore our fresh menu handcrafted daily using 100% organic locally sourced ingredients.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4 px-4">
          <Link
            href="/menu"
            className="px-8 py-4 bg-amber-500 text-slate-950 font-semibold rounded-lg hover:bg-amber-400 transition shadow-lg shadow-amber-500/20 text-base sm:text-lg text-center"
          >
            Explore Full Menu
          </Link>
          <Link
            href="/contact"
            className="px-8 py-4 bg-slate-900 text-slate-100 font-semibold rounded-lg border border-slate-800 hover:bg-slate-800 transition text-base sm:text-lg text-center"
          >
            Book a Table
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-4 max-w-lg mx-auto text-center border-t border-slate-800/80 pt-8">
          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-bold text-amber-500">100%</span>
            <span className="text-xs sm:text-sm text-slate-400">Organic</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-bold text-amber-500">50km</span>
            <span className="text-xs sm:text-sm text-slate-400">Local Sourcing</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-bold text-amber-500">24/7</span>
            <span className="text-xs sm:text-sm text-slate-400">AI Concierge</span>
          </div>
        </div>
      </header>

      {/* Featured Dishes Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Dishes</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
            Handpicked selections from our menu, crafted to showcase the best of our woodfired cuisine.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredDishes.map((dish) => (
            <MenuCard
              key={dish.id}
              id={dish.id}
              name={dish.name}
              category={dish.category}
              description={dish.description}
              price={dish.price}
              dietary={dish.dietary}
              allergens={dish.allergens}
              images={dish.images}
            />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/menu"
            className="inline-block px-6 py-3 bg-slate-900 text-slate-100 font-semibold rounded-lg border border-slate-800 hover:bg-slate-800 transition"
          >
            View Complete Menu
          </Link>
        </div>
      </section>

      {/* About Teaser Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-slate-950/50 border-y border-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-slate-400 mb-4 text-sm sm:text-base">
                Founded in 2020, Spice & Ember began as a passion project to bring authentic woodfired flavors to urban diners. Our journey started in a small kitchen, but our commitment to quality and tradition has never wavered.
              </p>
              <p className="text-slate-400 mb-6 text-sm sm:text-base">
                Today, we source 100% of our ingredients from local organic farms within 50 kilometers, ensuring freshness and supporting our community. Every dish is crafted using traditional techniques passed down through generations.
              </p>
              <Link
                href="/about"
                className="inline-block px-6 py-3 bg-amber-500 text-slate-950 font-semibold rounded-lg hover:bg-amber-400 transition"
              >
                Learn More About Us
              </Link>
            </div>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-amber-700 rounded-2xl blur-lg opacity-20"></div>
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop"
                  alt="Spice & Ember Woodfire Kitchen"
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
              </div>
              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-slate-900/90 backdrop-blur-md p-4 sm:p-5 rounded-xl border border-slate-800 shadow-xl hidden sm:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-xl">
                    👨‍🍳
                  </div>
                  <div>
                    <div className="text-xs text-amber-400 font-medium uppercase tracking-wider">Master Chef</div>
                    <div className="font-semibold text-slate-100">25+ Years Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">What Our Guests Say</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
            Don't just take our word for it. Here's what our valued customers have to say about their dining experience.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-slate-900/50 p-6 sm:p-8 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center">
                <span className="text-xl">👩</span>
              </div>
              <div>
                <div className="font-semibold">Sarah Johnson</div>
                <div className="text-sm text-slate-400">Regular Customer</div>
              </div>
            </div>
            <p className="text-slate-300 italic text-sm sm:text-base">
              "The woodfired lamb was absolutely incredible! The flavors were so authentic and the service was top-notch. I'll definitely be coming back."
            </p>
            <div className="mt-4 flex text-amber-500">★★★★★</div>
          </div>
          <div className="bg-slate-900/50 p-6 sm:p-8 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center">
                <span className="text-xl">👨</span>
              </div>
              <div>
                <div className="font-semibold">Rahul Sharma</div>
                <div className="text-sm text-slate-400">Food Critic</div>
              </div>
            </div>
            <p className="text-slate-300 italic text-sm sm:text-base">
              "Spice & Ember has redefined fine dining in our city. The attention to detail in every dish is remarkable. A truly exceptional experience!"
            </p>
            <div className="mt-4 flex text-amber-500">★★★★★</div>
          </div>
          <div className="bg-slate-900/50 p-6 sm:p-8 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center">
                <span className="text-xl">👩</span>
              </div>
              <div>
                <div className="font-semibold">Emily Chen</div>
                <div className="text-sm text-slate-400">First-time Visitor</div>
              </div>
            </div>
            <p className="text-slate-300 italic text-sm sm:text-base">
              "The AI concierge was incredibly helpful! They helped me choose the perfect dish for my dietary needs. The food was delicious and the atmosphere was perfect for a romantic dinner."
            </p>
            <div className="mt-4 flex text-amber-500">★★★★★</div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-r from-amber-500/10 to-slate-900/10 border-y border-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-bold mb-6">Ready to Experience Culinary Excellence?</h2>
          <p className="text-base sm:text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Book your table now and embark on a culinary journey that celebrates tradition, sustainability, and exceptional flavor.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 bg-amber-500 text-slate-950 font-semibold rounded-lg hover:bg-amber-400 transition shadow-lg shadow-amber-500/20 text-lg text-center"
            >
              Reserve Your Table
            </Link>
            <Link
              href="/menu"
              className="px-8 py-4 bg-slate-900 text-slate-100 font-semibold rounded-lg border border-slate-800 hover:bg-slate-800 transition text-lg text-center"
            >
              View Our Menu
            </Link>
          </div>
          <div className="mt-8 text-xs sm:text-sm text-slate-500 space-y-1">
            <p>✓ Free cancellation up to 2 hours before reservation</p>
            <p>✓ Instant confirmation</p>
            <p>✓ Special dietary accommodations available</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-xs text-slate-500 border-t border-slate-900 px-4">
        <p>© 2026 Spice & Ember Restaurant. Built with Next.js & Fastify.</p>
      </footer>

      <ChatWidget />
    </div>
  );
}

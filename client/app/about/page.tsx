import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatWidget } from "@/components/ChatWidget";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      <Navbar />

      <main className="pt-36 pb-20 px-6 max-w-4xl mx-auto flex-1 w-full">
        <div className="text-center mb-12">
          <span className="text-amber-500 font-semibold text-sm tracking-wider uppercase bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20">
            Our Heritage & Passion
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-6">
            About Spice & Ember
          </h1>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-base">
            Where traditional woodfired techniques meet modern culinary innovations.
          </p>
        </div>

        <div className="space-y-12">
          <section className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 space-y-4">
            <h2 className="text-2xl font-bold text-amber-400">Our Story</h2>
            <p className="text-slate-300 leading-relaxed">
              Founded in 2020, Spice & Ember was born out of a deep reverence for authentic clay oven and open-flame cooking. We believe that true flavor is forged in fire—combining age-old marinades with modern gastronomy to deliver an unforgettable dining experience.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Every dish is crafted from scratch daily using 100% organic, ethically sourced ingredients from regional farm partners within 50 kilometers of our kitchen.
            </p>
          </section>

          <section className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-900/40 p-6 rounded-xl border border-slate-800 text-center">
              <div className="text-3xl mb-3">🔥</div>
              <h3 className="font-bold text-slate-100 text-lg">Clay Oven Artisan</h3>
              <p className="text-xs text-slate-400 mt-2">
                Handcrafted tandoori breads, roasted tender meats, and smoky charred vegetables.
              </p>
            </div>
            <div className="bg-slate-900/40 p-6 rounded-xl border border-slate-800 text-center">
              <div className="text-3xl mb-3">🌱</div>
              <h3 className="font-bold text-slate-100 text-lg">Farm Fresh</h3>
              <p className="text-xs text-slate-400 mt-2">
                Seasonal organic produce delivered fresh every morning from local partner farms.
              </p>
            </div>
            <div className="bg-slate-900/40 p-6 rounded-xl border border-slate-800 text-center">
              <div className="text-3xl mb-3">✨</div>
              <h3 className="font-bold text-slate-100 text-lg">Dietary Inclusive</h3>
              <p className="text-xs text-slate-400 mt-2">
                Carefully labeled menus with vegan, gluten-free, and allergen-safe preparations.
              </p>
            </div>
          </section>

          <div className="text-center pt-6">
            <Link
              href="/menu"
              className="px-8 py-3 bg-amber-500 text-slate-950 font-bold rounded-lg hover:bg-amber-400 transition inline-block"
            >
              Explore Our Menu
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
}

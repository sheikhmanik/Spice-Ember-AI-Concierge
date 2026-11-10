"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatWidget } from "@/components/ChatWidget";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      <Navbar />

      <main className="pt-36 pb-20 px-6 max-w-4xl mx-auto flex-1 w-full">
        <div className="text-center mb-12">
          <span className="text-amber-500 font-semibold text-sm tracking-wider uppercase bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-6">
            Contact & Reservations
          </h1>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-base">
            We would love to host you! Reach out for reservations, private dining events, or general inquiries.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Info Card */}
          <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 space-y-6">
            <h2 className="text-2xl font-bold text-amber-400">Visit Us</h2>
            
            <div className="space-y-4 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <span className="text-xl">📍</span>
                <div>
                  <p className="font-semibold text-slate-100">Address</p>
                  <p className="text-slate-400 text-xs mt-0.5">123 Culinary Lane, Fort, Mumbai 400001</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-xl">📞</span>
                <div>
                  <p className="font-semibold text-slate-100">Phone</p>
                  <p className="text-slate-400 text-xs mt-0.5">+91 22 1234 5678</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-xl">✉️</span>
                <div>
                  <p className="font-semibold text-slate-100">Email</p>
                  <p className="text-slate-400 text-xs mt-0.5">hello@spiceandember.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-xl">🕒</span>
                <div>
                  <p className="font-semibold text-slate-100">Hours of Operation</p>
                  <p className="text-slate-400 text-xs mt-0.5">Lunch: 11:00 AM – 3:00 PM</p>
                  <p className="text-slate-400 text-xs">Dinner: 6:00 PM – 11:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800">
            <h2 className="text-2xl font-bold text-amber-400 mb-6">Send Message</h2>
            {submitted ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6 text-center space-y-3">
                <span className="text-4xl">🎉</span>
                <h3 className="text-lg font-bold text-emerald-400">Thank You!</h3>
                <p className="text-xs text-slate-300">
                  Your message has been received. Our team will get back to you shortly.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", message: "" }); }}
                  className="px-4 py-2 bg-slate-800 text-xs text-slate-200 rounded-lg hover:bg-slate-700 transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Message</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Reserve a table for 4 or ask a question..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-lg transition"
                >
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
}

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        {/* Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-amber-500 font-bold text-xl">
            <span className="text-2xl">🔥</span> Spice & Ember
          </div>
          <p className="text-slate-400 text-xs leading-relaxed">
            Woodfired flavors crafted with care. Experience authentic culinary artistry in every dish, featuring 100% organic locally sourced ingredients.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-slate-200 font-semibold mb-3 text-base">Quick Links</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/" className="hover:text-amber-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/menu" className="hover:text-amber-400 transition">
                Explore Menu
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-amber-400 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-amber-400 transition">
                Contact & Location
              </Link>
            </li>
          </ul>
        </div>

        {/* Opening Hours */}
        <div>
          <h4 className="text-slate-200 font-semibold mb-3 text-base">Opening Hours</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><span className="text-slate-300 font-medium">Lunch:</span> 11:00 AM - 3:00 PM</li>
            <li><span className="text-slate-300 font-medium">Dinner:</span> 6:00 PM - 11:00 PM</li>
            <li><span className="text-slate-300 font-medium">Open Daily:</span> Mon - Sun</li>
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h4 className="text-slate-200 font-semibold mb-3 text-base">Contact Us</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>📍 123 Culinary Lane, Mumbai 400001</li>
            <li>📞 +91 22 1234 5678</li>
            <li>✉️ hello@spiceandember.com</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        <p>© 2026 Spice & Ember Restaurant. All rights reserved.</p>
      </div>
    </footer>
  );
}

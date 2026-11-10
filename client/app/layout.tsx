import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spice & Ember | Woodfired Kitchen & AI Concierge",
  description:
    "Experience authentic culinary artistry with slow-roasted woodfired dishes. Chat live with Ember, our AI concierge, for menu recommendations and reservations.",
  openGraph: {
    title: "Spice & Ember | Woodfired Kitchen & AI Concierge",
    description:
      "Experience authentic culinary artistry with slow-roasted woodfired dishes. Chat live with Ember, our AI concierge, for menu recommendations and reservations.",
    type: "website",
    locale: "en_US",
    siteName: "Spice & Ember",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spice & Ember | Woodfired Kitchen & AI Concierge",
    description:
      "Experience authentic culinary artistry with slow-roasted woodfired dishes. Chat live with Ember, our AI concierge, for menu recommendations and reservations.",
  },
  metadataBase: new URL("https://spice-ember.example.com"),
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#d97706",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/providers/LenisProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/layout/CustomCursor";
import PageTransition from "@/components/layout/PageTransition";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Hotel Roma Kristo | Luxury Hotel in Dwarka, Gujarat",
    template: "%s | Hotel Roma Kristo",
  },
  description:
    "Experience luxury hospitality at Hotel Roma Kristo in Dwarka, Gujarat. Premium rooms, exceptional service, and a prime location near Dwarkadhish Temple. Book your stay today.",
  keywords: [
    "Hotel Roma Kristo",
    "Dwarka hotel",
    "Gujarat hotel",
    "luxury hotel Dwarka",
    "hotel near Dwarkadhish Temple",
    "Jamnagar hotel",
    "premium hotel Gujarat",
  ],
  openGraph: {
    title: "Hotel Roma Kristo | Luxury Hotel in Dwarka, Gujarat",
    description:
      "Where comfort meets elegance. Premium hospitality in the heart of Dwarka.",
    type: "website",
    locale: "en_IN",
    siteName: "Hotel Roma Kristo",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-inter antialiased">
        <LenisProvider>
          <CustomCursor />
          <Navbar />
          <PageTransition>
            <main>{children}</main>
          </PageTransition>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}

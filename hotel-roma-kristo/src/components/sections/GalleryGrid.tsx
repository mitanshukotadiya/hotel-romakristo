"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedText from "@/components/ui/AnimatedText";

import Image from "next/image";

// Gallery items
// Gallery items with unique IDs
const galleryItems = [
  { id: "hero_2", category: "exterior", title: "Hotel Exterior" },
  { id: "reception_2", category: "lobby", title: "Reception Area" },
  { id: "room_1", category: "rooms", title: "Premium Suite" },
  { id: "dining_1", category: "dining", title: "Dining Hall" },
  { id: "seating_1", category: "lobby", title: "Lounge Area" },
  { id: "room_3", category: "rooms", title: "Deluxe Bedroom" },
  { id: "food_1", category: "dining", title: "Gourmet Cuisine" },
  { id: "hero_3", category: "exterior", title: "Hotel View" },
  { id: "room_5", category: "rooms", title: "Comfortable Stay" },
  { id: "lobby_2", category: "lobby", title: "Elegant Lobby" },
  { id: "room_8", category: "rooms", title: "Suite View" },
  { id: "dining_2", category: "dining", title: "Restaurant" },
  { id: "food_3", category: "dining", title: "Authentic Dishes" },
  { id: "reception_1", category: "lobby", title: "Welcome Desk" },
  { id: "ground_floor", category: "exterior", title: "Main Entrance" },
];

const categories = ["All", "Rooms", "Lobby", "Dining", "Exterior"];

export default function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxId, setLightboxId] = useState<string | null>(null);

  const filteredItems =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory.toLowerCase());

  return (
    <section className="section-padding bg-cream" id="gallery-grid">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="accent-label text-muted mb-4">Gallery</p>
          <div className="gold-line mx-auto mb-8" />
          <AnimatedText
            text="Explore Our Hotel"
            tag="h2"
            className="font-playfair text-4xl md:text-5xl text-charcoal"
          />
        </div>

        {/* Filter Bar */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 font-inter text-sm tracking-wider transition-all duration-300 rounded-sm ${
                activeCategory === cat
                  ? "bg-gold text-charcoal"
                  : "bg-transparent text-muted border border-muted/20 hover:border-gold hover:text-gold"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
            >
              {filteredItems.map((item, i) => (
                <motion.div
                  key={`${item.id}-${i}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative overflow-hidden rounded-sm bg-charcoal/5 cursor-pointer break-inside-avoid"
                  onClick={() => setLightboxId(item.id)}
                >
                  <div className="w-full">
                    <Image
                      src={`/images/${item.id}.jpg`}
                      alt={item.title}
                      width={800}
                      height={800}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      quality={85}
                    />
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-all duration-500 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="w-12 h-12 mx-auto rounded-full border-2 border-cream flex items-center justify-center mb-2">
                        <svg className="w-5 h-5 text-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                      <span className="accent-label text-cream">{item.title}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center p-4"
            onClick={() => setLightboxId(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-5xl h-[85vh] rounded-lg overflow-hidden flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={`/images/${lightboxId}.jpg`}
                alt="Full Photo"
                fill
                className="object-contain"
                quality={100}
                priority
              />
              <button
                onClick={() => setLightboxId(null)}
                className="absolute top-4 right-4 w-12 h-12 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-gold hover:text-charcoal transition-colors z-10"
                aria-label="Close lightbox"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

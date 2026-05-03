"use client";

import { useRef } from "react";
import Image from "next/image";
import GalleryGrid from "@/components/sections/GalleryGrid";
import AnimatedText from "@/components/ui/AnimatedText";
import { useParallax } from "@/hooks/useScrollAnimation";

export default function GalleryPageContent() {
  const heroImageRef = useRef<HTMLDivElement>(null);
  useParallax(heroImageRef, 50);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div ref={heroImageRef} className="absolute inset-0 -top-12 -bottom-12">
          <Image
            src="/images/gallery_hero_new.jpg"
            alt="Gallery"
            fill
            className="object-cover"
            priority
            quality={85}
          />
        </div>
        <div className="absolute inset-0 bg-charcoal/60" />
        <div className="relative z-10 text-center">
          <p className="accent-label text-cream/70 mb-4">Visual Tour</p>
          <AnimatedText
            text="Our Gallery"
            tag="h1"
            className="font-playfair text-5xl md:text-7xl text-cream"
          />
        </div>
      </section>

      {/* Gallery Grid */}
      <GalleryGrid />
    </>
  );
}

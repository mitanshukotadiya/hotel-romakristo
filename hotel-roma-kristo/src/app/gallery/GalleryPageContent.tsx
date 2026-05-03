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
      <section className="relative h-[60vh] overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-charcoal/20" />
        <div className="absolute bottom-12 right-6 md:bottom-16 md:right-16 z-10 text-right max-w-lg">
          <p className="accent-label text-cream/80 mb-2 flex justify-end">Visual Tour</p>
          <AnimatedText
            text="Our Gallery"
            tag="h1"
            className="font-playfair text-4xl md:text-5xl lg:text-6xl text-cream leading-tight py-2"
          />
        </div>
      </section>

      {/* Gallery Grid */}
      <GalleryGrid />
    </>
  );
}

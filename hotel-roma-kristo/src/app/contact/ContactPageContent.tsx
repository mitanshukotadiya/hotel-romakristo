"use client";

import { useRef } from "react";
import Image from "next/image";
import ContactForm from "@/components/sections/ContactForm";
import AnimatedText from "@/components/ui/AnimatedText";
import { useParallax } from "@/hooks/useScrollAnimation";

export default function ContactPageContent() {
  const heroImageRef = useRef<HTMLDivElement>(null);
  useParallax(heroImageRef, 50);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] overflow-hidden">
        <div ref={heroImageRef} className="absolute inset-0 -top-12 -bottom-12">
          <Image
            src="/images/contact_hero_new.jpg"
            alt="Contact Us"
            fill
            className="object-cover"
            priority
            quality={85}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-charcoal/20" />
        <div className="absolute bottom-8 right-6 md:bottom-12 md:right-16 z-10 text-right max-w-lg">
          <p className="accent-label text-cream/80 mb-2 flex justify-end">Reach Out</p>
          <AnimatedText
            text="Contact Us"
            tag="h1"
            className="font-playfair text-4xl md:text-5xl lg:text-6xl text-cream leading-tight py-2"
          />
        </div>
      </section>

      {/* Contact Form */}
      <ContactForm />
    </>
  );
}

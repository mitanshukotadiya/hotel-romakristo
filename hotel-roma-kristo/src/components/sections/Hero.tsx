"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !imageRef.current || !textRef.current) return;

    // Parallax on hero image
    gsap.to(imageRef.current, {
      y: 150,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Text entrance animation
    const words = textRef.current.querySelectorAll(".hero-word");
    gsap.fromTo(
      words,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.5,
      }
    );

    // Subtitle and CTA
    gsap.fromTo(
      textRef.current.querySelectorAll(".hero-sub"),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 1.2 }
    );
  }, []);

  const headlineWords = "Where Comfort Meets Elegance".split(" ");

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
      id="hero"
    >
      {/* Background Image */}
      <div ref={imageRef} className="absolute inset-0 -top-20 -bottom-20">
        <Image
          src="/images/hero_2.jpg"
          alt="Hotel Roma Kristo - Luxury Hotel in Dwarka"
          fill
          className="object-cover"
          priority
          quality={90}
        />
      </div>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-charcoal/20" />

      {/* Content */}
      <div ref={textRef} className="relative z-10 text-center px-6 max-w-4xl">
        <p className="hero-sub accent-label text-cream/70 mb-6">
          ✦ Premium Hospitality in Dwarka ✦
        </p>

        <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl text-cream leading-[1.1] mb-6">
          {headlineWords.map((word, i) => (
            <span
              key={i}
              className="hero-word inline-block opacity-0 mx-[0.15em]"
            >
              {word}
            </span>
          ))}
        </h1>

        <p className="hero-sub font-inter text-cream/70 text-lg md:text-xl tracking-wide mb-10">
          Hotel Roma Kristo, Dwarka
        </p>

        <div className="hero-sub">
          <Button href="/rooms" variant="outline" className="border-cream/50 text-cream hover:text-charcoal">
            <span>Explore Rooms</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="accent-label text-cream/40 text-[10px]">Scroll</span>
        <div className="w-px h-12 relative overflow-hidden">
          <div className="w-full h-full bg-cream/20" />
          <div className="absolute top-0 w-full h-1/2 bg-gold animate-bounce-slow" />
        </div>
      </div>
    </section>
  );
}

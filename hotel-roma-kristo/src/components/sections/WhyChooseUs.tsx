"use client";

import { useRef } from "react";
import { useStaggerReveal } from "@/hooks/useScrollAnimation";
import AnimatedText from "@/components/ui/AnimatedText";

const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    title: "Prime Location",
    description:
      "Situated in the heart of Dwarka, just minutes from the famous Dwarkadhish Temple and major attractions.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    title: "Comfortable Rooms",
    description:
      "Spacious, well-appointed rooms with modern amenities designed for your ultimate comfort and relaxation.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
    title: "Best Service",
    description:
      "Our dedicated team ensures personalized service and attention to detail throughout your stay.",
  },
];

export default function WhyChooseUs() {
  const gridRef = useRef<HTMLDivElement>(null);
  useStaggerReveal(gridRef, ".stagger-child");

  return (
    <section className="section-padding bg-warm-white" id="why-choose-us">
      <div className="max-w-7xl mx-auto text-center">
        <p className="accent-label text-muted mb-4">Why Choose Us</p>
        <div className="gold-line mx-auto mb-8" />

        <AnimatedText
          text="Experience The Difference"
          tag="h2"
          className="font-playfair text-4xl md:text-5xl text-charcoal mb-16"
        />

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, i) => (
            <div
              key={i}
              className="stagger-child bg-cream/50 p-10 rounded-sm border border-gold/10 hover:border-gold/30 transition-all duration-500 group"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-cream transition-all duration-500">
                {feature.icon}
              </div>
              <h3 className="font-playfair text-xl text-charcoal mb-3">
                {feature.title}
              </h3>
              <p className="font-inter text-sm text-muted leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

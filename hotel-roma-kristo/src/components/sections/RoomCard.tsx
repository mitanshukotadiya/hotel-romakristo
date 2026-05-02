"use client";

import { useRef } from "react";
import Image from "next/image";
import { useImageReveal } from "@/hooks/useScrollAnimation";
import Button from "@/components/ui/Button";

interface RoomCardProps {
  name: string;
  description: string;
  amenities: string[];
  image: string;
  price?: string;
}

export default function RoomCard({ name, description, amenities, image, price }: RoomCardProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  useImageReveal(imageRef);

  return (
    <div className="group bg-warm-white rounded-sm overflow-hidden border border-gold/10 hover:border-gold/30 transition-all duration-500">
      {/* Image */}
      <div ref={imageRef} className="clip-reveal relative aspect-[4/3] w-full overflow-hidden bg-charcoal/5 flex items-center justify-center">
        <Image
          src={image}
          alt={name}
          fill
          className="object-contain p-2 transition-transform duration-700 group-hover:scale-105"
          quality={85}
        />
      </div>

      {/* Content */}
      <div className="p-8">
        <h3 className="font-playfair text-2xl text-charcoal mb-3">{name}</h3>
        <p className="font-inter text-sm text-muted leading-relaxed mb-5">
          {description}
        </p>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-6">
          {amenities.map((amenity, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-cream text-muted text-xs font-inter rounded-sm border border-gold/10"
            >
              {amenity}
            </span>
          ))}
        </div>

        <Button href="/contact" variant="ghost" className="px-0 text-gold hover:text-gold-dark">
          <span>View Details</span>
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Button>
      </div>
    </div>
  );
}

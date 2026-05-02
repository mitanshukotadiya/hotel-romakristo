"use client";

import { useRef } from "react";
import Image from "next/image";
import { useSlideIn } from "@/hooks/useScrollAnimation";

interface ServiceRowProps {
  index: number;
  icon: string;
  title: string;
  description: string;
  image: string;
  reverse?: boolean;
}

export default function ServiceRow({ index, icon, title, description, image, reverse = false }: ServiceRowProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useSlideIn(textRef, reverse ? "right" : "left");
  useSlideIn(imageRef, reverse ? "left" : "right");

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${reverse ? "lg:direction-rtl" : ""}`}>
      {/* Image */}
      <div
        ref={imageRef}
        className={`relative aspect-[4/3] overflow-hidden rounded-sm ${reverse ? "lg:order-2" : "lg:order-1"}`}
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          quality={80}
        />
        {/* Floating number */}
        <div className="absolute top-6 left-6 font-playfair text-7xl text-gold/20 leading-none select-none">
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      {/* Text */}
      <div ref={textRef} className={`${reverse ? "lg:order-1 lg:text-right" : "lg:order-2"}`}>
        <span className="text-4xl mb-4 block">{icon}</span>
        <h3 className="font-playfair text-3xl md:text-4xl text-charcoal mb-4">{title}</h3>
        <div className="gold-line mb-6" style={reverse ? { marginLeft: "auto" } : {}} />
        <p className="font-inter text-muted leading-relaxed max-w-md" style={reverse ? { marginLeft: "auto" } : {}}>
          {description}
        </p>
      </div>
    </div>
  );
}

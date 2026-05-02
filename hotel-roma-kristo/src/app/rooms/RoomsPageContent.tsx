"use client";

import { useRef } from "react";
import Image from "next/image";
import RoomCard from "@/components/sections/RoomCard";
import AnimatedText from "@/components/ui/AnimatedText";
import { useParallax } from "@/hooks/useScrollAnimation";

const rooms = [
  {
    name: "Standard Room",
    description:
      "A cozy, well-equipped room perfect for solo travelers and couples. Enjoy modern amenities in a clean, comfortable setting.",
    amenities: ["AC", "TV", "Wi-Fi", "Hot Water", "Room Service"],
    image: "/images/room_2.jpg",
  },
  {
    name: "Deluxe Room",
    description:
      "Spacious and elegantly designed with premium bedding, a city view, and enhanced amenities for a luxurious stay.",
    amenities: ["AC", "TV", "Wi-Fi", "City View", "Premium Bedding", "Mini Bar"],
    image: "/images/room_3.jpg",
  },
  {
    name: "Suite",
    description:
      "Our finest accommodation featuring a separate living area, premium amenities, and the ultimate in comfort and style.",
    amenities: ["AC", "TV", "Wi-Fi", "Living Area", "Premium Amenities", "Room Service", "City View"],
    image: "/images/room_1.jpg",
  },
];

export default function RoomsPageContent() {
  const heroImageRef = useRef<HTMLDivElement>(null);
  useParallax(heroImageRef, 50);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div ref={heroImageRef} className="absolute inset-0 -top-12 -bottom-12">
          <Image
            src="/images/room_4.jpg"
            alt="Our Rooms"
            fill
            className="object-cover"
            priority
            quality={85}
          />
        </div>
        <div className="absolute inset-0 bg-charcoal/60" />
        <div className="relative z-10 text-center">
          <p className="accent-label text-cream/70 mb-4">Accommodation</p>
          <AnimatedText
            text="Our Rooms"
            tag="h1"
            className="font-playfair text-5xl md:text-7xl text-cream"
          />
        </div>
      </section>

      {/* Room Cards */}
      <section className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="accent-label text-muted mb-4">Choose Your Stay</p>
            <div className="gold-line mx-auto mb-8" />
            <p className="font-inter text-muted max-w-2xl mx-auto">
              Each room is thoughtfully designed to provide the perfect balance of comfort
              and elegance, ensuring a memorable stay in Dwarka.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rooms.map((room, i) => (
              <RoomCard key={i} {...room} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

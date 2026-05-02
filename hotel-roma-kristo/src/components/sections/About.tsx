"use client";

import Image from "next/image";
import ImageReveal from "@/components/ui/ImageReveal";
import AnimatedText from "@/components/ui/AnimatedText";
import CountUp from "@/components/ui/CountUp";

export default function About() {
  return (
    <section className="section-padding bg-cream" id="about">
      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <p className="accent-label text-muted mb-4">About Us</p>
        <div className="gold-line mb-12" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <ImageReveal className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <Image
              src="/images/reception_1.jpg"
              alt="Hotel Roma Kristo Interior"
              fill
              className="object-cover"
              quality={85}
            />
          </ImageReveal>

          {/* Text */}
          <div>
            <AnimatedText
              text="A Legacy of Luxury & Warmth"
              tag="h2"
              className="font-playfair text-4xl md:text-5xl text-charcoal leading-tight"
            />

            <div className="mt-8 space-y-5">
              <p className="font-inter text-muted leading-relaxed">
                Nestled in the sacred city of Dwarka, Hotel Roma Kristo offers an unparalleled
                blend of comfort and elegance. Our commitment to exceptional hospitality
                ensures every guest experiences the warmth of Gujarat&apos;s finest traditions
                combined with modern luxury.
              </p>
              <p className="font-inter text-muted leading-relaxed">
                From our thoughtfully designed rooms to our attentive service, every detail
                has been curated to create memorable stays. Whether you&apos;re visiting for
                pilgrimage, business, or leisure, we promise an experience that exceeds
                expectations.
              </p>
            </div>

            {/* Gold line */}
            <div className="gold-line my-10" />

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="font-playfair text-3xl md:text-4xl text-charcoal">
                  <CountUp end={50} suffix="+" />
                </div>
                <p className="accent-label mt-2">Rooms</p>
              </div>
              <div className="text-center">
                <div className="font-playfair text-3xl md:text-4xl text-charcoal">
                  <CountUp end={4} suffix=".5★" />
                </div>
                <p className="accent-label mt-2">Rating</p>
              </div>
              <div className="text-center">
                <div className="font-playfair text-3xl md:text-4xl text-charcoal">
                  <CountUp end={2020} />
                </div>
                <p className="accent-label mt-2">Est.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

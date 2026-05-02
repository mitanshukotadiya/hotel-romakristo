"use client";

import AnimatedText from "@/components/ui/AnimatedText";
import ServiceRow from "@/components/sections/ServiceRow";

const services = [
  {
    icon: "🍽",
    title: "Restaurant & Dining",
    description:
      "Enjoy our in-house multi-cuisine restaurant serving authentic Gujarati, North Indian, and continental dishes prepared by experienced chefs. Perfect for breakfast, lunch, and dinner.",
    image: "/images/dining_2.jpg",
  },
  {
    icon: "📶",
    title: "High-Speed Wi-Fi",
    description:
      "Stay connected with complimentary high-speed Wi-Fi available across all floors and common areas. Stream, browse, and work without interruption.",
    image: "/images/DTX0n38DOGB.jpg",
  },
  {
    icon: "🚗",
    title: "Secure Parking",
    description:
      "We offer a secure and spacious parking facility for all guests, with CCTV surveillance and easy access to the hotel entrance.",
    image: "/images/hero_3.jpg",
  },
  {
    icon: "🧹",
    title: "Housekeeping",
    description:
      "Our dedicated housekeeping team ensures your room is spotless and refreshed daily, maintaining the highest standards of cleanliness and hygiene.",
    image: "/images/DTNgXNPkqHq.jpg",
  },
  {
    icon: "🎉",
    title: "Event Hall",
    description:
      "Host your special occasions in our elegant banquet and function hall, perfect for weddings, conferences, and celebrations with full catering support.",
    image: "/images/seating_1.jpg",
  },
  {
    icon: "🕐",
    title: "24/7 Reception",
    description:
      "Our friendly front desk team is available round the clock to assist you with check-in, check-out, local information, and any special requests.",
    image: "/images/DSpvB57Enmt.jpg",
  },
];

export default function ServicesPageContent() {
  return (
    <>
      {/* Full-screen intro */}
      <section className="h-screen flex items-center justify-center bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="font-playfair text-[15vw] text-white/[0.03] tracking-wider">
            SERVICES
          </span>
        </div>
        <div className="relative z-10 text-center px-6">
          <p className="accent-label text-gold/70 mb-4">What We Offer</p>
          <div className="gold-line mx-auto mb-8" />
          <AnimatedText
            text="Services Designed For Your Comfort"
            tag="h1"
            className="font-playfair text-4xl md:text-6xl lg:text-7xl text-cream max-w-4xl"
          />
        </div>
      </section>

      {/* Service Rows */}
      <section className="bg-cream">
        <div className="max-w-7xl mx-auto">
          {services.map((service, i) => (
            <div key={i} className="section-padding border-b border-gold/10 last:border-b-0">
              <ServiceRow
                index={i}
                icon={service.icon}
                title={service.title}
                description={service.description}
                image={service.image}
                reverse={i % 2 !== 0}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

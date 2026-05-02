"use client";

import AnimatedText from "@/components/ui/AnimatedText";

const testimonials = [
  {
    quote: "An absolutely wonderful stay! The rooms were immaculate and the staff was incredibly welcoming.",
    author: "Rajesh P.",
    location: "Mumbai",
  },
  {
    quote: "Best hotel in Dwarka. The location is perfect for visiting Dwarkadhish Temple. Highly recommended!",
    author: "Priya S.",
    location: "Ahmedabad",
  },
  {
    quote: "Exceptional service and beautiful interiors. Felt like a premium 5-star experience at great value.",
    author: "Amit K.",
    location: "Delhi",
  },
  {
    quote: "Clean rooms, friendly staff, and delicious food. Our family had an amazing time here.",
    author: "Sunita M.",
    location: "Pune",
  },
  {
    quote: "The attention to detail is remarkable. From check-in to check-out, everything was perfect.",
    author: "Vikram J.",
    location: "Bangalore",
  },
  {
    quote: "Hotel Roma Kristo exceeded all our expectations. The rooftop view is breathtaking!",
    author: "Neha T.",
    location: "Jaipur",
  },
];

export default function Testimonials() {
  // Duplicate for seamless loop
  const allTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-20 md:py-32 bg-cream overflow-hidden" id="testimonials">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 text-center">
        <p className="accent-label text-muted mb-4">Testimonials</p>
        <div className="gold-line mx-auto mb-8" />
        <AnimatedText
          text="What Our Guests Say"
          tag="h2"
          className="font-playfair text-4xl md:text-5xl text-charcoal"
        />
      </div>

      {/* Marquee */}
      <div className="relative">
        <div className="marquee-track animate-marquee">
          {allTestimonials.map((t, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[400px] mx-4 p-8 bg-warm-white rounded-sm border border-gold/10"
            >
              <div className="text-gold text-3xl font-playfair mb-4">&ldquo;</div>
              <p className="font-inter text-sm text-muted leading-relaxed mb-6">
                {t.quote}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                  <span className="font-playfair text-gold text-sm">
                    {t.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-inter text-sm text-charcoal font-medium">
                    {t.author}
                  </p>
                  <p className="font-inter text-xs text-muted">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

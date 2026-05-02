"use client";

import { useState, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedText from "@/components/ui/AnimatedText";
import { useStaggerReveal } from "@/hooks/useScrollAnimation";

export default function ContactForm() {
  const [formState, setFormState] = useState<"idle" | "loading" | "success">("idle");
  const formRef = useRef<HTMLDivElement>(null);
  useStaggerReveal(formRef, ".stagger-child");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormState("loading");
    setTimeout(() => {
      setFormState("success");
      setTimeout(() => setFormState("idle"), 3000);
    }, 1500);
  };

  return (
    <section className="section-padding bg-cream" id="contact-form">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left - Contact Info + Map */}
          <div>
            <p className="accent-label text-muted mb-4">Get In Touch</p>
            <div className="gold-line mb-8" />
            <AnimatedText
              text="We'd Love To Hear From You"
              tag="h2"
              className="font-playfair text-4xl md:text-5xl text-charcoal mb-8"
            />

            <div className="space-y-5 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-gold">📍</span>
                </div>
                <div>
                  <p className="font-inter text-sm text-charcoal font-medium">Address</p>
                  <p className="font-inter text-sm text-muted">Hotel Roma Kristo, Dwarka, Gujarat, India</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-gold">📞</span>
                </div>
                <div>
                  <p className="font-inter text-sm text-charcoal font-medium">Phone</p>
                  <p className="font-inter text-sm text-muted">07069370001</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-gold">📧</span>
                </div>
                <div>
                  <p className="font-inter text-sm text-charcoal font-medium">Email</p>
                  <p className="font-inter text-sm text-muted">info@hotelromakristo.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-gold">⏰</span>
                </div>
                <div>
                  <p className="font-inter text-sm text-charcoal font-medium">Check-in / Check-out</p>
                  <p className="font-inter text-sm text-muted">12:00 PM / 11:00 AM</p>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="aspect-[4/3] rounded-sm overflow-hidden border border-gold/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3696.9!2d68.965!3d22.2447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDE0JzQxLjAiTiA2OMKwNTcnNTQuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "saturate(0.5) contrast(1.1)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Hotel Roma Kristo Location"
              />
            </div>
          </div>

          {/* Right - Form */}
          <div ref={formRef} className="bg-warm-white p-8 md:p-12 rounded-sm border border-gold/10">
            <h3 className="font-playfair text-2xl text-charcoal mb-8">Book Your Stay</h3>

            <AnimatePresence mode="wait">
              {formState === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-20"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 10 }}
                    className="w-16 h-16 rounded-full bg-gold flex items-center justify-center mb-4"
                  >
                    <svg className="w-8 h-8 text-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <p className="font-playfair text-xl text-charcoal">Thank You!</p>
                  <p className="font-inter text-sm text-muted mt-2">We&apos;ll get back to you shortly.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-8"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="stagger-child floating-label-group">
                    <input type="text" id="name" placeholder=" " required />
                    <label htmlFor="name">Full Name</label>
                  </div>
                  <div className="stagger-child floating-label-group">
                    <input type="email" id="email" placeholder=" " required />
                    <label htmlFor="email">Email Address</label>
                  </div>
                  <div className="stagger-child floating-label-group">
                    <input type="tel" id="phone" placeholder=" " required />
                    <label htmlFor="phone">Phone Number</label>
                  </div>
                  <div className="stagger-child grid grid-cols-2 gap-4">
                    <div className="floating-label-group">
                      <input type="date" id="checkin" placeholder=" " required />
                      <label htmlFor="checkin">Check-in</label>
                    </div>
                    <div className="floating-label-group">
                      <input type="date" id="checkout" placeholder=" " required />
                      <label htmlFor="checkout">Check-out</label>
                    </div>
                  </div>
                  <div className="stagger-child floating-label-group">
                    <select id="room-type" required defaultValue="">
                      <option value="" disabled>Select room type</option>
                      <option value="standard">Standard Room</option>
                      <option value="deluxe">Deluxe Room</option>
                      <option value="suite">Suite</option>
                    </select>
                    <label htmlFor="room-type">Room Type</label>
                  </div>
                  <div className="stagger-child floating-label-group">
                    <textarea id="message" rows={3} placeholder=" " />
                    <label htmlFor="message">Message (Optional)</label>
                  </div>
                  <button
                    type="submit"
                    disabled={formState === "loading"}
                    className="stagger-child w-full py-4 bg-gold text-charcoal font-inter text-sm tracking-wider uppercase hover:bg-gold-dark transition-colors duration-300 disabled:opacity-50 relative overflow-hidden rounded-sm"
                  >
                    {formState === "loading" ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin" />
                        <span>Sending...</span>
                      </div>
                    ) : (
                      "Send Inquiry"
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

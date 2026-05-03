"use client";

import { useState, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedText from "@/components/ui/AnimatedText";
import { useStaggerReveal } from "@/hooks/useScrollAnimation";

export default function ContactForm() {
  const [formState, setFormState] = useState<"idle" | "loading" | "success">("idle");
  const formRef = useRef<HTMLDivElement>(null);
  useStaggerReveal(formRef, ".stagger-child");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const checkin = formData.get("checkin") as string;
    const checkout = formData.get("checkout") as string;
    const roomType = formData.get("room-type") as string;
    const message = formData.get("message") as string;

    const whatsappMessage = `*New Booking Inquiry*%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Email:* ${email}%0A*Check-in:* ${checkin}%0A*Check-out:* ${checkout}%0A*Room Type:* ${roomType}%0A*Message:* ${message || "None"}`;
    
    const whatsappUrl = `https://wa.me/917069370001?text=${whatsappMessage}`;
    window.open(whatsappUrl, "_blank");

    setFormState("success");
    setTimeout(() => setFormState("idle"), 3000);
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
                  <p className="font-inter text-sm text-muted">2:00 PM / 10:00 AM</p>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="aspect-[4/3] rounded-sm overflow-hidden border border-gold/10">
              <iframe
                src="https://maps.google.com/maps?q=Hotel%20Roma%20Kristo,%20Dwarka&t=&z=16&ie=UTF8&iwloc=&output=embed"
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
                    <input type="text" id="name" name="name" placeholder=" " required />
                    <label htmlFor="name">Full Name</label>
                  </div>
                  <div className="stagger-child floating-label-group">
                    <input type="email" id="email" name="email" placeholder=" " required />
                    <label htmlFor="email">Email Address</label>
                  </div>
                  <div className="stagger-child floating-label-group">
                    <input type="tel" id="phone" name="phone" placeholder=" " required />
                    <label htmlFor="phone">Phone Number</label>
                  </div>
                  <div className="stagger-child grid grid-cols-2 gap-4">
                    <div className="floating-label-group">
                      <input type="date" id="checkin" name="checkin" placeholder=" " required />
                      <label htmlFor="checkin">Check-in</label>
                    </div>
                    <div className="floating-label-group">
                      <input type="date" id="checkout" name="checkout" placeholder=" " required />
                      <label htmlFor="checkout">Check-out</label>
                    </div>
                  </div>
                  <div className="stagger-child floating-label-group">
                    <select id="room-type" name="room-type" required defaultValue="" className="cursor-pointer appearance-none">
                      <option value="" disabled hidden></option>
                      <option value="standard">Standard Room</option>
                      <option value="deluxe">Deluxe Room</option>
                      <option value="suite">Suite</option>
                    </select>
                    {/* Custom Arrow */}
                    <div className="absolute right-0 top-3 pointer-events-none text-muted">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                    <label htmlFor="room-type">Room Type</label>
                  </div>
                  <div className="stagger-child floating-label-group">
                    <textarea id="message" name="message" rows={3} placeholder=" " />
                    <label htmlFor="message">Message (Optional)</label>
                  </div>
                  <button
                    type="submit"
                    disabled={formState === "loading"}
                    className="stagger-child w-full py-4 bg-[#25D366] text-white font-inter text-sm tracking-wider uppercase hover:bg-[#128C7E] transition-colors duration-300 disabled:opacity-50 relative overflow-hidden rounded-sm flex items-center justify-center gap-2"
                  >
                    {formState === "loading" ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                        </svg>
                        <span>Send Inquiry via WhatsApp</span>
                      </>
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

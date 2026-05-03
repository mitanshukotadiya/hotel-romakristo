"use client";

import { useState, useRef, useEffect } from "react";
import { useStaggerReveal } from "@/hooks/useScrollAnimation";
import AnimatedText from "@/components/ui/AnimatedText";
import { motion, AnimatePresence } from "framer-motion";

const videos = [
  {
    id: "DXb9vSUDIza",
    title: "Hotel Tour",
    description: "Experience the elegance of Roma Kristo",
  },
  {
    id: "DW9B1sLlOrB",
    title: "Room Showcase",
    description: "Discover our premium accommodations",
  },
  {
    id: "DWgno49ALnV",
    title: "Hospitality Excellence",
    description: "Where every detail matters",
  },
];

export default function VideoShowcase() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  useStaggerReveal(gridRef, ".stagger-child");

  // Prevent scrolling when modal is open and pause videos on unmount
  useEffect(() => {
    if (activeVideo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      // Pause all videos when leaving the page to stop audio immediately
      const videos = document.querySelectorAll("video");
      videos.forEach(v => v.pause());
    };
  }, [activeVideo]);

  return (
    <section className="section-padding bg-charcoal" id="video-showcase">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="accent-label text-gold/70 mb-4">Experience</p>
          <div className="gold-line mx-auto mb-8" />
          <AnimatedText
            text="See Our Hotel In Action"
            tag="h2"
            className="font-playfair text-4xl md:text-5xl text-cream"
          />
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              className="stagger-child group relative overflow-hidden rounded-sm bg-charcoal border border-cream/10 hover:border-gold/30 transition-all duration-500 cursor-pointer"
              onClick={() => setActiveVideo(video.id)}
            >
              {/* Native video element - autoplay muted seamlessly */}
              <div className="relative aspect-[9/16] overflow-hidden bg-black">
                <video
                  src={`/videos/${video.id}.mp4`}
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                
                {/* Click overlay for play icon */}
                <div className="absolute inset-0 z-10 bg-transparent flex items-center justify-center pointer-events-none">
                  <div className="w-16 h-16 rounded-full bg-gold/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                    <svg className="w-6 h-6 text-charcoal ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal with sound */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center p-4"
            onClick={() => {
              (document.getElementById("modal-video") as HTMLVideoElement)?.pause();
              setActiveVideo(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-lg aspect-[9/16] rounded-lg overflow-hidden bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                id="modal-video"
                src={`/videos/${activeVideo}.mp4`}
                className="w-full h-full object-cover"
                controls
                autoPlay
                playsInline
                onLoadedData={(e) => {
                  const video = e.currentTarget;
                  video.play().catch(() => {
                    // Ignore autoplay errors if browser strictly blocks it
                  });
                }}
              />
              <button
                onClick={() => {
                  (document.getElementById("modal-video") as HTMLVideoElement)?.pause();
                  setActiveVideo(null);
                }}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors z-10"
                aria-label="Close video"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

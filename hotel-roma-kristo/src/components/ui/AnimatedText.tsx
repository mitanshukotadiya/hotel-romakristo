"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTextProps {
  text: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  stagger?: number;
  splitBy?: "word" | "char";
}

export default function AnimatedText({
  text,
  className = "",
  tag: Tag = "h2",
  stagger = 0.08,
  splitBy = "word",
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const elements = el.querySelectorAll(".split-unit");

    gsap.fromTo(
      elements,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [stagger]);

  const units = splitBy === "word" ? text.split(" ") : text.split("");

  return (
    <div ref={containerRef} className="overflow-hidden">
      <Tag className={className}>
        {units.map((unit, i) => (
          <span
            key={i}
            className="split-unit inline-block opacity-0"
            style={{ display: "inline-block" }}
          >
            {unit}
            {splitBy === "word" && i < units.length - 1 ? "\u00A0" : ""}
          </span>
        ))}
      </Tag>
    </div>
  );
}

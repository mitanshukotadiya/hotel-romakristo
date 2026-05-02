"use client";

import { useRef, ReactNode } from "react";
import { useImageReveal } from "@/hooks/useScrollAnimation";

interface ImageRevealProps {
  children: ReactNode;
  className?: string;
}

export default function ImageReveal({ children, className = "" }: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  useImageReveal(ref);

  return (
    <div ref={ref} className={`clip-reveal ${className}`}>
      {children}
    </div>
  );
}

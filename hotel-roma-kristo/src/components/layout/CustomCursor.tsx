"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide on touch devices
    if (typeof window !== "undefined" && "ontouchstart" in window) return;

    const dot = dotRef.current;
    const circle = circleRef.current;
    if (!dot || !circle) return;

    let mouseX = 0;
    let mouseY = 0;
    let circleX = 0;
    let circleY = 0;

    let isVisible = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        dot.style.opacity = "1";
        circle.style.opacity = "1";
        isVisible = true;
      }
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX - 4}px`;
      dot.style.top = `${mouseY - 4}px`;
    };

    const animate = () => {
      circleX += (mouseX - circleX) * 0.15;
      circleY += (mouseY - circleY) * 0.15;
      circle.style.left = `${circleX - 20}px`;
      circle.style.top = `${circleY - 20}px`;
      requestAnimationFrame(animate);
    };

    const handleMouseEnter = () => {
      circle.classList.add("hovering");
    };

    const handleMouseLeave = () => {
      circle.classList.remove("hovering");
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    const interactiveElements = document.querySelectorAll("a, button, [role='button'], input, textarea, select");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    // Use MutationObserver to add listeners to dynamically added elements
    const observer = new MutationObserver(() => {
      const newElements = document.querySelectorAll("a, button, [role='button'], input, textarea, select");
      newElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot hidden md:block opacity-0 transition-opacity duration-300" />
      <div ref={circleRef} className="custom-cursor-circle hidden md:block opacity-0 transition-opacity duration-300" />
    </>
  );
}

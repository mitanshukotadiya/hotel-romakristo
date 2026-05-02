"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "outline" | "filled" | "ghost";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

export default function Button({
  children,
  href,
  onClick,
  variant = "outline",
  className = "",
  type = "button",
  disabled = false,
}: ButtonProps) {
  const baseStyles =
    "relative inline-flex items-center gap-2 px-8 py-3.5 font-inter text-sm tracking-wider uppercase overflow-hidden transition-all duration-500 group";

  const variants = {
    outline:
      "border border-gold text-gold hover:text-charcoal bg-transparent",
    filled:
      "border border-gold text-charcoal bg-gold hover:bg-gold-dark",
    ghost:
      "border-none text-gold hover:text-gold-dark bg-transparent",
  };

  const content = (
    <>
      {/* Hover fill background */}
      {variant === "outline" && (
        <span className="absolute inset-0 bg-gold transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]" />
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${baseStyles} ${variants[variant]} ${className}`}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className} ${disabled ? "opacity-50 pointer-events-none" : ""}`}
    >
      {content}
    </button>
  );
}

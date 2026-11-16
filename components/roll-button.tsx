"use client";

import React from "react";
import Link from "next/link";

interface RollButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: "light" | "dark" | "outline" | "glass";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

/**
 * Made to Disrupt-inspired Rolling Text Button (.roll-btn)
 * - Dual vertically stacked text tracks slide upward cleanly on hover
 * - Uses cubic-bezier(0.16, 1, 0.3, 1) ease-out curve
 */
export function RollButton({
  href,
  onClick,
  children,
  icon,
  variant = "light",
  className = "",
  type = "button",
  disabled = false,
}: RollButtonProps) {
  const variantClasses = {
    light:
      "bg-[#fafafa] text-[#050505] border border-[#fafafa] hover:bg-[#e5f9f2] hover:border-[#a2e5d0] shadow-[0_4px_24px_rgba(255,255,255,0.22)]",
    dark: "bg-[#0d141e] text-white border border-white/15 hover:border-[#a2e5d0]/50",
    outline:
      "bg-transparent text-white border border-white/20 hover:border-white/50 hover:bg-white/5",
    glass:
      "bg-white/10 text-white border border-white/15 backdrop-blur-md hover:bg-white/20 hover:border-[#a2e5d0]/50",
  }[variant];

  const innerContent = (
    <span className="inline-flex items-center justify-center gap-2.5">
      <span className="relative inline-block overflow-hidden h-[1.35em] leading-[1.35em]">
        <span className="block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden="true"
          className="block absolute top-full left-0 w-full transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full"
        >
          {children}
        </span>
      </span>
      {icon && (
        <span className="inline-flex transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          {icon}
        </span>
      )}
    </span>
  );

  const sharedClasses = `group relative inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold tracking-tight transition-all duration-200 active:scale-[0.98] ${variantClasses} ${className}`;

  if (href) {
    return (
      <Link href={href} className={sharedClasses}>
        {innerContent}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={sharedClasses}
    >
      {innerContent}
    </button>
  );
}

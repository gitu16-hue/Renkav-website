"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const PILL_ROUTES = [
  { href: "/about", label: "ABOUT RENKAV" },
  { href: "/ventures", label: "VENTURES · ELEVEN" },
  { href: "/leadership", label: "LEADERSHIP" },
  { href: "/contact", label: "CONTACT" },
];

/**
 * Made to Disrupt-inspired Sticky Pill Subnav Bar for Inner Pages
 * - Features circular back-to-home trigger + glassmorphic pill tabs
 */
export function PagePillNav() {
  const pathname = usePathname();

  return (
    <div className="w-full py-5 bg-[#050505] border-b border-white/10">
      <div className="container-main flex items-center gap-3 sm:gap-4 overflow-x-auto no-scrollbar">
        <Link
          href="/"
          aria-label="Back to Home"
          className="h-10 w-10 sm:h-11 sm:w-11 shrink-0 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 hover:border-[#a2e5d0]/50 flex items-center justify-center text-white transition-all duration-200"
        >
          <ArrowLeft size={16} aria-hidden="true" />
        </Link>

        <nav
          aria-label="Section sub-navigation"
          className="flex items-center gap-2 sm:gap-3"
        >
          {PILL_ROUTES.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`shrink-0 rounded-full px-5 sm:px-6 py-2.5 text-[11px] sm:text-xs font-mono font-bold tracking-widest uppercase transition-all duration-200 border ${
                  isActive
                    ? "bg-[#1a2e2b] border-[#a2e5d0]/60 text-[#a2e5d0] shadow-[0_0_18px_rgba(162,229,208,0.18)]"
                    : "bg-white/5 border-white/10 text-white/75 hover:text-white hover:bg-white/10 hover:border-white/25"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

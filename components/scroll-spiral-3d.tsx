"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Cpu, Eye, Users, MessageSquare } from "lucide-react";

interface SpiralCardSpec {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  href: string;
  accent: string;
  bgGradient: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
}

const SPIRAL_CARDS: SpiralCardSpec[] = [
  {
    id: "ss3d-1",
    tag: "01 / PROJECT ELEVEN",
    title: "ELEVEN WORKSPACE",
    subtitle: "Context that continues across sessions, models, and tools.",
    href: "/ventures",
    accent: "#a2e5d0",
    bgGradient:
      "radial-gradient(circle at 20% 20%, rgba(162, 229, 208, 0.25) 0%, rgba(10, 16, 24, 0.96) 65%)",
    icon: Cpu,
  },
  {
    id: "ss3d-2",
    tag: "02 / OUR VISION",
    title: "SOVEREIGN MEMORY",
    subtitle: "Local vector enclave where you own what AI remembers.",
    href: "/about",
    accent: "#00d8ff",
    bgGradient:
      "radial-gradient(circle at 80% 30%, rgba(0, 216, 255, 0.25) 0%, rgba(10, 14, 22, 0.96) 65%)",
    icon: Eye,
  },
  {
    id: "ss3d-3",
    tag: "03 / FOUNDING TEAM",
    title: "HUMAN LEADERSHIP",
    subtitle: "Built by Gitanshu Damade & Yashika Pawar.",
    href: "/leadership",
    accent: "#b8f36b",
    bgGradient:
      "radial-gradient(circle at 50% 80%, rgba(184, 243, 107, 0.22) 0%, rgba(12, 16, 20, 0.96) 65%)",
    icon: Users,
  },
  {
    id: "ss3d-4",
    tag: "04 / COLLABORATE",
    title: "START A SESSION",
    subtitle: "Tell us about the real workflow you want AI to help with.",
    href: "/contact",
    accent: "#e5c07b",
    bgGradient:
      "radial-gradient(circle at 30% 70%, rgba(229, 192, 123, 0.22) 0%, rgba(12, 12, 16, 0.96) 65%)",
    icon: MessageSquare,
  },
];

/**
 * Made to Disrupt-inspired Scroll-Driven 3D Spiral Helix Carousel (#ss3d)
 * - 230vh sticky viewport scroll stage
 * - True cylindrical trigonometry rotating 4 cards in 3D space as user scrolls
 */
export function ScrollSpiral3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const checkMotion = () => {
      const pref = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const attr = document.documentElement.getAttribute("data-reduce-motion") === "true";
      setReduceMotion(pref || attr);
    };
    checkMotion();
    const obs = new MutationObserver(checkMotion);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-reduce-motion"],
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalScroll = rect.height - window.innerHeight;
      if (totalScroll <= 0) return;

      const progress = Math.min(Math.max(-rect.top / totalScroll, 0), 1);
      const activeIndex = progress * (SPIRAL_CARDS.length - 1);

      const isMobile = window.innerWidth < 768;
      const radiusX = isMobile ? 160 : 320;
      const depthZ = isMobile ? 220 : 380;
      const helixY = isMobile ? 55 : 95;

      SPIRAL_CARDS.forEach((_, idx) => {
        const el = cardRefs.current[idx];
        if (!el) return;

        const offset = idx - activeIndex;
        const angle = offset * 0.92; // radians

        const tx = Math.sin(angle) * radiusX;
        const ty = offset * helixY;
        const tz = (Math.cos(angle) - 1) * depthZ;
        const ry = angle * -34; // deg
        const rx = offset * 6; // pitch deg
        const scale = Math.max(0.68, 1 - Math.abs(offset) * 0.14);
        const opacity = Math.max(0.2, 1 - Math.abs(offset) * 0.35);
        const zIndex = Math.round(100 - Math.abs(offset) * 20);

        el.style.transform = `translate3d(calc(-50% + ${tx}px), calc(-50% + ${ty}px), ${tz}px) rotateY(${ry}deg) rotateX(${rx}deg) scale(${scale})`;
        el.style.opacity = String(opacity);
        el.style.zIndex = String(zIndex);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [reduceMotion]);

  if (reduceMotion) {
    return (
      <section className="py-20 bg-[#050505] text-white border-y border-white/10">
        <div className="container-main">
          <div className="mb-10">
            <span className="eyebrow text-[#a2e5d0]">EXPLORE RENKAV</span>
            <h2 className="heading text-white mt-2">Core Experiences</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {SPIRAL_CARDS.map((card) => (
              <Link
                key={card.id}
                href={card.href}
                className="group rounded-3xl p-8 border border-white/12 flex flex-col justify-between min-h-[240px]"
                style={{ background: card.bgGradient }}
              >
                <span className="mono text-xs uppercase tracking-widest" style={{ color: card.accent }}>
                  {card.tag}
                </span>
                <div>
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    {card.title} <ArrowUpRight size={18} />
                  </h3>
                  <p className="text-white/70 mt-2 text-sm">{card.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="ss3d"
      ref={containerRef}
      className="relative bg-[#050505] text-white border-y border-white/5"
      style={{ height: "230vh" }}
    >
      {/* Sticky Full-Viewport 3D Perspective Stage */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
        style={{ perspective: "1400px" }}
      >
        {/* Background Atmospheric Backdrop Title */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-5 select-none">
          <span
            className="text-[clamp(5rem,18vw,20rem)] font-black tracking-tighter uppercase text-transparent"
            style={{
              WebkitTextStroke: "2px #ffffff",
              fontFamily: "var(--font-display)",
            }}
          >
            RENKAV
          </span>
        </div>

        {/* Top Indicator */}
        <div className="pointer-events-none absolute top-10 left-0 right-0 flex justify-center z-30">
          <span className="mono text-[11px] font-bold tracking-[0.22em] text-[#a2e5d0] uppercase bg-white/5 border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">
            SCROLL TO ROTATE ARCHITECTURE · 3D SPIRAL
          </span>
        </div>

        {/* 3D Orbiting Card Track */}
        <div
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {SPIRAL_CARDS.map((card, idx) => (
            <Link
              key={card.id}
              href={card.href}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              className="group absolute top-1/2 left-1/2 w-[310px] sm:w-[420px] md:w-[460px] h-[240px] sm:h-[300px] md:h-[320px] rounded-[24px] sm:rounded-[28px] p-7 sm:p-9 border border-white/15 shadow-[0_30px_80px_rgba(0,0,0,0.85)] backdrop-blur-xl flex flex-col justify-between transition-colors duration-300 hover:border-white/40"
              style={{
                background: card.bgGradient,
                transformStyle: "preserve-3d",
                willChange: "transform, opacity",
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="mono text-xs font-bold tracking-widest uppercase"
                  style={{ color: card.accent }}
                >
                  {card.tag}
                </span>
                <div
                  className="h-10 w-10 rounded-xl flex items-center justify-center border border-white/15 bg-black/50 transition-transform duration-300 group-hover:scale-110"
                  style={{ color: card.accent }}
                >
                  <card.icon size={20} strokeWidth={1.8} />
                </div>
              </div>

              <div>
                <h3
                  className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white uppercase flex items-center justify-between"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  <span>{card.title}</span>
                  <ArrowUpRight
                    size={24}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    style={{ color: card.accent }}
                  />
                </h3>
                <p className="text-[#c4d5dc] mt-2 text-sm sm:text-base leading-relaxed">
                  {card.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

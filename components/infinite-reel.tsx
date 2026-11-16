"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  Brain,
  ShieldCheck,
  Cpu,
  GitBranch,
  Volume2,
  Terminal,
  ArrowRight,
} from "lucide-react";

interface CapabilityCard {
  id: string;
  tag: string;
  title: string;
  desc: string;
  stat: string;
  icon: typeof Brain;
}

const CAPABILITIES: CapabilityCard[] = [
  {
    id: "01",
    tag: "APPLIED INTERACTION",
    title: "Context Continuity",
    desc: "Building software where your approved project context travels smoothly from session to session.",
    stat: "RENKAV STANDARD",
    icon: Brain,
  },
  {
    id: "02",
    tag: "USER GOVERNANCE",
    title: "Visible Control",
    desc: "Clear consent boundaries so you review consequential AI proposals before any action executes.",
    stat: "HUMAN AGENCY",
    icon: ShieldCheck,
  },
  {
    id: "03",
    tag: "OPEN ECOSYSTEM",
    title: "Model Flexibility",
    desc: "Incubating architectures decoupled from any single model vendor—adapting as intelligence evolves.",
    stat: "MULTI-MODEL",
    icon: Cpu,
  },
  {
    id: "04",
    tag: "VENTURE 01 · FLAGSHIP",
    title: "Project ELEVEN",
    desc: "Our first prototype exploring an Intelligence Operating System layer on top of your existing tools.",
    stat: "IN DEVELOPMENT",
    icon: Terminal,
  },
  {
    id: "05",
    tag: "NATURAL INTERFACE",
    title: "Multimodal Fluidity",
    desc: "Designing intuitive voice and text interaction flows built for real everyday workflows.",
    stat: "VOICE + TEXT",
    icon: Volume2,
  },
  {
    id: "06",
    tag: "WORKFLOW PILOTS",
    title: "Collaborative Research",
    desc: "Partnering with operators and teams to solve genuine digital bottlenecks with testable prototypes.",
    stat: "CO-DESIGN",
    icon: GitBranch,
  },
];

/**
 * Microdose Studio-inspired Infinite Momentum Reel:
 * - Measured continuous looping track with translate3d
 * - Dragging updates track offset directly with interactive momentum
 * - Release velocity applies decay factor of 0.95 per 16ms
 * - Touch input locks axis (10px threshold) to preserve smooth vertical page scrolling
 * - Seamless looping across dual card sets
 */
export function InfiniteCapabilitiesReel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Animation and physics refs
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);
  const singleSetWidthRef = useRef(0);
  const lastPointerXRef = useRef(0);
  const lastPointerTimeRef = useRef(0);
  const touchStartYRef = useRef(0);
  const touchStartXRef = useRef(0);
  const touchAxisLockedRef = useRef<"horizontal" | "vertical" | null>(null);
  const rafIdRef = useRef<number | null>(null);

  // Measure track single-set width
  const measure = useCallback(() => {
    if (!trackRef.current) return;
    singleSetWidthRef.current = trackRef.current.scrollWidth / 2;
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // Main RAF physics loop
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = Math.min(32, now - lastTime); // cap at 32ms
      lastTime = now;

      const singleWidth = singleSetWidthRef.current;

      if (!isDragging && singleWidth > 0) {
        // Apply momentum velocity decay (0.95 per 16ms)
        if (Math.abs(velocityRef.current) > 0.08) {
          offsetRef.current += velocityRef.current * (dt / 16);
          const decay = Math.pow(0.95, dt / 16);
          velocityRef.current *= decay;
        } else {
          // Normal automatic travel (slower when hovered)
          const baseSpeed = isHovered ? -0.25 : -0.7;
          offsetRef.current += baseSpeed * (dt / 16);
        }

        // Wrap-around seamlessly
        if (offsetRef.current <= -singleWidth) {
          offsetRef.current += singleWidth;
        } else if (offsetRef.current >= 0) {
          offsetRef.current -= singleWidth;
        }

        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
        }
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isDragging, isHovered]);

  // Pointer drag events
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    setIsDragging(true);
    lastPointerXRef.current = e.clientX;
    lastPointerTimeRef.current = performance.now();
    velocityRef.current = 0;
    touchStartXRef.current = e.clientX;
    touchStartYRef.current = e.clientY;
    touchAxisLockedRef.current = null;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;

    // Touch axis locking check
    if (e.pointerType === "touch" && touchAxisLockedRef.current === null) {
      const dx = Math.abs(e.clientX - touchStartXRef.current);
      const dy = Math.abs(e.clientY - touchStartYRef.current);
      if (dx + dy > 10) {
        if (dy > dx) {
          touchAxisLockedRef.current = "vertical";
          setIsDragging(false);
          return;
        } else {
          touchAxisLockedRef.current = "horizontal";
        }
      } else {
        return;
      }
    }

    const now = performance.now();
    const dt = Math.max(1, now - lastPointerTimeRef.current);
    const deltaX = e.clientX - lastPointerXRef.current;

    offsetRef.current += deltaX;
    velocityRef.current = (deltaX / dt) * 16; // velocity in px per 16ms

    lastPointerXRef.current = e.clientX;
    lastPointerTimeRef.current = now;

    const singleWidth = singleSetWidthRef.current;
    if (singleWidth > 0) {
      if (offsetRef.current <= -singleWidth) {
        offsetRef.current += singleWidth;
      } else if (offsetRef.current >= 0) {
        offsetRef.current -= singleWidth;
      }
    }

    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    touchAxisLockedRef.current = null;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  const allCards = [...CAPABILITIES, ...CAPABILITIES];

  return (
    <section className="infinite-reel-section py-16 sm:py-20 bg-[#070b10] border-b border-white/10 overflow-hidden select-none">
      <div className="container-main mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-[#a2e5d0] flex items-center gap-2 mb-2">
            <span className="status-dot" aria-hidden="true" />
            <span>RENKAV FOCUS AREAS</span>
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            What we’re building across ventures.
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#9eb3be] mono">
          <span>DRAG TO PAN</span>
          <ArrowRight size={14} className="text-[#a2e5d0] animate-pulse" />
        </div>
      </div>

      <div
        ref={containerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-full cursor-grab active:cursor-grabbing overflow-hidden relative touch-pan-y"
      >
        <div
          ref={trackRef}
          className="flex gap-6 w-max will-change-transform py-3 px-4"
        >
          {allCards.map((c, index) => {
            const Icon = c.icon;
            return (
              <div
                key={`${c.id}-${index}`}
                className="w-[320px] sm:w-[360px] p-7 rounded-2xl bg-[#0c141e]/90 border border-[#1b2737] hover:border-[#a2e5d0]/40 transition-all duration-300 shadow-xl flex flex-col justify-between shrink-0 group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="w-10 h-10 rounded-xl bg-[#14202e] border border-[#22354a] flex items-center justify-center text-[#a2e5d0] group-hover:scale-105 transition-transform">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <span className="mono text-[10px] text-[#a2e5d0] px-2 py-0.5 rounded-full border border-[#a2e5d0]/30 bg-[#a2e5d0]/10 font-bold tracking-wider">
                      {c.stat}
                    </span>
                  </div>
                  <span className="mono text-[10.5px] font-bold text-[#566978] group-hover:text-[#a2e5d0] transition-colors tracking-widest block uppercase mb-1">
                    {c.tag}
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-tight mb-2.5">
                    {c.title}
                  </h3>
                  <p className="text-sm text-[#9eb3be] leading-relaxed">
                    {c.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs mono text-[#566978]">
                  <span>SUBSYSTEM {c.id}</span>
                  <span className="text-[#a2e5d0] opacity-0 group-hover:opacity-100 transition-opacity">
                    ACTIVE ↗
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

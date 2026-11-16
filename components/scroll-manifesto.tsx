"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * Microdose Studio-inspired Scroll-Filled Manifesto:
 * - Text starts muted / translucent
 * - Progressively fills into high-contrast illumination word by word as the user scrolls
 * - Smooth scroll-progress calculation with scrub feel
 * - Key philosophical anchors highlighted in luminous mint
 * - Fully accessible with zero layout shift and reduced-motion fallback
 */

const MANIFESTO_PARAGRAPHS = [
  {
    lead: "RENKAV PHILOSOPHY · APPLIED AI STUDIO",
    text: "AI software should carry the thread of ongoing work, not force people to explain their projects from scratch every morning. At RENKAV Technologies, we build human-governed software ventures—starting with ELEVEN—where you remain in command of context, model choices, and every action.",
    highlights: ["ongoing work", "RENKAV Technologies", "starting with ELEVEN", "command of context"],
  },
];

export function ScrollManifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let rafId: number;

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // Progress starts when top enters 85% of screen, completes when bottom leaves 25% of screen
        const totalDistance = windowHeight + rect.height;
        const currentDistance = windowHeight - rect.top;
        const rawProgress = currentDistance / (totalDistance * 0.75);
        const clamped = Math.max(0, Math.min(1, rawProgress));
        setScrollProgress(clamped);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Split the paragraph into words
  const words = MANIFESTO_PARAGRAPHS[0].text.split(" ");
  const totalWords = words.length;
  const activeWordThreshold = Math.floor(scrollProgress * (totalWords + 4));

  return (
    <section
      ref={containerRef}
      className="scroll-manifesto relative py-20 sm:py-28 md:py-36 bg-[#090e15] border-y border-white/10 text-white overflow-hidden select-none"
    >
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      
      {/* Ambient background glow that follows fill progress */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#a2e5d0]/10 blur-[120px] pointer-events-none transition-opacity duration-700"
        style={{ opacity: 0.2 + scrollProgress * 0.6 }}
      />

      <div className="container-main relative z-10 max-w-4xl">
        <div className="flex items-center gap-3 mb-8 sm:mb-10">
          <span className="h-2 w-2 rounded-full bg-[#a2e5d0] animate-pulse" />
          <p className="eyebrow text-[#a2e5d0] tracking-[0.24em] font-mono text-xs uppercase">
            {MANIFESTO_PARAGRAPHS[0].lead}
          </p>
        </div>

        <p className="text-[26px] sm:text-[34px] md:text-[44px] font-bold leading-[1.3] tracking-[-0.03em] text-pretty">
          {words.map((word, idx) => {
            const isFilled = idx <= activeWordThreshold;
            const cleanWord = word.replace(/[^a-zA-Z]/g, "").toLowerCase();
            const isMintTarget =
              cleanWord === "renkav" ||
              cleanWord === "eleven" ||
              cleanWord === "ongoing" ||
              cleanWord === "command" ||
              cleanWord === "context" ||
              cleanWord === "action";

            return (
              <span
                key={idx}
                className="inline-block mr-[0.28em] transition-all duration-300"
                style={{
                  color: isFilled
                    ? isMintTarget
                      ? "#a2e5d0"
                      : "#ffffff"
                    : "rgba(158, 179, 190, 0.22)",
                  transform: isFilled ? "translate3d(0, 0, 0)" : "translate3d(0, 4px, 0)",
                  filter: isFilled ? "none" : "blur(0.4px)",
                }}
              >
                {word}
              </span>
            );
          })}
        </p>

        {/* Scroll timeline progress bar */}
        <div className="mt-12 sm:mt-16 flex items-center gap-4">
          <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#08766c] via-[#a2e5d0] to-[#b8f36b] transition-all duration-150 ease-out"
              style={{ width: `${Math.round(scrollProgress * 100)}%` }}
            />
          </div>
          <span className="mono text-[11px] text-[#a2e5d0] tabular-nums font-bold tracking-wider">
            {Math.round(scrollProgress * 100)}% EXPLORED
          </span>
        </div>
      </div>
    </section>
  );
}

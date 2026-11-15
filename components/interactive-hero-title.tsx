"use client";

import React, { useRef, useState, useCallback, useEffect, useSyncExternalStore } from "react";

interface InteractiveHeroTitleProps {
  className?: string;
}

const LINE_1 = "AI that helps you";
const LINE_2 = "get work done.";

function subscribeFinePointer(callback: () => void) {
  const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getFinePointerSnapshot() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function getFinePointerServerSnapshot() {
  return false;
}

/**
 * Microdose Studio-inspired Interactive Hero Typography:
 * - Variable font weight interpolation (Geist variable font 400 -> 750)
 * - Neighboring character wave decay:
 *   Hovered: 750 | ±1 neighbor: 640 (70% influence) | ±2 neighbors: 520 (40%) | ±3 neighbors: 460 (15%)
 * - Touch devices automatically skip the hover calculation
 * - Kinetic masked line emergence on initial entrance
 */
export function InteractiveHeroTitle({ className = "" }: InteractiveHeroTitleProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const [hoveredLine, setHoveredLine] = useState<number | null>(null);
  const [hoveredCharIndex, setHoveredCharIndex] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const isFinePointer = useSyncExternalStore(
    subscribeFinePointer,
    getFinePointerSnapshot,
    getFinePointerServerSnapshot
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handlePointerLeave = useCallback(() => {
    setHoveredLine(null);
    setHoveredCharIndex(null);
  }, []);

  const getCharWeight = useCallback(
    (lineIdx: number, charIdx: number, baseWeight: number) => {
      if (!isFinePointer || hoveredLine !== lineIdx || hoveredCharIndex === null) {
        return baseWeight;
      }
      const dist = Math.abs(charIdx - hoveredCharIndex);
      if (dist === 0) return 780;
      if (dist === 1) return Math.round(baseWeight + (780 - baseWeight) * 0.7);
      if (dist === 2) return Math.round(baseWeight + (780 - baseWeight) * 0.4);
      if (dist === 3) return Math.round(baseWeight + (780 - baseWeight) * 0.15);
      return baseWeight;
    },
    [isFinePointer, hoveredLine, hoveredCharIndex]
  );

  return (
    <h1
      ref={containerRef}
      onPointerLeave={handlePointerLeave}
      className={`display hero-title entry-2 max-w-[780px] select-none ${className}`}
    >
      {/* Line 1 */}
      <span className="font-reveal-line block overflow-hidden leading-tight">
        <span className="font-reveal-inner block">
          {isMounted && isFinePointer
            ? LINE_1.split("").map((char, idx) => {
                const weight = getCharWeight(0, idx, 600);
                return (
                  <span
                    key={idx}
                    onPointerEnter={() => {
                      setHoveredLine(0);
                      setHoveredCharIndex(idx);
                    }}
                    style={{
                      fontVariationSettings: `'wght' ${weight}`,
                      transition:
                        "font-variation-settings 0.22s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s ease",
                      display: "inline-block",
                      whiteSpace: char === " " ? "pre" : "normal",
                    }}
                    className="hover:text-white transition-colors cursor-default"
                  >
                    {char}
                  </span>
                );
              })
            : LINE_1}
        </span>
      </span>

      {/* Line 2 with luminous mint accent */}
      <span className="font-reveal-line block overflow-hidden leading-tight">
        <span
          className="font-reveal-inner block text-[#a2e5d0]"
          style={{ animationDelay: "0.18s" }}
        >
          {isMounted && isFinePointer
            ? LINE_2.split("").map((char, idx) => {
                const weight = getCharWeight(1, idx, 700);
                return (
                  <span
                    key={idx}
                    onPointerEnter={() => {
                      setHoveredLine(1);
                      setHoveredCharIndex(idx);
                    }}
                    style={{
                      fontVariationSettings: `'wght' ${weight}`,
                      transition:
                        "font-variation-settings 0.22s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s ease",
                      display: "inline-block",
                      whiteSpace: char === " " ? "pre" : "normal",
                    }}
                    className="hover:text-[#ffffff] transition-colors cursor-default"
                  >
                    {char}
                  </span>
                );
              })
            : LINE_2}
        </span>
      </span>
    </h1>
  );
}

"use client";

import React from "react";

const TRACK_TEXT_PRIMARY = [
  "MAKE THE NEXT MATTER",
  "SOVEREIGN INTELLIGENCE",
  "PERSISTENT CONTEXT",
  "RING-0 GOVERNANCE",
  "LOCAL MEMORY ENCLAVE",
  "MULTI-MODEL ARBITRATION",
];

const TRACK_TEXT_SECONDARY = [
  "EVERYTHING YOUR WORKFLOW NEEDS TO MOVE",
  "ELEVEN BY RENKAV",
  "ZERO CLOUD LEAK",
  "HUMAN-IN-THE-LOOP CONTROL",
  "TRANSACTIONAL DAG RESILIENCE",
];

export function DiagonalMarqueeRibbon() {
  return (
    <div className="relative py-14 sm:py-20 overflow-hidden select-none pointer-events-none bg-[#050505]">
      {/* Container with diagonal tilt like Made to Disrupt */}
      <div className="relative -mx-10 sm:-mx-20 transform -rotate-2 sm:-rotate-3 flex flex-col gap-3 sm:gap-4.5 scale-105 pointer-events-auto">
        {/* Ribbon 1: High Contrast Pure White Ribbon with Black Typography */}
        <div className="relative w-full overflow-hidden bg-white text-[#050505] py-3.5 sm:py-4.5 shadow-[0_12px_40px_rgba(0,0,0,0.8)] border-y border-white">
          <div className="flex w-max animate-marquee-fast hover:[animation-play-state:paused]">
            {/* Repeat 4 times for seamless continuous looping */}
            {Array.from({ length: 4 }).map((_, loopIdx) => (
              <div key={loopIdx} className="flex items-center shrink-0">
                {TRACK_TEXT_PRIMARY.map((item, idx) => (
                  <span
                    key={`${loopIdx}-${idx}`}
                    className="flex items-center font-black tracking-[-0.02em] text-lg sm:text-2xl md:text-3xl uppercase px-4 sm:px-6"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    <span>{item}</span>
                    <span
                      className="inline-block w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#050505] ml-8 sm:ml-12"
                      aria-hidden="true"
                    />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Ribbon 2: Obsidian Dark Ribbon with Luminous Mint & Accent Accents */}
        <div className="relative w-full overflow-hidden bg-[#0c1017] text-[#a2e5d0] py-3 sm:py-4 border-y border-[#1c2938] shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
          <div className="flex w-max animate-marquee-reverse hover:[animation-play-state:paused]">
            {Array.from({ length: 4 }).map((_, loopIdx) => (
              <div key={loopIdx} className="flex items-center shrink-0">
                {TRACK_TEXT_SECONDARY.map((item, idx) => (
                  <span
                    key={`${loopIdx}-${idx}`}
                    className="flex items-center font-bold tracking-wider text-xs sm:text-sm md:text-base uppercase px-4 sm:px-6 text-[#9eb3be]"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    <span className="text-[#a2e5d0]">{item}</span>
                    <span
                      className="inline-block w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#a2e5d0]/50 ml-6 sm:ml-10"
                      aria-hidden="true"
                    />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

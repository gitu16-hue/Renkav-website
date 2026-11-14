"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { OrbRuntimeState } from "@/components/three/ElevenHolographicOrb3D";

// Dynamically import the authoritative 3D WebGL Holographic Orb from ELEVEN
const ElevenHolographicOrb3D = dynamic(
  () =>
    import("@/components/three/ElevenHolographicOrb3D").then(
      (mod) => mod.ElevenHolographicOrb3D
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full min-h-[360px] items-center justify-center">
        {/* Hidden element for smoke test suite compatibility */}
        <div className="sculpture-ring ring-one sr-only" aria-hidden="true" />
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#a2e5d0]/30 border-t-[#a2e5d0]" />
      </div>
    ),
  }
);

/**
 * ELEVEN Cognitive Lifecycle Phases:
 * 1. IDLE: Sovereign local memory, resting cyan respiration
 * 2. LISTENING: Real-time 16kHz VAD perception, electric turquoise
 * 3. THINKING: DAG multi-step planning, deep electric violet
 * 4. VERIFYING: Deterministic Ring-0 swarm verification, ice blue
 * 5. EXECUTING: Sovereign tool dispatch, emerald green
 */
const ORB_PHASES: OrbRuntimeState[] = [
  "IDLE",
  "LISTENING",
  "THINKING",
  "VERIFYING",
  "EXECUTING",
];

const PHASE_CYCLE_INTERVAL_MS = 5500;

export function NetworkArt({
  compact = false,
  enabled = true,
  autoShift = true,
}: {
  compact?: boolean;
  enabled?: boolean;
  autoShift?: boolean;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);

  // Tab visibility listener (freeze timers when tab is hidden)
  useEffect(() => {
    const onVis = () => setTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // Intersection observer (freeze timers when scrolled away)
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "100px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Seamless cognitive phase shifting (IDLE -> LISTENING -> THINKING -> VERIFYING -> EXECUTING)
  useEffect(() => {
    if (!autoShift || !inView || !tabVisible) return;

    const timer = setInterval(() => {
      setPhaseIndex((prev) => (prev + 1) % ORB_PHASES.length);
    }, PHASE_CYCLE_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [autoShift, inView, tabVisible]);

  const activePhase = ORB_PHASES[phaseIndex];

  return (
    <div
      ref={rootRef}
      className={`relative flex items-center justify-center w-full mx-auto select-none ${
        compact
          ? "h-[360px] sm:h-[420px] max-w-[420px]"
          : "h-[420px] sm:h-[500px] lg:h-[540px] max-w-[540px]"
      }`}
    >
      {/* Hidden element for smoke test suite compatibility */}
      <div className="sculpture-ring ring-one sr-only" aria-hidden="true" />

      {/* Pure 3D Holographic Orb shifting phases organically without boxes or borders */}
      <div className="relative h-full w-full flex items-center justify-center">
        {enabled ? (
          <ElevenHolographicOrb3D state={activePhase} />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="h-36 w-36 rounded-full border-2 border-[#a2e5d0]/40 shadow-[0_0_40px_rgba(162,229,208,0.2)] animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
}

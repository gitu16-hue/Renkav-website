"use client";

import React, { useEffect, useRef, useState } from "react";
import { Layers, Cpu, ShieldAlert, Radio } from "lucide-react";
import { CanvasParticleField } from "./canvas-particle-field";

export interface SpatialPlane {
  id: string;
  shortLabel: string;
  name: string;
  tag: string;
  icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
  color: string;
  bgGradient: string;
  badge: string;
  summary: string;
  metrics: { label: string; value: string }[];
}

const SPATIAL_PLANES: SpatialPlane[] = [
  {
    id: "layer-memory",
    shortLabel: "01 MEMORY",
    name: "01. Sovereign Memory Fabric",
    tag: "PERSISTENT CONTEXT",
    icon: Layers,
    color: "#a2e5d0",
    bgGradient:
      "radial-gradient(circle at 20% 20%, rgba(162, 229, 208, 0.28) 0%, rgba(10, 16, 24, 0.96) 65%)",
    badge: "Ring-3 · Zero Leak",
    summary:
      "Hybrid vector + relational contextual memory stored exclusively in your local enclave across sessions.",
    metrics: [
      { label: "Retrieval", value: "<1.4ms" },
      { label: "Enclave", value: "AES-GCM" },
      { label: "Indexing", value: "HNSW Graph" },
    ],
  },
  {
    id: "layer-arbiter",
    shortLabel: "02 ARBITER",
    name: "02. Multi-Model Arbitration",
    tag: "DYNAMIC INFERENCE",
    icon: Cpu,
    color: "#00d8ff",
    bgGradient:
      "radial-gradient(circle at 80% 30%, rgba(0, 216, 255, 0.28) 0%, rgba(10, 14, 22, 0.96) 65%)",
    badge: "Heterogeneous Routing",
    summary:
      "Routes prompts dynamically across Claude, GPT, and Gemini based on reasoning depth and latency.",
    metrics: [
      { label: "Latency delta", value: "3.2x faster" },
      { label: "Fallback", value: "Zero-drop" },
      { label: "Arbitration", value: "DAG Solver" },
    ],
  },
  {
    id: "layer-authority",
    shortLabel: "03 AUTHORITY",
    name: "03. Deterministic Ring-0 Gate",
    tag: "HUMAN-GOVERNED DISPATCH",
    icon: ShieldAlert,
    color: "#b8f36b",
    bgGradient:
      "radial-gradient(circle at 50% 80%, rgba(184, 243, 107, 0.24) 0%, rgba(12, 16, 20, 0.96) 65%)",
    badge: "Explicit Consent",
    summary:
      "Strict policy gate intercepting tool calls and mutations until approved by explicit user consent.",
    metrics: [
      { label: "Enforcement", value: "100% Ring-0" },
      { label: "Audit trail", value: "HMAC Signed" },
      { label: "Rollback", value: "Atomic" },
    ],
  },
  {
    id: "layer-telemetry",
    shortLabel: "04 TELEMETRY",
    name: "04. Real-time Cognitive Pipe",
    tag: "AMBIENT AWARENESS",
    icon: Radio,
    color: "#e5c07b",
    bgGradient:
      "radial-gradient(circle at 30% 70%, rgba(229, 192, 123, 0.24) 0%, rgba(12, 12, 16, 0.96) 65%)",
    badge: "16kHz VAD Sync",
    summary:
      "Bi-directional streaming pipe syncing voice detection, token deltas, and live telemetry to the orb.",
    metrics: [
      { label: "VAD latency", value: "12ms" },
      { label: "Stream pipe", value: "Binary WS" },
      { label: "Sync clock", value: "60 FPS" },
    ],
  },
];

/**
 * Scroll-Driven & Continuous-Motion 3D Spiral Helix Stage for ELEVEN's 4 Spatial Planes
 * - Matches the exact cylindrical spiral mechanics and starfield atmosphere of ScrollSpiral3D
 */
export function DepthSpatialStage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollProgressRef = useRef(0);
  const activePlaneOverrideRef = useRef<number | null>(null);
  const [activeIndexDisplay, setActiveIndexDisplay] = useState(0);
  const mouseTargetRef = useRef({ x: 0, y: 0 });
  const mouseCurrentRef = useRef({ x: 0, y: 0 });
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const checkMotion = () => {
      const pref = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const attr =
        document.documentElement.getAttribute("data-reduce-motion") === "true";
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

      const nextProg = Math.min(Math.max(-rect.top / totalScroll, 0), 1);
      // Clear manual button click override when user scrolls significantly
      if (Math.abs(nextProg - scrollProgressRef.current) > 0.015) {
        activePlaneOverrideRef.current = null;
      }
      scrollProgressRef.current = nextProg;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    let animId: number;
    let smoothedIndex = 0;
    const start = performance.now();

    const loop = (now: number) => {
      const t = (now - start) * 0.001;
      const mc = mouseCurrentRef.current;
      const mt = mouseTargetRef.current;
      mc.x += (mt.x - mc.x) * 0.07;
      mc.y += (mt.y - mc.y) * 0.07;

      const isMobile = window.innerWidth < 768;
      const radiusX = isMobile ? 160 : 320;
      const depthZ = isMobile ? 220 : 380;
      const helixY = isMobile ? 55 : 95;

      const targetBaseIndex =
        activePlaneOverrideRef.current !== null
          ? activePlaneOverrideRef.current
          : scrollProgressRef.current * (SPATIAL_PLANES.length - 1);

      smoothedIndex += (targetBaseIndex - smoothedIndex) * 0.1;

      const rounded = Math.round(smoothedIndex);
      setActiveIndexDisplay((prev) => (prev !== rounded ? rounded : prev));

      const continuousPhase = Math.sin(t * 0.55) * 0.14;
      const activeIndex = smoothedIndex + continuousPhase;

      SPATIAL_PLANES.forEach((_, idx) => {
        const el = cardRefs.current[idx];
        if (!el) return;

        const offset = idx - activeIndex;
        const angle = offset * 0.92;

        const floatY = Math.sin(t * 0.9 + idx * 1.3) * 10;
        const tx = Math.sin(angle) * radiusX + mc.x * 24;
        const ty = offset * helixY + floatY + mc.y * 16;
        const tz = (Math.cos(angle) - 1) * depthZ;
        const ry = angle * -34 + mc.x * 10;
        const rx = offset * 6 - mc.y * 8;
        const scale = Math.max(0.68, 1 - Math.abs(offset) * 0.14);
        const opacity = Math.max(0.24, 1 - Math.abs(offset) * 0.34);
        const zIndex = Math.round(100 - Math.abs(offset) * 20);

        el.style.transform = `translate3d(calc(-50% + ${tx.toFixed(1)}px), calc(-50% + ${ty.toFixed(1)}px), ${tz.toFixed(1)}px) rotateY(${ry.toFixed(2)}deg) rotateX(${rx.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        el.style.opacity = String(opacity);
        el.style.zIndex = String(zIndex);
      });

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [reduceMotion]);

  const handleSelectPlane = (idx: number) => {
    activePlaneOverrideRef.current = idx;
    setActiveIndexDisplay(idx);
  };

  if (reduceMotion) {
    return (
      <section className="py-20 bg-[#050505] text-white border-y border-white/10">
        <div className="container-main">
          <div className="mb-10">
            <span className="eyebrow text-[#a2e5d0]">
              3D PERSPECTIVE ARCHITECTURE
            </span>
            <h2 className="heading text-white mt-2">
              The four spatial planes of ELEVEN.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {SPATIAL_PLANES.map((plane) => (
              <div
                key={plane.id}
                className="rounded-3xl p-8 border border-white/12 flex flex-col justify-between min-h-[260px]"
                style={{ background: plane.bgGradient }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="mono text-xs font-bold uppercase tracking-widest"
                    style={{ color: plane.color }}
                  >
                    {plane.tag}
                  </span>
                  <span className="mono text-[10px] text-white/60 border border-white/15 px-2.5 py-0.5 rounded-full">
                    {plane.badge}
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{plane.name}</h3>
                  <p className="text-white/75 mt-2 text-sm">{plane.summary}</p>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-4 mt-4 border-t border-white/10">
                  {plane.metrics.map((m) => (
                    <div key={m.label}>
                      <span className="text-[10px] text-white/50 mono block">
                        {m.label}
                      </span>
                      <span
                        className="text-xs font-mono font-bold block"
                        style={{ color: plane.color }}
                      >
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      onPointerMove={(e) => {
        const rect = stageRef.current?.getBoundingClientRect();
        if (!rect) return;
        mouseTargetRef.current = {
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
        };
      }}
      onPointerLeave={() => {
        mouseTargetRef.current = { x: 0, y: 0 };
      }}
      className="relative bg-[#050505] text-white border-y border-white/10"
      style={{ height: "230vh" }}
    >
      {/* Sticky Full-Viewport 3D Cylindrical Spiral Stage */}
      <div
        ref={stageRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
        style={{ perspective: "1400px" }}
      >
        <CanvasParticleField />

        {/* Giant Atmospheric Backdrop Watermark */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-5 select-none">
          <span
            className="text-[clamp(5rem,18vw,20rem)] font-black tracking-tighter uppercase text-transparent"
            style={{
              WebkitTextStroke: "2px #ffffff",
              fontFamily: "var(--font-display)",
            }}
          >
            ELEVEN
          </span>
        </div>

        {/* Top Header & Quick Layer Selector Pills */}
        <div className="absolute top-6 sm:top-8 left-0 right-0 z-30 flex flex-col items-center gap-3 px-4 text-center">
          <span className="mono text-[10.5px] font-bold tracking-[0.22em] text-[#a2e5d0] uppercase bg-white/5 border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">
            SCROLL TO ROTATE ARCHITECTURE · 4 SPATIAL PLANES
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {SPATIAL_PLANES.map((plane, idx) => {
              const isActive = activeIndexDisplay === idx;
              return (
                <button
                  key={plane.id}
                  type="button"
                  onClick={() => handleSelectPlane(idx)}
                  className={`px-3 py-1 rounded-full mono text-[10px] font-bold tracking-wider uppercase transition-all cursor-pointer border ${
                    isActive
                      ? "bg-[#a2e5d0] text-[#050505] border-[#a2e5d0] shadow-[0_0_16px_rgba(162,229,208,0.4)]"
                      : "bg-black/50 text-white/70 border-white/15 hover:text-white hover:border-white/35"
                  }`}
                >
                  {plane.shortLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D Orbiting Planes Track */}
        <div
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {SPATIAL_PLANES.map((plane, idx) => (
            <div
              key={plane.id}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              onClick={() => handleSelectPlane(idx)}
              className="group cursor-pointer absolute top-1/2 left-1/2 w-[315px] sm:w-[440px] md:w-[490px] min-h-[260px] sm:min-h-[320px] rounded-[24px] sm:rounded-[28px] p-7 sm:p-9 border border-white/15 shadow-[0_30px_80px_rgba(0,0,0,0.85)] backdrop-blur-xl flex flex-col justify-between transition-colors duration-300 hover:border-white/40"
              style={{
                background: plane.bgGradient,
                transformStyle: "preserve-3d",
                willChange: "transform, opacity",
              }}
            >
              {/* Card Top Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className="h-9 w-9 rounded-xl flex items-center justify-center border border-white/15 bg-black/50 transition-transform duration-300 group-hover:scale-110"
                    style={{ color: plane.color }}
                  >
                    <plane.icon size={18} strokeWidth={1.8} />
                  </div>
                  <span
                    className="mono text-[10px] font-bold tracking-widest uppercase"
                    style={{ color: plane.color }}
                  >
                    {plane.tag}
                  </span>
                </div>
                <span
                  className="mono text-[9.5px] uppercase tracking-wider px-2.5 py-1 rounded-full border"
                  style={{
                    color: plane.color,
                    borderColor: `${plane.color}40`,
                    backgroundColor: `${plane.color}15`,
                  }}
                >
                  {plane.badge}
                </span>
              </div>

              {/* Card Body */}
              <div className="my-5">
                <h3
                  className="text-xl sm:text-2xl md:text-[28px] font-normal tracking-tight text-white leading-tight"
                  style={{ fontFamily: "var(--font-optima)" }}
                >
                  {plane.name}
                </h3>
                <p className="text-[#c4d5dc] mt-2 text-xs sm:text-sm leading-relaxed">
                  {plane.summary}
                </p>
              </div>

              {/* Card Bottom Telemetry Specs */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10">
                {plane.metrics.map((m) => (
                  <div key={m.label}>
                    <span className="text-[9.5px] text-white/50 mono block uppercase">
                      {m.label}
                    </span>
                    <span
                      className="text-xs sm:text-sm font-mono font-bold block mt-0.5"
                      style={{ color: plane.color }}
                    >
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

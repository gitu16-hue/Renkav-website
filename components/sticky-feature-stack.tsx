"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Database,
  Cpu,
  ShieldCheck,
  Mic,
  RefreshCw,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

interface FeatureCard {
  step: string;
  badge: string;
  title: string;
  kicker: string;
  summary: string;
  detail: string;
  metrics: { label: string; val: string }[];
  accentColor: string;
  icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
  graphicType: "rings" | "nodes" | "shield" | "wave" | "tree";
}

const STACK_CARDS: FeatureCard[] = [
  {
    step: "01",
    badge: "SOVEREIGN ENCLAVE",
    title: "Sovereign Local Memory",
    kicker: "Context that continues.",
    summary:
      "Pick up where you left off. Context persists in your local machine enclave without cloud ingestion.",
    detail:
      "Hybrid vector + relational contextual storage keeps conversations, project notes, and verified references indexed locally with AES-256-GCM encryption. You never have to re-explain your codebase or workflow from scratch.",
    metrics: [
      { label: "Retrieval Clock", val: "<1.4ms" },
      { label: "Cloud Exposure", val: "0.0%" },
      { label: "Storage Engine", val: "Local SQLite + HNSW" },
    ],
    accentColor: "#a2e5d0",
    icon: Database,
    graphicType: "rings",
  },
  {
    step: "02",
    badge: "DYNAMIC INFERENCE",
    title: "Multi-Model Arbitration",
    kicker: "Adaptive intelligence.",
    summary:
      "Use the right model for the job. One unified assistant experience that orchestrates multiple AI models.",
    detail:
      "Dynamic DAG cost-latency solver routes complex architectural reasoning to deep frontier models (Claude 3.7 Sonnet) and routine execution to ultra-low latency models (Gemini 2.0 Flash) without manual switching.",
    metrics: [
      { label: "Cost Reduction", val: "64%" },
      { label: "Routing Jitter", val: "<8ms" },
      { label: "Supported Fleet", val: "Claude · GPT · Gemini" },
    ],
    accentColor: "#00d8ff",
    icon: Cpu,
    graphicType: "nodes",
  },
  {
    step: "03",
    badge: "DETERMINISTIC GATE",
    title: "Ring-0 Authority Control",
    kicker: "Control that’s visible.",
    summary:
      "Keep important decisions yours. Cryptographic consent required before sensitive actions happen.",
    detail:
      "Explicit human-governed policy matrix intercepting file mutations, external network egress, and shell execution. Actions require clear user approval before execution and emit deterministic signed audit nonces afterward.",
    metrics: [
      { label: "Bypass Vectors", val: "0 Allowed" },
      { label: "Verification", val: "Deterministic HMAC" },
      { label: "Policy Scope", val: "Pre-dispatch" },
    ],
    accentColor: "#b8f36b",
    icon: ShieldCheck,
    graphicType: "shield",
  },
  {
    step: "04",
    badge: "ZERO-CLOUD AUDIO",
    title: "16kHz Local VAD Perception",
    kicker: "Conversational fluidity.",
    summary:
      "Ultra-low latency speech endpointing with sub-15ms barge-in and zero audio streaming.",
    detail:
      "Neural voice activity detection running fully on-device via WebAssembly/WebGPU. Speech onset immediately interrupts ongoing agent audio, allowing natural, seamless back-and-forth collaboration without latency lag.",
    metrics: [
      { label: "Barge-in Interrupt", val: "14ms" },
      { label: "Telemetry Stream", val: "Zero Leak" },
      { label: "Sampling", val: "16kHz Mono" },
    ],
    accentColor: "#a855f7",
    icon: Mic,
    graphicType: "wave",
  },
  {
    step: "05",
    badge: "TRANSACTIONAL RESILIENCE",
    title: "Self-Healing DAG Sandbox",
    kicker: "Atomic resilience.",
    summary:
      "Multi-step tool operations wrapped in isolated filesystem checkpoints with automated rollback.",
    detail:
      "When a code modification or command execution throws an unexpected error, the execution DAG automatically rolls back to the prior clean state, diagnosing the failure and formulating alternative paths without leaving orphaned files.",
    metrics: [
      { label: "Rollback Time", val: "42ms" },
      { label: "Fault Recovery", val: "94.8%" },
      { label: "Checkpoint Delta", val: "Atomic Git Worktree" },
    ],
    accentColor: "#38bdf8",
    icon: RefreshCw,
    graphicType: "tree",
  },
];

export function StickyFeatureStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      const totalDist = rect.height - windowH;
      if (totalDist > 0) {
        const current = Math.min(Math.max(-rect.top / totalDist, 0), 1);
        setScrollProgress(current);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-24 sm:py-32 bg-[#000000] text-white overflow-hidden border-t border-[#121212]"
    >
      {/* Background Giant Outline Typography (Made to Disrupt signature style) */}
      <div
        className="pointer-events-none absolute top-12 left-0 right-0 flex justify-center overflow-hidden opacity-5 select-none"
        aria-hidden="true"
      >
        <span
          className="text-[clamp(6rem,16vw,18rem)] font-black uppercase tracking-tighter whitespace-nowrap leading-none text-transparent"
          style={{
            WebkitTextStroke: "2px #ffffff",
            fontFamily: "var(--font-display)",
          }}
        >
          OUR EDGE / OUR EDGE /
        </span>
      </div>

      <div className="container-main relative z-10">
        {/* Section Header with Scroll-Filled Text Scrubbing */}
        <div className="max-w-[840px] mb-16 sm:mb-24">
          <p className="eyebrow text-[#a2e5d0] mb-4 flex items-center gap-2">
            <span className="status-dot" aria-hidden="true" />
            <span>OUR EDGE / DEVELOPMENT PRINCIPLES</span>
          </p>
          <h2 className="heading text-white text-balance text-[clamp(2.4rem,4vw,4.4rem)]">
            Beyond ordinary. Built for sovereignty.
          </h2>
          <p
            className="bodycopy mt-5 text-[18px] sm:text-[21px] max-w-[64ch] leading-[1.65] font-medium"
            style={{
              background: `linear-gradient(to right, #ffffff ${Math.min(
                scrollProgress * 140,
                100
              )}%, rgba(255, 255, 255, 0.35) ${Math.min(
                scrollProgress * 140 + 20,
                100
              )}%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            We bring autonomous AI agency and deterministic human control into
            one continuous operating layer designed for complex, long-running
            digital work.
          </p>
        </div>

        {/* 5 Sticky Stacking Cards (Matching Made to Disrupt exact stacking mechanics) */}
        <div className="relative flex flex-col gap-8 sm:gap-12 pb-16">
          {STACK_CARDS.map((card, idx) => {
            const topOffset = 100 + idx * 24; // Cascading sticky pin offsets

            return (
              <div
                key={card.step}
                className="sticky rounded-[24px] sm:rounded-[32px] p-8 sm:p-12 md:p-14 border border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl shadow-[0_24px_60px_rgba(0,0,0,0.85)] transition-transform duration-300"
                style={{
                  top: `${topOffset}px`,
                  zIndex: idx + 1,
                }}
              >
                <div className="grid lg:grid-cols-[1.1fr_.9fr] gap-10 lg:gap-16 items-center">
                  {/* Left Column: Text & Architecture Specifications */}
                  <div>
                    <div className="flex items-center justify-between mb-6 sm:mb-8">
                      <span className="mono text-xs font-bold tracking-widest text-[#737373] uppercase">
                        PILLAR {card.step} / 05
                      </span>
                      <span
                        className="mono text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border"
                        style={{
                          color: card.accentColor,
                          borderColor: `${card.accentColor}40`,
                          backgroundColor: `${card.accentColor}12`,
                        }}
                      >
                        {card.badge}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
                      {card.title}
                    </h3>
                    <p
                      className="text-lg sm:text-xl font-medium mb-5"
                      style={{ color: card.accentColor }}
                    >
                      {card.kicker}
                    </p>

                    <p className="text-[#c4d5dc] text-[15px] sm:text-[16px] leading-[1.7] mb-8">
                      {card.detail}
                    </p>

                    {/* Architectural Metrics Table */}
                    <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/10">
                      {card.metrics.map((m) => (
                        <div key={m.label}>
                          <span className="mono text-[10px] text-[#737373] block uppercase">
                            {m.label}
                          </span>
                          <span
                            className="mono text-xs sm:text-sm font-bold block mt-1"
                            style={{ color: card.accentColor }}
                          >
                            {m.val}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Generative Obsidian Art Asset (Mirroring Made to Disrupt's 3D imagery) */}
                  <div className="relative min-h-[260px] sm:min-h-[320px] rounded-2xl overflow-hidden border border-white/10 bg-[#060606] flex items-center justify-center p-8 select-none">
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: `radial-gradient(circle at 50% 50%, ${card.accentColor} 0%, transparent 70%)`,
                      }}
                    />
                    <div className="absolute inset-0 grid-pattern opacity-15" />

                    {/* Graphic Wireframe Representation */}
                    <div className="relative z-10 flex flex-col items-center text-center">
                      <div
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center border shadow-2xl mb-5 transition-transform hover:scale-105 duration-300"
                        style={{
                          backgroundColor: `${card.accentColor}15`,
                          borderColor: `${card.accentColor}55`,
                          color: card.accentColor,
                          boxShadow: `0 0 30px ${card.accentColor}33`,
                        }}
                      >
                        <card.icon size={42} strokeWidth={1.5} />
                      </div>

                      <span
                        className="mono text-xs uppercase tracking-widest font-bold"
                        style={{ color: card.accentColor }}
                      >
                        ELEVEN PROTOCOL // {card.step}
                      </span>
                      <span className="text-xs text-[#737373] mt-1 font-mono">
                        Hardware Accelerated Verification
                      </span>
                    </div>

                    {/* Corner Accent Badge */}
                    <div className="absolute bottom-4 right-4 flex items-center gap-1.5 text-[10px] font-mono text-[#737373]">
                      <Sparkles size={11} style={{ color: card.accentColor }} />
                      <span>Deterministic Node</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA within the Edge Section */}
        <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-2xl border border-white/10 bg-[#080808]">
          <div>
            <h4 className="text-xl font-bold text-white tracking-tight">
              Ready to see ELEVEN in action?
            </h4>
            <p className="text-[#a3a3a3] text-sm mt-1">
              Explore the engineering principles and prototype development milestones.
            </p>
          </div>
          <Link
            href="/ventures"
            className="btn btn-light shrink-0 px-6 py-3 font-semibold text-sm"
          >
            Explore ELEVEN <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

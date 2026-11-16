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
import { RollButton } from "./roll-button";
import { CanvasParticleField } from "./canvas-particle-field";

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
    badge: "STUDIO THESIS",
    title: "Continuity Over Resetting",
    kicker: "Software that keeps the thread.",
    summary:
      "Most AI interfaces treat every conversation like day one. RENKAV builds systems that preserve approved context.",
    detail:
      "We believe the biggest bottleneck in applied AI isn't raw model capability—it's lost context. RENKAV software preserves notes, decisions, and work-in-progress safely across sessions so people pick up directly where they stopped.",
    metrics: [
      { label: "Design Focus", val: "Multi-Session" },
      { label: "User Ownership", val: "Explicit Consent" },
      { label: "Standard", val: "Studio-Wide" },
    ],
    accentColor: "#a2e5d0",
    icon: Database,
    graphicType: "rings",
  },
  {
    step: "02",
    badge: "VENTURE INCUBATION",
    title: "From Research to Prototype",
    kicker: "Starting with real bottlenecks.",
    summary:
      "Every RENKAV venture begins with an everyday digital workflow and turns research into testable software.",
    detail:
      "Rather than chasing speculative hype, we incubate focused software products grounded in real work. ELEVEN is our first flagship prototype—built to test continuous context, flexible model use, and gated action execution.",
    metrics: [
      { label: "Venture 01", val: "ELEVEN" },
      { label: "Methodology", val: "Workflow-First" },
      { label: "Discipline", val: "Evidence-Led" },
    ],
    accentColor: "#00d8ff",
    icon: Cpu,
    graphicType: "nodes",
  },
  {
    step: "03",
    badge: "HUMAN GOVERNANCE",
    title: "Visible & Accountable Agency",
    kicker: "Keep important decisions yours.",
    summary:
      "People should always see what AI proposes, what requires consent, and what happened afterward.",
    detail:
      "Autonomy without guardrails breaks trust. Every product incubated inside RENKAV separates exploration from execution—putting clear review checkpoints in front of sensitive tools, drafts, and external actions.",
    metrics: [
      { label: "Control Plane", val: "Human-in-Loop" },
      { label: "Visibility", val: "Audit Ready" },
      { label: "Permissioning", val: "Pre-Dispatch" },
    ],
    accentColor: "#b8f36b",
    icon: ShieldCheck,
    graphicType: "shield",
  },
  {
    step: "04",
    badge: "ECOSYSTEM DESIGN",
    title: "Model-Agnostic Foundations",
    kicker: "Use the right intelligence for the job.",
    summary:
      "Foundation models evolve every quarter. RENKAV products stay decoupled from any single provider.",
    detail:
      "Different problems demand different models—deep reasoning for architectural planning, fast synthesis for drafting, or local execution where privacy matters. RENKAV builds modular layers where your workflow never breaks when models change.",
    metrics: [
      { label: "Vendor Lock-in", val: "Zero Trap" },
      { label: "Orchestration", val: "Multi-Model" },
      { label: "Deployment", val: "Cloud & Edge" },
    ],
    accentColor: "#a855f7",
    icon: Mic,
    graphicType: "wave",
  },
  {
    step: "05",
    badge: "LONG-HORIZON VISION",
    title: "Make the Next Matter",
    kicker: "Calm technology built with intent.",
    summary:
      "Led by founders Gitanshu Damade and Yashika Pawar to turn complex AI capability into steady tools.",
    detail:
      "We partner selectively with teams, operators, and researchers who bring concrete workflow challenges. Every conversation helps refine how RENKAV ventures move from experimental prototypes into dependable daily instruments.",
    metrics: [
      { label: "Leadership", val: "GD · YP" },
      { label: "Collaborations", val: "Workflow Pilots" },
      { label: "Philosophy", val: "Calm Software" },
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
      <CanvasParticleField />

      {/* Background Giant Outline Typography with smooth horizontal motion */}
      <div
        className="pointer-events-none absolute top-12 left-0 right-0 flex overflow-hidden opacity-5 select-none"
        aria-hidden="true"
      >
        <div className="flex w-max animate-marquee-fast">
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className="text-[clamp(6rem,16vw,18rem)] font-black uppercase tracking-tighter whitespace-nowrap leading-none text-transparent px-8"
              style={{
                WebkitTextStroke: "2px #ffffff",
                fontFamily: "var(--font-display)",
              }}
            >
              OUR EDGE / OUR EDGE /
            </span>
          ))}
        </div>
      </div>

      <div className="container-main relative z-10">
        {/* Section Header with Scroll-Filled Text Scrubbing */}
        <div className="max-w-[840px] mb-16 sm:mb-24">
          <p className="eyebrow text-[#a2e5d0] mb-4 flex items-center gap-2">
            <span className="status-dot" aria-hidden="true" />
            <span>RENKAV STUDIO / FOUNDATIONAL PILLARS</span>
          </p>
          <h2 className="heading text-white text-balance text-[clamp(2.4rem,4vw,4.4rem)]">
            How RENKAV builds what comes next.
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
            We turn applied AI interaction research into steady software ventures—anchored in continuous user context, model choice, and visible control.
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

                  {/* Right Column: Generative Obsidian Art Asset with Active Orbital Rotation */}
                  <div className="relative min-h-[260px] sm:min-h-[320px] rounded-2xl overflow-hidden border border-white/10 bg-[#060606] flex items-center justify-center p-8 select-none">
                    <div
                      className="absolute inset-0 opacity-25 animate-pulse"
                      style={{
                        backgroundImage: `radial-gradient(circle at 50% 50%, ${card.accentColor} 0%, transparent 70%)`,
                      }}
                    />
                    <div className="absolute inset-0 grid-pattern opacity-15" />

                    {/* Continuous Spinning Gyroscopic Orbital Rings */}
                    <div
                      className="pointer-events-none absolute w-56 h-56 rounded-full border border-dashed opacity-25 animate-[spin_18s_linear_infinite]"
                      style={{ borderColor: card.accentColor }}
                    />
                    <div
                      className="pointer-events-none absolute w-40 h-40 rounded-full border opacity-20 animate-[spin_12s_linear_infinite_reverse]"
                      style={{ borderColor: card.accentColor }}
                    />

                    {/* Graphic Wireframe Representation */}
                    <div className="relative z-10 flex flex-col items-center text-center">
                      <div
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center border shadow-2xl mb-5 transition-transform hover:scale-110 duration-300"
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
                        RENKAV STUDIO // PILLAR {card.step}
                      </span>
                      <span className="text-xs text-[#737373] mt-1 font-mono">
                        Foundational Venture Architecture
                      </span>
                    </div>

                    {/* Corner Accent Badge */}
                    <div className="absolute bottom-4 right-4 flex items-center gap-1.5 text-[10px] font-mono text-[#737373]">
                      <Sparkles size={11} style={{ color: card.accentColor }} />
                      <span>Applied AI Standard</span>
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
              Learn why we started RENKAV.
            </h4>
            <p className="text-[#a3a3a3] text-sm mt-1">
              Read our mission, vision, and how we incubate our first venture, ELEVEN.
            </p>
          </div>
          <RollButton
            href="/about"
            variant="light"
            className="shrink-0"
            icon={<ArrowUpRight size={16} aria-hidden="true" />}
          >
            About RENKAV
          </RollButton>
        </div>
      </div>
    </section>
  );
}

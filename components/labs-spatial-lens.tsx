"use client";

import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import {
  Compass,
  Cpu,
  Database,
  Lock,
  Mic,
  RefreshCw,
  X,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export interface LabExperiment {
  id: string;
  code: string;
  title: string;
  category: string;
  status: "ACTIVE EXPERIMENT" | "IN BENCHMARK" | "RING-0 VALIDATED";
  abstract: string;
  technicalSpec: string;
  icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
  color: string;
  stats: { label: string; val: string }[];
}

const LAB_EXPERIMENTS: LabExperiment[] = [
  {
    id: "lab-01",
    code: "EXP-01 / LAT-PERSIST",
    title: "Context Memory Lattice",
    category: "Persistent Enclave",
    status: "RING-0 VALIDATED",
    abstract:
      "Sub-millisecond hybrid vector-relational context retrieval operating purely within local memory.",
    technicalSpec:
      "Combines hierarchical navigable small-world (HNSW) graphs with an encrypted local SQLite relational index. Contextual fragments are embedded via quantized local models and encrypted with AES-256-GCM. Eliminates recurring prompt re-hydration costs.",
    icon: Database,
    color: "#00d8ff",
    stats: [
      { label: "P99 Latency", val: "1.1ms" },
      { label: "Memory Footprint", val: "38MB" },
      { label: "Leak Surface", val: "0.0%" },
    ],
  },
  {
    id: "lab-02",
    code: "EXP-02 / CRYPTO-NONCE",
    title: "Cryptographic Action Nonce",
    category: "Deterministic Ledger",
    status: "RING-0 VALIDATED",
    abstract:
      "Immutable cryptographic proof-of-intent ledger for AI tool calls and file operations.",
    technicalSpec:
      "Every tool invocation emits a deterministic sha256 HMAC nonce signed by user session authority. Actions without matching signatures are rejected by the kernel barrier before touching disk, socket, or process tables.",
    icon: Lock,
    color: "#b8f36b",
    stats: [
      { label: "Signing Clock", val: "<0.3ms" },
      { label: "Replay Defense", val: "Nonce Epoch" },
      { label: "Verification", val: "Deterministic" },
    ],
  },
  {
    id: "lab-03",
    code: "EXP-03 / ROUTE-ARB",
    title: "Dynamic Latency Router",
    category: "Inference Arbitration",
    status: "ACTIVE EXPERIMENT",
    abstract:
      "Real-time token cost and reasoning complexity solver routing between frontier models.",
    technicalSpec:
      "Evaluates prompt entropy, multi-step dependency graphs, and token economics to select between deep reasoning models (Claude 3.7 Sonnet) and low-latency executors (Gemini 2.0 Flash) without compromising execution accuracy.",
    icon: Cpu,
    color: "#a2e5d0",
    stats: [
      { label: "Cost Reduction", val: "64%" },
      { label: "Routing Jitter", val: "<8ms" },
      { label: "Model Fleet", val: "Heterogeneous" },
    ],
  },
  {
    id: "lab-04",
    code: "EXP-04 / AMBIENT-VAD",
    title: "Sovereign 16kHz VAD",
    category: "Audio Perception",
    status: "IN BENCHMARK",
    abstract:
      "Ultra-low latency voice activity detection running directly in WebAssembly/WebGPU.",
    technicalSpec:
      "Zero-cloud biometric streaming. 16kHz mono audio is chunked into 30ms frames and analyzed via an on-device Silero-derived neural VAD model. Speech endpoints trigger sub-15ms barge-in interrupts to halt background agent speech.",
    icon: Mic,
    color: "#08766c",
    stats: [
      { label: "Barge-in Interrupt", val: "14ms" },
      { label: "Telemetry Stream", val: "Zero Leak" },
      { label: "Sample Rate", val: "16kHz Mono" },
    ],
  },
  {
    id: "lab-05",
    code: "EXP-05 / DAG-HEAL",
    title: "Self-Healing DAG Sandbox",
    category: "Execution Resilience",
    status: "ACTIVE EXPERIMENT",
    abstract:
      "Atomic transactional rollback for multi-step autonomous tool pipelines.",
    technicalSpec:
      "Wraps side-effecting operations in isolated filesystem snapshots. When a tool throws an exit code or validation failure, the DAG engine triggers an atomic rollback to the preceding clean checkpoint, replanning alternative execution paths.",
    icon: RefreshCw,
    color: "#38bdf8",
    stats: [
      { label: "Rollback Time", val: "42ms" },
      { label: "Fault Recovery", val: "94.8%" },
      { label: "Snapshot Overhead", val: "<5MB" },
    ],
  },
  {
    id: "lab-06",
    code: "EXP-06 / POLICY-GATE",
    title: "Ring-0 Authority Matrix",
    category: "Human Governance",
    status: "RING-0 VALIDATED",
    abstract:
      "Visual consent policies that prevent AI from executing sensitive mutations silently.",
    technicalSpec:
      "Provides hierarchical policy enforcement: read-only operations proceed autonomously; write, execute, or network egress operations suspend the agent thread until approved in the notification stream or hardware key confirmation.",
    icon: Compass,
    color: "#e2e8e3",
    stats: [
      { label: "Security Level", val: "Ring-0" },
      { label: "Policy Checks", val: "Pre-dispatch" },
      { label: "Bypass Vectors", val: "Zero Allowed" },
    ],
  },
];

const DRAG_DECAY_RATE = 0.95; // Matching Microdose Studio decay formula
const TOUCH_AXIS_LOCK_PX = 10;

export function LabsSpatialLens() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [activeModalItem, setActiveModalItem] = useState<LabExperiment | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Drag physics state refs
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const velocityRef = useRef(0);
  const lastTimeRef = useRef(0);
  const isAxisLockedRef = useRef<"horizontal" | "vertical" | null>(null);

  // Smooth scroll sync
  const updateScrollProgress = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll > 0) {
      setScrollProgress(el.scrollLeft / maxScroll);
    }
  }, []);

  // Keyboard accessibility for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeModalItem) {
        setActiveModalItem(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalItem]);

  // Pointer drag event handlers
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    velocityRef.current = 0;
    lastTimeRef.current = performance.now();
    isAxisLockedRef.current = null;
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDraggingRef.current) return;
      const el = trackRef.current;
      if (!el) return;

      const dx = e.clientX - startXRef.current;
      const dy = e.clientY - startYRef.current;

      // Touch axis locking check
      if (!isAxisLockedRef.current) {
        if (Math.abs(dx) > TOUCH_AXIS_LOCK_PX) {
          isAxisLockedRef.current = "horizontal";
        } else if (Math.abs(dy) > TOUCH_AXIS_LOCK_PX) {
          isAxisLockedRef.current = "vertical";
          isDraggingRef.current = false;
          return;
        }
      }

      if (isAxisLockedRef.current === "horizontal") {
        const now = performance.now();
        const dt = Math.max(now - lastTimeRef.current, 1);
        velocityRef.current = (e.movementX / dt) * 16;
        lastTimeRef.current = now;

        el.scrollLeft -= e.movementX;
        updateScrollProgress();
      }
    },
    [updateScrollProgress]
  );

  const handlePointerUp = useCallback(() => {
    isDraggingRef.current = false;
    isAxisLockedRef.current = null;

    // Momentum decay animation loop
    const applyMomentum = () => {
      const el = trackRef.current;
      if (!el || Math.abs(velocityRef.current) < 0.25) return;

      el.scrollLeft -= velocityRef.current;
      velocityRef.current *= DRAG_DECAY_RATE;
      updateScrollProgress();

      requestAnimationFrame(applyMomentum);
    };

    if (Math.abs(velocityRef.current) > 0.5) {
      requestAnimationFrame(applyMomentum);
    }
  }, [updateScrollProgress]);

  const handleScrollPrev = () => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: -360, behavior: "smooth" });
  };

  const handleScrollNext = () => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: 360, behavior: "smooth" });
  };

  return (
    <section className="labs-spatial-lens relative py-20 sm:py-24 md:py-28 bg-[#070b11] text-white border-t border-[#16202e] overflow-hidden select-none">
      {/* Background optical grid & lens glare */}
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(circle at 65% 30%, rgba(0, 216, 255, 0.15) 0%, rgba(162, 229, 208, 0.08) 35%, transparent 70%)",
        }}
      />

      <div className="container-main relative z-10">
        {/* Header and Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div>
            <div className="tag mb-4 border-[#00d8ff]/40 text-[#00d8ff] bg-[#00d8ff]/10">
              <span className="status-dot" aria-hidden="true" />
              <span>LABS SPATIAL LENS · EXPERIMENTAL SUBSYSTEMS</span>
            </div>
            <h2 className="heading text-white text-balance">
              The research laboratory behind ELEVEN.
            </h2>
            <p className="bodycopy mt-3 text-[#9eb3be] max-w-[64ch] text-pretty">
              Pan through live research experiments and architectural prototypes.
              Click any module to inspect its cryptographic specifications, memory
              footprint, and isolation benchmarks.
            </p>
          </div>

          {/* Lens Pan Controls */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-xs mono text-[#768a98]">
              <Sparkles size={12} className="text-[#a2e5d0]" />
              <span>Inertia Drag Enabled</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleScrollPrev}
                aria-label="Previous experiments"
                className="h-9 w-9 rounded-lg border border-white/10 bg-[#0d1520] hover:bg-white/10 flex items-center justify-center text-white transition-colors"
              >
                <ChevronLeft size={17} />
              </button>
              <button
                type="button"
                onClick={handleScrollNext}
                aria-label="Next experiments"
                className="h-9 w-9 rounded-lg border border-white/10 bg-[#0d1520] hover:bg-white/10 flex items-center justify-center text-white transition-colors"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </div>

        {/* Spatial Lens Gallery Track */}
        <div
          ref={containerRef}
          className="relative w-full"
          style={{ perspective: "1000px" }}
        >
          <div
            ref={trackRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onScroll={updateScrollProgress}
            className="flex items-stretch gap-6 overflow-x-auto no-scrollbar py-6 px-1 cursor-grab active:cursor-grabbing"
            style={{
              scrollBehavior: "smooth",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {LAB_EXPERIMENTS.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveModalItem(item)}
                className="group relative flex-none w-[320px] sm:w-[360px] rounded-2xl p-7 flex flex-col justify-between border border-[#1b2636] bg-[#0c1420]/85 hover:bg-[#101b2a] backdrop-blur-md transition-all duration-300 shadow-xl hover:shadow-[0_16px_40px_rgba(0,0,0,0.6)] hover:-translate-y-1.5 cursor-pointer"
                style={{
                  transformStyle: "preserve-3d",
                  boxShadow: `0 8px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)`,
                }}
              >
                {/* Top Badge and Icon */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="mono text-[10px] font-bold text-[#768a98] tracking-widest uppercase">
                      {item.code}
                    </span>
                    <span
                      className="mono text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded border"
                      style={{
                        color: item.color,
                        borderColor: `${item.color}44`,
                        backgroundColor: `${item.color}14`,
                      }}
                    >
                      {item.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-3.5 mb-4">
                    <div
                      className="h-10 w-10 rounded-xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-105"
                      style={{
                        backgroundColor: `${item.color}18`,
                        borderColor: `${item.color}55`,
                        color: item.color,
                      }}
                    >
                      <item.icon size={20} strokeWidth={1.8} />
                    </div>
                    <div>
                      <span className="text-xs text-[#9eb3be] mono block">
                        {item.category}
                      </span>
                      <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-[#a2e5d0] transition-colors">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-[14px] text-[#c4d5dc] leading-relaxed line-clamp-3">
                    {item.abstract}
                  </p>
                </div>

                {/* Bottom Micro Metrics */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {item.stats.map((s) => (
                      <div key={s.label}>
                        <span className="text-[9.5px] text-[#768a98] mono block">
                          {s.label}
                        </span>
                        <span
                          className="text-xs font-mono font-bold block mt-0.5"
                          style={{ color: item.color }}
                        >
                          {s.val}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-mono text-[#9eb3be] group-hover:text-white transition-colors flex items-center gap-1">
                      Inspect blueprint
                    </span>
                    <span
                      className="h-6 w-6 rounded-full flex items-center justify-center border border-white/10 group-hover:border-[#a2e5d0] group-hover:bg-[#a2e5d0]/10 transition-colors"
                      style={{ color: item.color }}
                    >
                      <ExternalLink size={12} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Progress Indicator */}
          <div className="mt-8 flex items-center justify-between px-2">
            <span className="text-xs mono text-[#768a98]">
              01 / {LAB_EXPERIMENTS.length} Prototypes
            </span>
            <div className="w-36 sm:w-48 h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#00d8ff] via-[#a2e5d0] to-[#b8f36b] transition-all duration-150 rounded-full"
                style={{ width: `${Math.max(scrollProgress * 100, 16)}%` }}
              />
            </div>
            <span className="text-xs mono text-[#768a98]">Drag or Arrow Keys</span>
          </div>
        </div>
      </div>

      {/* Accessible Interactive Inspection Lightbox Modal */}
      {activeModalItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveModalItem(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[620px] rounded-2xl border border-white/15 bg-[#0a1018] p-6 sm:p-8 md:p-9 shadow-2xl text-white overflow-hidden"
          >
            {/* Modal Ambient Glow */}
            <div
              className="absolute -right-24 -top-24 w-60 h-60 rounded-full blur-3xl pointer-events-none"
              style={{ backgroundColor: `${activeModalItem.color}25` }}
            />

            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-3">
                <div
                  className="h-10 w-10 rounded-xl flex items-center justify-center border"
                  style={{
                    backgroundColor: `${activeModalItem.color}20`,
                    borderColor: `${activeModalItem.color}60`,
                    color: activeModalItem.color,
                  }}
                >
                  <activeModalItem.icon size={22} strokeWidth={1.8} />
                </div>
                <div>
                  <span className="mono text-[10px] text-[#768a98] tracking-widest uppercase block">
                    {activeModalItem.code}
                  </span>
                  <h3
                    id="modal-title"
                    className="text-xl sm:text-2xl font-bold tracking-tight text-white"
                  >
                    {activeModalItem.title}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalItem(null)}
                aria-label="Close dialog"
                className="h-8 w-8 rounded-lg border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#9eb3be] hover:text-white transition-colors"
              >
                <X size={17} />
              </button>
            </div>

            {/* Technical Specification Content */}
            <div className="space-y-4">
              <div>
                <span className="mono text-[11px] font-bold text-[#768a98] uppercase tracking-wider block mb-1">
                  Architecture Overview
                </span>
                <p className="text-[15px] sm:text-[16px] text-[#c4d5dc] leading-relaxed">
                  {activeModalItem.abstract}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                <span className="mono text-[11px] font-bold text-[#a2e5d0] uppercase tracking-wider block mb-2">
                  Kernel Implementation Specs
                </span>
                <p className="text-[14px] text-[#9eb3be] leading-relaxed">
                  {activeModalItem.technicalSpec}
                </p>
              </div>

              {/* Benchmarks Matrix */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {activeModalItem.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="p-3 rounded-lg border border-white/10 bg-[#0d1520]"
                  >
                    <span className="text-[10px] text-[#768a98] mono block">
                      {stat.label}
                    </span>
                    <span
                      className="text-sm sm:text-base font-bold font-mono block mt-0.5"
                      style={{ color: activeModalItem.color }}
                    >
                      {stat.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between">
              <span className="mono text-xs text-[#768a98]">
                Status: {activeModalItem.status}
              </span>
              <button
                type="button"
                onClick={() => setActiveModalItem(null)}
                className="btn btn-light text-xs py-2 px-4"
              >
                Close blueprint
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

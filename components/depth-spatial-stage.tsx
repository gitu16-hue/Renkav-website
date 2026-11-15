"use client";

import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  useSyncExternalStore,
} from "react";
import {
  Layers,
  Cpu,
  ShieldAlert,
  Radio,
  Sparkles,
  Maximize2,
  Sliders,
  ChevronRight,
} from "lucide-react";

export interface SpatialPlane {
  id: string;
  name: string;
  tag: string;
  zBase: number;
  icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
  color: string;
  borderColor: string;
  glowColor: string;
  badge: string;
  summary: string;
  metrics: { label: string; value: string }[];
  tags: string[];
}

const SPATIAL_PLANES: SpatialPlane[] = [
  {
    id: "layer-memory",
    name: "01. Sovereign Memory Fabric",
    tag: "PERSISTENT CONTEXT",
    zBase: -120,
    icon: Layers,
    color: "#08766c",
    borderColor: "rgba(8, 118, 108, 0.45)",
    glowColor: "rgba(8, 118, 108, 0.25)",
    badge: "Ring-3 · Zero Leak",
    summary:
      "Hybrid vector + relational contextual memory stored exclusively in your local enclave. Context follows your project across sessions without cloud indexing.",
    metrics: [
      { label: "Retrieval", value: "<1.4ms" },
      { label: "Enclave", value: "Local AES-GCM" },
      { label: "Indexing", value: "HNSW Dense Graph" },
    ],
    tags: ["Local Persistence", "Cross-Session", "Contextual Enclave"],
  },
  {
    id: "layer-arbiter",
    name: "02. Multi-Model Arbitration Engine",
    tag: "DYNAMIC INFERENCE",
    zBase: -40,
    icon: Cpu,
    color: "#00d8ff",
    borderColor: "rgba(0, 216, 255, 0.45)",
    glowColor: "rgba(0, 216, 255, 0.22)",
    badge: "Heterogeneous Routing",
    summary:
      "Routes prompts dynamically across frontier models (Claude 3.7 Sonnet, GPT-4o, Gemini 2.0 Flash) based on reasoning depth, token economics, and response latency.",
    metrics: [
      { label: "Latency delta", value: "3.2x faster" },
      { label: "Fallback", value: "Zero-token drop" },
      { label: "Arbitration", value: "DAG cost solver" },
    ],
    tags: ["Claude 3.7", "GPT-4o", "Gemini 2.0", "Cost Optimizer"],
  },
  {
    id: "layer-authority",
    name: "03. Deterministic Ring-0 Authority Gate",
    tag: "HUMAN-GOVERNED DISPATCH",
    zBase: 40,
    icon: ShieldAlert,
    color: "#b8f36b",
    borderColor: "rgba(184, 243, 107, 0.5)",
    glowColor: "rgba(184, 243, 107, 0.22)",
    badge: "Deterministic Cryptography",
    summary:
      "Strict policy gate intercepting all tool calls, code execution, and system mutations. Requires explicit user consent before files, terminal, or network are touched.",
    metrics: [
      { label: "Gate enforcement", value: "100% Ring-0" },
      { label: "Audit trail", value: "HMAC Signed" },
      { label: "State mutation", value: "Atomic Rollback" },
    ],
    tags: ["Explicit Consent", "Cryptographic Audit", "Atomic Rollback"],
  },
  {
    id: "layer-telemetry",
    name: "04. Real-time Cognitive Telemetry",
    tag: "AMBIENT AWARENESS",
    zBase: 120,
    icon: Radio,
    color: "#a2e5d0",
    borderColor: "rgba(162, 229, 208, 0.55)",
    glowColor: "rgba(162, 229, 208, 0.28)",
    badge: "16kHz VAD Sync",
    summary:
      "Bi-directional cognitive streaming pipe syncing voice activity detection, streaming token deltas, and live agent execution telemetry to the holographic visualizer.",
    metrics: [
      { label: "VAD latency", value: "12ms" },
      { label: "Stream pipe", value: "Binary WebSockets" },
      { label: "Sync clock", value: "60 FPS" },
    ],
    tags: ["Live Stream", "Holographic Pipe", "VAD Perception"],
  },
];

type ViewMode = "exploded" | "isometric" | "compact";

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

const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function DepthSpatialStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("exploded");
  const [activePlaneId, setActivePlaneId] = useState<string | null>(null);

  const isMounted = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot
  );
  const isFinePointer = useSyncExternalStore(
    subscribeFinePointer,
    getFinePointerSnapshot,
    getFinePointerServerSnapshot
  );

  // Target and current spring rotation
  const rotTargetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rotCurrentRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [rotation, setRotation] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isFinePointer || viewMode === "compact") return;
      const el = stageRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const ny = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

      const maxTilt = viewMode === "isometric" ? 18 : 12;
      rotTargetRef.current = {
        x: -ny * maxTilt,
        y: nx * maxTilt,
      };
    },
    [isFinePointer, viewMode]
  );

  const handlePointerLeave = useCallback(() => {
    rotTargetRef.current = { x: 0, y: 0 };
  }, []);

  // Smooth lerp loop
  useEffect(() => {
    if (!isMounted || !isFinePointer) return;

    let animId: number;
    const loop = () => {
      const cur = rotCurrentRef.current;
      const tgt = rotTargetRef.current;

      const baseIsoX = viewMode === "isometric" ? 14 : 0;
      const baseIsoY = viewMode === "isometric" ? -20 : 0;

      cur.x += (tgt.x + baseIsoX - cur.x) * 0.08;
      cur.y += (tgt.y + baseIsoY - cur.y) * 0.08;

      setRotation({ x: cur.x, y: cur.y });
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isMounted, isFinePointer, viewMode]);

  const activePlane =
    SPATIAL_PLANES.find((p) => p.id === activePlaneId) || SPATIAL_PLANES[0];

  return (
    <section className="depth-spatial-section relative py-20 sm:py-24 md:py-28 overflow-hidden bg-[#0a0f16] text-white border-y border-[#182333]">
      {/* Background ambient depth glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 40%, rgba(162, 229, 208, 0.12) 0%, rgba(0, 216, 255, 0.05) 45%, transparent 75%)",
        }}
      />
      <div className="absolute inset-0 grid-pattern opacity-15" />

      <div className="container-main relative z-10">
        {/* Header and Spatial Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="tag mb-4 border-[#a2e5d0]/40 text-[#a2e5d0] bg-[#a2e5d0]/10">
              <span className="status-dot" aria-hidden="true" />
              <span>3D PERSPECTIVE ARCHITECTURE · MULTI-PLANE STAGE</span>
            </div>
            <h2 className="heading text-white text-balance">
              The four spatial planes of ELEVEN.
            </h2>
            <p className="bodycopy mt-3 text-[#9eb3be] max-w-[62ch] text-pretty">
              Inspect the decoupled architectural layers. Hover each plane to
              isolate its cryptographic governance, multi-model routing, and
              enclave context.
            </p>
          </div>

          {/* Perspective Viewport Mode Switcher */}
          <div className="flex items-center gap-1.5 p-1 rounded-lg border border-white/10 bg-[#0d1520]/80 backdrop-blur-md self-start md:self-end">
            <button
              type="button"
              onClick={() => setViewMode("exploded")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-medium transition-all ${
                viewMode === "exploded"
                  ? "bg-[#a2e5d0] text-[#090e15] shadow-[0_0_12px_rgba(162,229,208,0.35)]"
                  : "text-[#9eb3be] hover:text-white hover:bg-white/5"
              }`}
            >
              <Maximize2 size={13} aria-hidden="true" />
              <span>Exploded 3D</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("isometric")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-medium transition-all ${
                viewMode === "isometric"
                  ? "bg-[#a2e5d0] text-[#090e15] shadow-[0_0_12px_rgba(162,229,208,0.35)]"
                  : "text-[#9eb3be] hover:text-white hover:bg-white/5"
              }`}
            >
              <Sliders size={13} aria-hidden="true" />
              <span>Isometric</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("compact")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-medium transition-all ${
                viewMode === "compact"
                  ? "bg-[#a2e5d0] text-[#090e15] shadow-[0_0_12px_rgba(162,229,208,0.35)]"
                  : "text-[#9eb3be] hover:text-white hover:bg-white/5"
              }`}
            >
              <Layers size={13} aria-hidden="true" />
              <span>Stack</span>
            </button>
          </div>
        </div>

        {/* 3D Spatial Interactive Stage */}
        <div className="grid lg:grid-cols-[1.2fr_.8fr] gap-10 lg:gap-14 items-center">
          <div
            ref={stageRef}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            className="relative min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] w-full flex items-center justify-center p-4 rounded-2xl border border-white/10 bg-[#080d14]/70 backdrop-blur-sm select-none"
            style={{
              perspective: "1200px",
              perspectiveOrigin: "50% 50%",
            }}
          >
            {/* Stage rotation container with hardware acceleration */}
            <div
              className="relative w-full max-w-[500px] h-[340px] sm:h-[380px] transition-transform duration-100 ease-out"
              style={{
                transformStyle: "preserve-3d",
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              }}
            >
              {SPATIAL_PLANES.map((plane, idx) => {
                const isHovered = activePlaneId === plane.id;
                const isAnyHovered = activePlaneId !== null;

                // Calculate Z-translation based on mode
                let zPos = 0;
                let yOffset = 0;
                let scaleVal = 1;

                if (viewMode === "exploded") {
                  zPos = plane.zBase * 1.35;
                  yOffset = (idx - 1.5) * 26;
                } else if (viewMode === "isometric") {
                  zPos = plane.zBase * 0.9;
                  yOffset = (idx - 1.5) * 44;
                  scaleVal = 0.96;
                } else {
                  // Compact stack
                  zPos = idx * 16;
                  yOffset = (idx - 1.5) * 14;
                  scaleVal = 1 - (3 - idx) * 0.03;
                }

                if (isHovered) {
                  zPos += 45;
                }

                const opacity =
                  isAnyHovered && !isHovered ? 0.45 : isHovered ? 1 : 0.92;

                return (
                  <div
                    key={plane.id}
                    onMouseEnter={() => setActivePlaneId(plane.id)}
                    onClick={() => setActivePlaneId(plane.id)}
                    className="absolute inset-0 rounded-xl p-6 sm:p-7 flex flex-col justify-between cursor-pointer transition-all duration-300 ease-out border shadow-2xl"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: `translate3d(0, ${yOffset}px, ${zPos}px) scale(${scaleVal})`,
                      backgroundColor: isHovered
                        ? "#111a26"
                        : "rgba(13, 20, 30, 0.88)",
                      borderColor: isHovered ? plane.color : plane.borderColor,
                      boxShadow: isHovered
                        ? `0 20px 50px ${plane.glowColor}, inset 0 1px 0 rgba(255,255,255,0.18)`
                        : `0 10px 30px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)`,
                      opacity,
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    {/* Plane Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="h-9 w-9 rounded-lg flex items-center justify-center border transition-colors duration-200"
                          style={{
                            backgroundColor: `${plane.color}1a`,
                            borderColor: `${plane.color}55`,
                            color: plane.color,
                          }}
                        >
                          <plane.icon size={19} strokeWidth={1.8} />
                        </div>
                        <div>
                          <span className="mono text-[10px] font-bold tracking-widest uppercase block text-[#9eb3be]">
                            {plane.tag}
                          </span>
                          <h3 className="text-base sm:text-lg font-bold tracking-tight text-white">
                            {plane.name}
                          </h3>
                        </div>
                      </div>
                      <span
                        className="mono text-[9.5px] uppercase tracking-wider px-2 py-0.5 rounded border"
                        style={{
                          color: plane.color,
                          borderColor: `${plane.color}40`,
                          backgroundColor: `${plane.color}15`,
                        }}
                      >
                        {plane.badge}
                      </span>
                    </div>

                    {/* Plane Micro-Metrics Preview */}
                    <div className="mt-4 grid grid-cols-3 gap-2.5 pt-3 border-t border-white/10">
                      {plane.metrics.map((m) => (
                        <div key={m.label}>
                          <span className="text-[10px] text-[#768a98] mono block">
                            {m.label}
                          </span>
                          <span
                            className="text-xs sm:text-[13px] font-mono font-semibold block mt-0.5"
                            style={{ color: isHovered ? plane.color : "#ffffff" }}
                          >
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Plane Footer Tags */}
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {plane.tags.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] text-[#9eb3be] bg-white/5 border border-white/5 px-2 py-0.5 rounded-full mono"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <span
                        className="text-xs font-mono font-medium flex items-center gap-1 transition-transform"
                        style={{
                          color: plane.color,
                          transform: isHovered ? "translateX(3px)" : "none",
                        }}
                      >
                        Details <ChevronRight size={13} />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom 3D instruction pill */}
            <div className="pointer-events-none absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-[#768a98]">
              <span className="flex items-center gap-1.5">
                <Sparkles size={12} className="text-[#a2e5d0]" /> Move cursor to rotate 3D perspective
              </span>
              <span className="hidden sm:inline">CSS Perspective: 1200px</span>
            </div>
          </div>

          {/* Active Plane Inspection Card */}
          <div className="rounded-2xl p-7 sm:p-9 border border-[#1d2a3a] bg-[#0c1420]/90 backdrop-blur-md relative overflow-hidden shadow-2xl">
            <div
              className="absolute -right-16 -top-16 w-44 h-44 rounded-full blur-3xl pointer-events-none"
              style={{ backgroundColor: `${activePlane.color}22` }}
            />

            <div className="flex items-center gap-2 mb-4">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: activePlane.color }}
              />
              <span className="mono text-xs font-bold uppercase tracking-widest text-[#9eb3be]">
                ACTIVE TELEMETRY INSPECTION
              </span>
            </div>

            <h3 className="text-2xl font-bold tracking-tight text-white mb-2">
              {activePlane.name}
            </h3>

            <p className="text-[#c4d5dc] text-[15px] sm:text-[16px] leading-relaxed mb-6">
              {activePlane.summary}
            </p>

            <div className="space-y-3 pt-5 border-t border-white/10">
              <span className="mono text-[11px] font-bold text-[#768a98] uppercase tracking-wider block">
                Deterministic Specifications
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {activePlane.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="p-3 rounded-lg border border-white/10 bg-white/5"
                  >
                    <span className="text-[11px] text-[#9eb3be] mono block">
                      {m.label}
                    </span>
                    <span
                      className="text-base font-bold font-mono block mt-1"
                      style={{ color: activePlane.color }}
                    >
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#768a98] mono">Enclave Status:</span>
                <span className="text-xs mono font-bold text-[#a2e5d0] bg-[#a2e5d0]/10 border border-[#a2e5d0]/30 px-2 py-0.5 rounded">
                  VERIFIED ONLINE
                </span>
              </div>
              <span className="mono text-xs text-[#768a98]">
                Layer Z-Index: {activePlane.zBase}px
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

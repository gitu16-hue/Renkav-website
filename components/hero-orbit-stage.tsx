"use client";

import React, { useEffect, useRef, useState } from "react";
import { Cpu, Database, ShieldCheck, Mic, RefreshCw, Lock, Layers, Sparkles } from "lucide-react";

interface OrbitCardSpec {
  id: string;
  label: string;
  sublabel: string;
  baseAngle: number; // Radians around hero ellipse
  radiusX: number; // % of container half-width
  radiusY: number; // % of container half-height
  zDepth: number;
  width: number;
  height: number;
  accent: string;
  gradient: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  tiltDeg: number;
}

const ORBIT_CARDS: OrbitCardSpec[] = [
  {
    id: "orb-card-1",
    label: "MEMORY ENCLAVE",
    sublabel: "HNSW · Zero Leak",
    baseAngle: -2.45,
    radiusX: 43,
    radiusY: 40,
    zDepth: 40,
    width: 190,
    height: 124,
    accent: "#a2e5d0",
    gradient: "radial-gradient(circle at 80% 70%, rgba(162, 229, 208, 0.35), rgba(10, 16, 24, 0.95) 68%)",
    icon: Database,
    tiltDeg: -6,
  },
  {
    id: "orb-card-2",
    label: "16kHz VAD",
    sublabel: "14ms Barge-in",
    baseAngle: -1.85,
    radiusX: 30,
    radiusY: 45,
    zDepth: -40,
    width: 120,
    height: 150,
    accent: "#00d8ff",
    gradient: "radial-gradient(circle at 50% 25%, rgba(0, 216, 255, 0.32), rgba(10, 14, 22, 0.96) 72%)",
    icon: Mic,
    tiltDeg: 4,
  },
  {
    id: "orb-card-3",
    label: "ELEVEN CORE",
    sublabel: "Cognitive Layer",
    baseAngle: -1.1,
    radiusX: 25,
    radiusY: 44,
    zDepth: 65,
    width: 145,
    height: 170,
    accent: "#b8f36b",
    gradient: "linear-gradient(145deg, rgba(184, 243, 107, 0.25), rgba(8, 118, 108, 0.18) 55%, rgba(8, 12, 18, 0.96))",
    icon: Sparkles,
    tiltDeg: -3,
  },
  {
    id: "orb-card-4",
    label: "MODEL ARBITER",
    sublabel: "Claude · GPT · Gemini",
    baseAngle: -0.45,
    radiusX: 44,
    radiusY: 38,
    zDepth: 25,
    width: 210,
    height: 132,
    accent: "#38bdf8",
    gradient: "linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(56, 189, 248, 0.22) 45%, rgba(8, 12, 18, 0.96) 90%)",
    icon: Cpu,
    tiltDeg: 7,
  },
  {
    id: "orb-card-5",
    label: "RING-0 GATE",
    sublabel: "Pre-Dispatch Auth",
    baseAngle: 0.25,
    radiusX: 45,
    radiusY: 16,
    zDepth: 55,
    width: 185,
    height: 120,
    accent: "#a2e5d0",
    gradient: "radial-gradient(circle at 20% 50%, rgba(162, 229, 208, 0.28), rgba(9, 13, 19, 0.95) 70%)",
    icon: ShieldCheck,
    tiltDeg: -5,
  },
  {
    id: "orb-card-6",
    label: "ATOMIC DAG",
    sublabel: "42ms Rollback",
    baseAngle: 0.95,
    radiusX: 40,
    radiusY: 42,
    zDepth: -20,
    width: 205,
    height: 134,
    accent: "#a855f7",
    gradient: "radial-gradient(circle at 30% 30%, rgba(168, 85, 247, 0.32), rgba(10, 12, 20, 0.95) 70%)",
    icon: RefreshCw,
    tiltDeg: 5,
  },
  {
    id: "orb-card-7",
    label: "SIGNED NONCE",
    sublabel: "HMAC Provenance",
    baseAngle: 2.25,
    radiusX: 42,
    radiusY: 41,
    zDepth: 35,
    width: 195,
    height: 126,
    accent: "#e5c07b",
    gradient: "radial-gradient(circle at 75% 30%, rgba(229, 192, 123, 0.28), rgba(9, 13, 18, 0.96) 72%)",
    icon: Lock,
    tiltDeg: -7,
  },
  {
    id: "orb-card-8",
    label: "CONTEXT GRAPH",
    sublabel: "Spatial Enclave",
    baseAngle: 2.85,
    radiusX: 44,
    radiusY: 15,
    zDepth: -30,
    width: 145,
    height: 122,
    accent: "#00d8ff",
    gradient: "linear-gradient(125deg, rgba(0, 216, 255, 0.25), rgba(8, 12, 18, 0.95) 75%)",
    icon: Layers,
    tiltDeg: 8,
  },
];

interface OrbitParticle {
  angle: number;
  orbitRx: number;
  orbitRy: number;
  speed: number;
  size: number;
  alpha: number;
}

/**
 * Made to Disrupt-inspired Home Screen Rotating Orbit & Floating Card Stage
 * - Continuous elliptical orbital canvas animation (#pocOrbitCanvas)
 * - 8 radial 3D floating cards revolving subtly around the hero focal hub
 * - Smooth spring-lerped mouse 3D tilt parallax (perspective: 1000px)
 */
export function HeroOrbitStage({ children }: { children: React.ReactNode }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouseTargetRef = useRef({ x: 0, y: 0 });
  const mouseCurrentRef = useRef({ x: 0, y: 0 });
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const checkMotion = () => {
      const pref = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const attr = document.documentElement.getAttribute("data-reduce-motion") === "true";
      setReduceMotion(pref || attr);
    };
    checkMotion();
    const obs = new MutationObserver(checkMotion);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-reduce-motion"] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = stage.offsetWidth);
    let h = (canvas.height = stage.offsetHeight);

    const handleResize = () => {
      if (!canvas || !stage) return;
      w = canvas.width = stage.offsetWidth;
      h = canvas.height = stage.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Initialize elliptical orbital particles
    const particles: OrbitParticle[] = Array.from({ length: 85 }, () => {
      const band = 0.25 + Math.random() * 0.68;
      return {
        angle: Math.random() * Math.PI * 2,
        orbitRx: band * 0.46,
        orbitRy: band * 0.43,
        speed: (0.0012 + Math.random() * 0.0022) * (Math.random() > 0.2 ? 1 : -1),
        size: Math.random() * 1.6 + 0.6,
        alpha: Math.random() * 0.65 + 0.2,
      };
    });

    const startTime = performance.now();
    let isTabVisible = true;
    const onVis = () => {
      isTabVisible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVis);

    const tick = (now: number) => {
      if (!isTabVisible) {
        animId = requestAnimationFrame(tick);
        return;
      }

      const elapsedSec = (now - startTime) * 0.001;

      // Lerp mouse coordinates
      const mc = mouseCurrentRef.current;
      const mt = mouseTargetRef.current;
      mc.x += (mt.x - mc.x) * 0.06;
      mc.y += (mt.y - mc.y) * 0.06;

      // 1. Render Elliptical Orbit Canvas (#pocOrbitCanvas)
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;

      // Subtle concentric orbital guide rings
      for (let r = 1; r <= 3; r++) {
        ctx.beginPath();
        ctx.ellipse(
          cx + mc.x * 10,
          cy + mc.y * 10,
          w * (0.18 + r * 0.09),
          h * (0.16 + r * 0.09),
          elapsedSec * (r % 2 === 0 ? 0.04 : -0.03),
          0,
          Math.PI * 2
        );
        ctx.strokeStyle = `rgba(162, 229, 208, ${0.07 - r * 0.015})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw revolving orbital particle nodes
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!reduceMotion) {
          p.angle += p.speed;
        }
        const px = cx + Math.cos(p.angle) * (w * p.orbitRx) + mc.x * 18;
        const py = cy + Math.sin(p.angle) * (h * p.orbitRy) + mc.y * 18;

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fill();
      }

      // 2. Animate Radial Orbiting 3D Cards (.poc-edge-img)
      if (!reduceMotion) {
        ORBIT_CARDS.forEach((card, idx) => {
          const el = cardRefs.current[idx];
          if (!el) return;

          // Continuous slow orbital angular progression + gentle sinusoidal float
          const orbitSpeed = 0.065; // radians per second
          const theta = card.baseAngle + elapsedSec * orbitSpeed;
          const xPct = Math.cos(theta) * card.radiusX;
          const yPct = Math.sin(theta) * card.radiusY;

          // Parallax depth coefficient
          const depthFactor = 1 + card.zDepth / 180;
          const parallaxX = mc.x * 26 * depthFactor;
          const parallaxY = mc.y * 22 * depthFactor;

          // Dynamic 3D rotation
          const rotY = mc.x * 12 + Math.cos(elapsedSec * 0.8 + idx) * 6;
          const rotX = -mc.y * 10 + Math.sin(elapsedSec * 0.7 + idx) * 5;
          const rotZ = card.tiltDeg + Math.sin(elapsedSec * 0.4 + idx) * 2.5;
          const zFloat = card.zDepth + Math.sin(elapsedSec * 0.9 + idx) * 18;

          el.style.transform = `translate3d(calc(-50% + ${xPct}vw + ${parallaxX}px), calc(-50% + ${yPct}vh + ${parallaxY}px), ${zFloat}px) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg)`;
        });
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reduceMotion]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseTargetRef.current = {
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2, // -1 to 1
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    };
  };

  const handlePointerLeave = () => {
    mouseTargetRef.current = { x: 0, y: 0 };
  };

  return (
    <section
      ref={stageRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="hero poc-tilt-section relative min-h-[88vh] sm:min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#050505] text-white"
      style={{ perspective: "1000px" }}
    >
      {/* Subtle architectural dark grid + canvas orbit field */}
      <div className="absolute inset-0 grid-pattern opacity-25 pointer-events-none" />
      <canvas
        ref={canvasRef}
        id="pocOrbitCanvas"
        className="poc-orbit-canvas pointer-events-none absolute inset-0 h-full w-full z-0"
        aria-hidden="true"
      />

      {/* Radial 3D Orbiting Cards Stage (.poc-tilt-stage) */}
      <div
        className="poc-tilt-stage pointer-events-none absolute inset-0 hidden md:block z-10"
        style={{ transformStyle: "preserve-3d" }}
        aria-hidden="true"
      >
        {ORBIT_CARDS.map((card, idx) => (
          <div
            key={card.id}
            ref={(el) => {
              cardRefs.current[idx] = el;
            }}
            className="poc-edge-img pointer-events-auto absolute top-1/2 left-1/2 rounded-[20px] border border-white/12 shadow-[0_24px_60px_rgba(0,0,0,0.85)] backdrop-blur-md p-4 flex flex-col justify-between transition-shadow duration-300 hover:border-white/35 overflow-hidden select-none"
            style={{
              width: `${card.width}px`,
              height: `${card.height}px`,
              background: card.gradient,
              transform: `translate3d(calc(-50% + ${(Math.cos(card.baseAngle) * card.radiusX).toFixed(2)}vw), calc(-50% + ${(Math.sin(card.baseAngle) * card.radiusY).toFixed(2)}vh), ${card.zDepth}px) rotateZ(${card.tiltDeg}deg)`,
            }}
          >
            {/* Specular inner highlight line */}
            <div className="flex items-center justify-between">
              <div
                className="h-7 w-7 rounded-lg flex items-center justify-center border border-white/15 bg-black/40"
                style={{ color: card.accent }}
              >
                <card.icon size={15} strokeWidth={1.8} />
              </div>
              <span
                className="h-1.5 w-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: card.accent }}
              />
            </div>

            <div>
              <span className="mono text-[9.5px] font-bold tracking-[0.14em] text-white/90 block uppercase">
                {card.label}
              </span>
              <span className="mono text-[9px] text-white/55 block mt-0.5">
                {card.sublabel}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Central Interactive Content Wrapper */}
      <div className="container-main relative z-20 py-24 sm:py-28">
        {children}
      </div>
    </section>
  );
}

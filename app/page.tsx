import {
  ArrowUpRight,
  ArrowRight,
  History,
  Layers3,
  ShieldCheck,
  Users,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { NetworkArt } from "@/components/network-art";
import { CtaBanner } from "@/components/cta-banner";
import { InteractiveHeroTitle } from "@/components/interactive-hero-title";
import { InfiniteCapabilitiesReel } from "@/components/infinite-reel";
import { ScrollManifesto } from "@/components/scroll-manifesto";
import { Card3DTilt } from "@/components/card-3d-tilt";
import { LabsSpatialLens } from "@/components/labs-spatial-lens";
import { HeroOrbitStage } from "@/components/hero-orbit-stage";
import { ScrollSpiral3D } from "@/components/scroll-spiral-3d";
import { RollButton } from "@/components/roll-button";
import { StickyFeatureStack } from "@/components/sticky-feature-stack";
import { CanvasParticleField } from "@/components/canvas-particle-field";
import { showHolographicOrb } from "@/flags";

const principles = [
  {
    num: "01",
    icon: History,
    title: "Pick up where you left off.",
    description:
      "Use context you choose to keep so you don’t have to explain the whole project again.",
    tag: "CONTEXT THAT CONTINUES",
    accent: "#a2e5d0",
  },
  {
    num: "02",
    icon: Layers3,
    title: "Use the right model for the job.",
    description:
      "The goal is one assistant experience that can work with different AI models.",
    tag: "INTELLIGENCE THAT ADAPTS",
    accent: "#00d8ff",
  },
  {
    num: "03",
    icon: ShieldCheck,
    title: "Keep important decisions yours.",
    description:
      "Review sensitive actions before they happen and see what happened afterward.",
    tag: "CONTROL THAT’S VISIBLE",
    accent: "#b8f36b",
  },
];

export default async function Home() {
  const orbEnabled = await showHolographicOrb();
  return (
    <>
      <HeroOrbitStage>
        <div className="relative flex flex-col items-center text-center max-w-[820px] mx-auto">
          {/* Authoritative 3D WebGL Holographic Orb layered smoothly behind/inside central orbital hub */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-55 -z-10">
            <NetworkArt enabled={orbEnabled} />
          </div>

          <div className="entry-1">
            <p className="eyebrow text-[#a2e5d0] mb-5 sm:mb-6 flex items-center justify-center gap-2.5 bg-black/40 border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">
              <span className="status-dot" aria-hidden="true" />
              <span>RENKAV TECHNOLOGIES</span>
            </p>
          </div>

          <InteractiveHeroTitle className="text-center" />

          <p className="entry-3 mt-6 sm:mt-7 max-w-[58ch] text-[#c4d5dc] text-[16px] md:text-[18px] leading-[1.7] text-pretty mx-auto">
            We’re building software that helps people pick up where they left
            off, plan their next steps, and stay in control of what AI does on
            their behalf.
          </p>

          <div className="entry-4 mt-8 sm:mt-9 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4">
            <RollButton
              href="/ventures"
              variant="light"
              icon={<ArrowUpRight size={17} aria-hidden="true" />}
            >
              Explore ELEVEN
            </RollButton>
            <RollButton
              href="/contact"
              variant="glass"
              icon={<ArrowRight size={17} aria-hidden="true" />}
            >
              Get in touch
            </RollButton>
          </div>

          <p className="entry-4 mt-10 sm:mt-12 pt-5 border-t border-white/10 text-[#a2e5d0] uppercase tracking-[.22em] text-[11px] font-bold mono flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a2e5d0]/60" />
            <span>Make the Next Matter.</span>
          </p>
        </div>
      </HeroOrbitStage>

      {/* Scroll-Driven & Continuous-Motion 3D Spiral Helix Carousel (#ss3d) */}
      <ScrollSpiral3D />

      {/* Scroll-Filled Manifesto */}
      <ScrollManifesto />

      {/* Sticky Stacking Feature Pillar Cards with Continuous Orbital Rings */}
      <StickyFeatureStack />

      {/* Infinite Momentum Capabilities Reel */}
      <InfiniteCapabilitiesReel />

      {/* Meet ELEVEN — Dynamic Obsidian Showcase with Continuous Spinning Orbital Rings */}
      <section className="section-pad relative overflow-hidden bg-[#050505] text-white border-t border-white/10">
        <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
        <CanvasParticleField />
        <div className="container-main relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-1 lg:order-2 scroll-reveal">
            <div className="tag mb-5 sm:mb-6 border-[#a2e5d0]/40 text-[#a2e5d0] bg-[#a2e5d0]/10">
              <span className="status-dot-lime mr-1" aria-hidden="true" />
              <span>OUR FIRST PROJECT · IN DEVELOPMENT</span>
            </div>
            <h2 className="heading text-white text-balance">
              Meet <span className="text-[#a2e5d0]">ELEVEN.</span>
            </h2>
            <p className="mt-5 sm:mt-6 text-[#c4d5dc] text-[16px] md:text-[17px] leading-[1.7] max-w-[62ch] text-pretty">
              ELEVEN is an AI assistant in development. We’re designing it to
              pick up ongoing work using context you’ve approved, work with
              different AI models, and ask before taking actions that need your
              permission.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <RollButton
                href="/ventures"
                variant="light"
                icon={<ArrowUpRight size={17} aria-hidden="true" />}
              >
                See what we’re building
              </RollButton>
              <span className="text-xs text-[#9eb3be] mono">
                Subsidiary Cognitive Runtime
              </span>
            </div>
          </div>

          <div className="relative order-2 lg:order-1 scroll-reveal" data-delay="1">
            <Card3DTilt maxTilt={7}>
              <div
                className="bg-[#090d14] rounded-3xl p-8 md:p-12 min-h-[380px] md:min-h-[440px] overflow-hidden relative border border-white/15 shadow-2xl"
                aria-hidden="true"
              >
                <div className="absolute inset-0 grid-pattern opacity-20" />
                {/* Continuous Rotating Concentric Orbital Rings */}
                <div className="absolute -right-24 -bottom-24 w-[440px] h-[440px] rounded-full border border-dashed border-[#a2e5d0]/30 animate-[spin_28s_linear_infinite]" />
                <div className="absolute -right-4 -bottom-4 w-[320px] h-[320px] rounded-full border border-[#b8f36b]/25 animate-[spin_20s_linear_infinite_reverse]" />
                <div className="absolute right-[44px] bottom-[44px] w-[200px] h-[200px] rounded-full border-2 border-dotted border-[#00d8ff]/40 animate-[spin_14s_linear_infinite]" />
                <div className="absolute right-[100px] bottom-[100px] w-[88px] h-[88px] rounded-full bg-[#a2e5d0]/15 blur-xl animate-pulse" />

                <div className="relative z-10 flex items-center justify-between">
                  <span className="eyebrow text-[#a2e5d0] flex items-center gap-2">
                    <span className="status-dot" /> RENKAV / VENTURE 01
                  </span>
                  <span className="mono text-[10px] text-[#b8f36b] uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#b8f36b]/30 bg-[#b8f36b]/10">
                    Prototype
                  </span>
                </div>

                <div className="absolute bottom-10 left-8 md:left-12 z-10">
                  <span className="block text-white text-[clamp(3.8rem,7vw,6.4rem)] font-bold tracking-[-.06em] leading-none">
                    ELEVEN<span className="text-[#b8f36b]">.</span>
                  </span>
                  <p className="mt-3 text-[#9eb3be] uppercase tracking-[.22em] text-[10px] font-bold mono">
                    Intelligence Operating System Prototype
                  </p>
                </div>
              </div>
            </Card3DTilt>
          </div>
        </div>
      </section>

      {/* Product Principles — 3D Tilt Interactive Obsidian Cards */}
      <section className="section-pad relative overflow-hidden bg-[#070a0f] text-white border-y border-white/10">
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[720px] h-[300px] rounded-full bg-[#00d8ff]/8 blur-[120px]"
          aria-hidden="true"
        />
        <div className="container-main relative z-10">
          <SectionHeading
            light
            kicker="PRODUCT PRINCIPLES"
            title="What we’re designing for"
          />
          <div className="mt-12 grid lg:grid-cols-3 gap-6 lg:gap-8">
            {principles.map((p, idx) => (
              <div
                key={p.num}
                className="scroll-reveal h-full"
                data-delay={String(idx + 1)}
              >
                <Card3DTilt maxTilt={6}>
                  <div className="group rounded-3xl p-7 sm:p-8 lg:p-9 border border-white/12 bg-[#0c1118]/90 hover:border-white/30 flex flex-col justify-between h-full shadow-2xl transition-colors duration-300">
                    <div>
                      <div className="flex items-center justify-between mb-8">
                        <span className="mono tabular-nums text-[12px] font-bold tracking-widest text-[#768a98]">
                          {p.num} / 03
                        </span>
                        <div
                          className="h-11 w-11 rounded-xl flex items-center justify-center border border-white/10 bg-white/5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                          style={{ color: p.accent }}
                        >
                          <p.icon size={22} strokeWidth={1.7} aria-hidden="true" />
                        </div>
                      </div>
                      <h3 className="text-[20px] sm:text-[22px] font-bold tracking-tight text-white mb-3 text-balance">
                        {p.title}
                      </h3>
                      <p className="text-[15px] sm:text-[16px] text-[#9eb3be] leading-relaxed text-pretty">
                        {p.description}
                      </p>
                    </div>
                    <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                      <span
                        className="mono text-[10px] font-bold tracking-widest uppercase"
                        style={{ color: p.accent }}
                      >
                        {p.tag}
                      </span>
                      <span
                        className="h-1.5 w-1.5 rounded-full animate-pulse"
                        style={{ backgroundColor: p.accent }}
                      />
                    </div>
                  </div>
                </Card3DTilt>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Labs Spatial Lens Interactive Research Showcase */}
      <LabsSpatialLens />

      {/* Founding Team — Dynamic Obsidian Interactive Panel */}
      <section className="section-pad relative overflow-hidden bg-[#050505] text-white border-t border-white/10">
        <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
        <CanvasParticleField />
        <div className="container-main relative z-10 grid md:grid-cols-[1.15fr_.85fr] gap-10 items-center">
          <div className="scroll-reveal">
            <p className="eyebrow text-[#a2e5d0] mb-4 sm:mb-5 flex items-center gap-2">
              <span className="status-dot" aria-hidden="true" />
              <span>FOUNDING TEAM</span>
            </p>
            <h2 className="heading text-white text-balance">
              Meet the people building RENKAV.
            </h2>
            <p className="mt-4 sm:mt-5 text-[#c4d5dc] text-[16px] md:text-[17px] leading-[1.7] max-w-[62ch] text-pretty">
              Gitanshu Damade and Yashika Pawar are the founders behind RENKAV
              and its first project, ELEVEN.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row md:items-end lg:items-center md:justify-end gap-5 scroll-reveal" data-delay="1">
            <div className="flex items-center -space-x-3">
              <div className="h-12 w-12 rounded-full border-2 border-[#050505] bg-[#132422] flex items-center justify-center mono text-sm font-bold text-[#a2e5d0] shadow-lg animate-pulse">
                GD
              </div>
              <div className="h-12 w-12 rounded-full border-2 border-[#050505] bg-[#12202d] flex items-center justify-center mono text-sm font-bold text-[#00d8ff] shadow-lg">
                YP
              </div>
            </div>
            <RollButton
              href="/leadership"
              variant="outline"
              icon={<Users size={16} aria-hidden="true" />}
            >
              Meet the founders
            </RollButton>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}

import type { Metadata } from "next";
import { Eye, Target, Workflow, ShieldCheck, FileSearch, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { CtaBanner } from "@/components/cta-banner";
import { Card3DTilt } from "@/components/card-3d-tilt";
import { CanvasParticleField } from "@/components/canvas-particle-field";
import { PagePillNav } from "@/components/page-pill-nav";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn why RENKAV started and how we approach building AI software that keeps people in control.",
};

const principles = [
  {
    icon: Workflow,
    title: "Start with the work.",
    description:
      "Choose a real workflow and test whether the assistant makes it easier.",
  },
  {
    icon: ShieldCheck,
    title: "Make control visible.",
    description:
      "People should be able to tell what the assistant is proposing and what requires their approval.",
  },
  {
    icon: FileSearch,
    title: "Show the evidence.",
    description:
      "Describe what works, what is experimental, and what is still planned.",
  },
];

export default function About() {
  return (
    <>
      <PagePillNav />

      <section className="masthead relative overflow-hidden bg-[#050505] text-white">
        <div className="absolute inset-0 grid-pattern opacity-25 pointer-events-none" />
        <CanvasParticleField />
        <div className="container-main relative z-10">
          <div className="entry-1">
            <p className="eyebrow text-[#a2e5d0] mb-5 sm:mb-6 flex items-center gap-2">
              <span className="status-dot" aria-hidden="true" />
              <span>ABOUT RENKAV</span>
            </p>
          </div>
          <h1 className="display entry-2 max-w-[850px] text-balance text-white">
            <span className="font-reveal-line">
              <span className="font-reveal-inner">Why we started RENKAV.</span>
            </span>
          </h1>
          <p className="entry-3 mt-6 sm:mt-7 text-[#c4d5dc] max-w-[62ch] text-[16px] md:text-[18px] leading-[1.7] text-pretty">
            We want working with AI to feel less like starting over every time.
          </p>
        </div>
      </section>

      {/* Made to Disrupt-inspired Bordered 2-Column Obsidian Feature Box */}
      <section className="section-pad bg-[#050505] text-white border-t border-white/10">
        <div className="container-main">
          <div className="rounded-3xl border border-white/12 bg-[#090d14]/90 p-8 sm:p-12 md:p-14 shadow-2xl grid lg:grid-cols-[1.05fr_.95fr] gap-10 lg:gap-16 items-start">
            <div className="scroll-reveal split">
              <div className="tag mb-5 border-[#a2e5d0]/40 text-[#a2e5d0] bg-[#a2e5d0]/10">
                <span className="status-dot" aria-hidden="true" />
                <span>FOUNDING STORY</span>
              </div>
              <h2 className="heading split-title text-white text-balance">
                <span className="line">
                  <span className="line-inner">Why RENKAV exists.</span>
                </span>
              </h2>
              <p className="mt-6 text-[#c4d5dc] text-[16px] md:text-[18px] leading-[1.75] text-pretty split-text">
                <span className="line">
                  <span className="line-inner">
                    Switching between AI tools can mean rebuilding context every time.
                    You explain the project again, bring the right notes over, and
                    decide what to do with the answer. We started RENKAV to explore a
                    simpler way to work with AI. ELEVEN is where we’re starting.
                  </span>
                </span>
              </p>
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-3 text-xs mono text-[#a2e5d0]">
                <Sparkles size={14} />
                <span>SOVEREIGN CONTEXT ARCHITECTURE</span>
              </div>
            </div>

            <div className="space-y-6">
              {principles.map((p, idx) => (
                <div
                  key={p.title}
                  className="scroll-reveal flex items-start gap-4 p-5 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-[#a2e5d0]/40 transition-all duration-300"
                  data-delay={String(idx + 1)}
                >
                  <div className="h-11 w-11 rounded-xl border border-[#a2e5d0]/30 bg-[#a2e5d0]/10 flex items-center justify-center text-[#a2e5d0] shrink-0">
                    <p.icon size={21} strokeWidth={1.7} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-white">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 text-sm sm:text-[15px] text-[#9eb3be] leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#050505] text-white">
        <div className="container-main grid md:grid-cols-2 gap-6 lg:gap-8">
          <div className="scroll-reveal">
            <Card3DTilt maxTilt={5}>
              <div className="bg-[#0b1017] text-white rounded-3xl p-8 sm:p-10 md:p-12 border border-white/12 shadow-2xl flex flex-col justify-between h-full">
                <div>
                  <Target
                    size={30}
                    color="#a2e5d0"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                  <p className="eyebrow text-[#a2e5d0] mt-7 mb-4">Our mission</p>
                  <h2 className="subheading text-white text-balance">
                    Build AI software that helps people move from an idea to a next
                    step they can review and act on.
                  </h2>
                </div>
              </div>
            </Card3DTilt>
          </div>

          <div className="scroll-reveal" data-delay="1">
            <Card3DTilt maxTilt={5}>
              <div className="bg-[#0e1621] text-white rounded-3xl p-8 sm:p-10 md:p-12 border border-[#a2e5d0]/25 shadow-2xl flex flex-col justify-between h-full">
                <div>
                  <Eye
                    size={30}
                    color="#00d8ff"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                  <p className="eyebrow text-[#00d8ff] mt-7 mb-4">Our vision</p>
                  <h2 className="subheading text-white text-balance">
                    An assistant that keeps the thread of your work across
                    conversations, models and approved tools, while you decide what it
                    remembers and what it can do.
                  </h2>
                </div>
              </div>
            </Card3DTilt>
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#070b11] text-white border-t border-white/10">
        <div className="container-main">
          <SectionHeading
            light
            kicker="WORKING PRINCIPLES"
            title="How we approach the work."
          />
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 mt-12">
            {principles.map((p, idx) => (
              <div key={p.title} className="scroll-reveal h-full" data-delay={String(idx + 1)}>
                <Card3DTilt maxTilt={5}>
                  <div className="rounded-3xl p-7 sm:p-8 lg:p-9 border border-white/10 bg-[#0c121b] h-full flex flex-col justify-between">
                    <div>
                      <p.icon
                        color="#a2e5d0"
                        size={28}
                        strokeWidth={1.6}
                        aria-hidden="true"
                      />
                      <h3 className="mt-7 text-[20px] sm:text-[21px] font-bold tracking-tight text-white text-balance">
                        {p.title}
                      </h3>
                      <p className="mt-3 text-[15px] sm:text-[16px] text-[#9eb3be] leading-relaxed text-pretty">
                        {p.description}
                      </p>
                    </div>
                  </div>
                </Card3DTilt>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        eyebrow="FIRST PROJECT"
        title="See where we’re starting."
        description="ELEVEN is our first project and the place where we’re testing these ideas."
        actionLabel="Explore ELEVEN"
        actionHref="/ventures"
      />
    </>
  );
}

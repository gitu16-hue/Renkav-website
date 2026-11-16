import type { Metadata } from "next";
import {
  ArrowUpRight,
  Mic,
  History,
  Layers3,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { NetworkArt } from "@/components/network-art";
import { SectionHeading } from "@/components/section-heading";
import { CtaBanner } from "@/components/cta-banner";
import { Card3DTilt } from "@/components/card-3d-tilt";
import { DepthSpatialStage } from "@/components/depth-spatial-stage";
import { CanvasParticleField } from "@/components/canvas-particle-field";
import { PagePillNav } from "@/components/page-pill-nav";
import { RollButton } from "@/components/roll-button";
import { showHolographicOrb } from "@/flags";

export const metadata: Metadata = {
  title: "ELEVEN",
  description:
    "Explore ELEVEN, RENKAV’s AI assistant prototype, and the workflows we’re designing it to support.",
};

const workflowSteps = [
  {
    step: "01",
    title: "Resume context",
    detail:
      "Pick up ongoing work from the notes and project context you have approved.",
  },
  {
    step: "02",
    title: "Prepare a draft",
    detail:
      "Flag anything that cannot be verified and assemble a clear follow-up draft.",
  },
  {
    step: "03",
    title: "Review before sending",
    detail:
      "Keep consequential actions gated behind your explicit review and approval.",
  },
];

const priorities = [
  {
    icon: Mic,
    title: "Voice and text.",
    description: "Speak naturally or type when convenient.",
  },
  {
    icon: History,
    title: "Project continuity.",
    description:
      "Resume a plan using approved context and track decisions and open tasks.",
  },
  {
    icon: Layers3,
    title: "Model choice.",
    description:
      "Use suitable AI models without restarting the project. Some tasks may eventually run locally where supported.",
  },
  {
    icon: ShieldCheck,
    title: "Approved actions.",
    description:
      "Plan, draft and eventually use supported tools within the permissions you set.",
  },
  {
    icon: Sparkles,
    title: "Specialist assistance.",
    description:
      "Explore limited AI specialists that return findings for review.",
  },
];

const faqs = [
  {
    question: "Can I use ELEVEN today?",
    answer:
      "ELEVEN is in development. We’re not announcing a public download, pricing or a launch date on this site.",
  },
  {
    question: "Will it act without asking?",
    answer:
      "The design requires appropriate approval for consequential actions.",
  },
  {
    question: "Can I use it offline?",
    answer:
      "We’re exploring local operation for supported tasks. Full offline operation is not a current promise.",
  },
  {
    question: "Can I discuss a pilot?",
    answer:
      "Tell us what you’d like ELEVEN to help with. An inquiry does not register you for a pilot or guarantee access.",
  },
];

const elevenWebsiteUrl = process.env.NEXT_PUBLIC_ELEVEN_URL;

export default async function Ventures() {
  const orbEnabled = await showHolographicOrb();
  return (
    <>
      <PagePillNav />

      <section className="masthead relative overflow-hidden bg-[#050505] text-white">
        <div className="absolute inset-0 grid-pattern opacity-25 pointer-events-none" />
        <CanvasParticleField />
        <div className="container-main relative z-10 grid lg:grid-cols-[1.12fr_.88fr] gap-12 lg:gap-16 items-center">
          <div>
            <div className="entry-1">
              <p className="eyebrow text-[#a2e5d0] mb-5 sm:mb-6 flex items-center gap-2">
                <span className="status-dot-lime" aria-hidden="true" />
                <span>OUR FIRST PROJECT · PROTOTYPE IN DEVELOPMENT</span>
              </p>
            </div>
            <h1 className="display entry-2 max-w-[840px] text-balance text-white">
              <span className="font-reveal-line">
                <span className="font-reveal-inner">ELEVEN.</span>
              </span>{" "}
              <span className="font-reveal-line">
                <span
                  className="font-reveal-inner text-[#a2e5d0]"
                  style={{ animationDelay: "0.18s" }}
                >
                  One assistant for work that continues.
                </span>
              </span>
            </h1>
            <p className="entry-3 mt-6 sm:mt-7 text-[#c4d5dc] max-w-[64ch] text-[16px] md:text-[18px] leading-[1.7] text-pretty">
              ELEVEN by RENKAV is a prototype for what we call an Intelligence
              Operating System. It’s an AI layer designed to connect
              conversations, project context and approved tools. It is not a
              replacement for Windows or your existing operating system.
            </p>
            <div className="entry-4 mt-8 sm:mt-9 flex flex-col sm:flex-row flex-wrap gap-4">
              <RollButton
                href="/contact"
                variant="light"
                icon={<ArrowUpRight size={17} aria-hidden="true" />}
              >
                Discuss a use case
              </RollButton>
              {elevenWebsiteUrl && (
                <a
                  href={elevenWebsiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 px-6 py-3.5 text-sm font-semibold text-white transition-all"
                >
                  Visit the ELEVEN website{" "}
                  <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
          <NetworkArt compact enabled={orbEnabled} />
        </div>
      </section>

      <section className="section-pad bg-[#050505] text-white border-t border-white/10">
        <div className="container-main">
          <SectionHeading
            light
            kicker="WORKED EXAMPLE"
            title="A realistic workflow"
          />
          <div className="mt-10 scroll-reveal">
            <Card3DTilt maxTilt={4} glare={false}>
              <div className="bg-[#090d14] border border-white/12 rounded-3xl p-7 sm:p-10 md:p-12 shadow-2xl">
                <blockquote className="text-[20px] md:text-[25px] font-semibold text-white leading-[1.4] tracking-tight border-l-4 border-[#a2e5d0] pl-5 text-pretty">
                  “Pick up yesterday’s partnership proposal. Check my approved
                  notes, tell me what’s missing, and draft a follow-up.”
                </blockquote>
                <p className="mt-5 sm:mt-6 max-w-[64ch] text-[16px] md:text-[17px] text-[#c4d5dc] leading-[1.7] text-pretty">
                  ELEVEN would use the notes you allow, flag anything it can’t
                  verify, and prepare a draft for review. It would not send the
                  email without the required approval.
                </p>
                <ol className="mt-8 grid md:grid-cols-3 gap-5 list-none p-0">
                  {workflowSteps.map((item, idx) => (
                    <li
                      key={item.step}
                      className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 sm:p-7 flex flex-col justify-between scroll-reveal hover:border-[#a2e5d0]/40 transition-colors"
                      data-delay={String(idx + 1)}
                    >
                      <div>
                        <span className="mono tabular-nums text-xs font-bold uppercase tracking-widest text-[#a2e5d0]">
                          Step {item.step}
                        </span>
                        <h3 className="mt-2.5 text-lg font-bold text-white tracking-tight text-balance">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm text-[#9eb3be] leading-relaxed text-pretty">
                          {item.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
                <p className="mt-6 pt-5 border-t border-white/10 text-xs font-semibold text-[#768a98] mono">
                  Illustrative workflow. The full experience is not being announced
                  as available today.
                </p>
              </div>
            </Card3DTilt>
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#070b11] text-white border-y border-white/10">
        <div className="container-main">
          <SectionHeading
            light
            kicker="WHAT WE ARE BUILDING"
            title="Development priorities"
          />
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {priorities.map((item, idx) => (
              <div
                key={item.title}
                className="scroll-reveal h-full"
                data-delay={String((idx % 3) + 1)}
              >
                <Card3DTilt maxTilt={5}>
                  <div className="rounded-3xl p-7 sm:p-8 lg:p-9 border border-white/10 bg-[#0b1017] h-full flex flex-col justify-between">
                    <div>
                      <item.icon
                        color="#a2e5d0"
                        size={26}
                        strokeWidth={1.6}
                        aria-hidden="true"
                      />
                      <h3 className="mt-6 mb-2 text-[20px] font-bold text-white tracking-tight text-balance">
                        {item.title}
                      </h3>
                      <p className="text-[15px] sm:text-[16px] text-[#9eb3be] leading-relaxed text-pretty">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Card3DTilt>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Microdose & Made to Disrupt 3D Depth Spatial Architecture Stage */}
      <DepthSpatialStage />

      <section className="section-pad bg-[#050505] text-white">
        <div className="container-main">
          <SectionHeading
            light
            kicker="QUESTIONS & ANSWERS"
            title="Frequently asked questions"
          />
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {faqs.map((faq, idx) => (
              <div
                key={faq.question}
                className="rounded-2xl p-7 sm:p-8 border border-white/10 bg-[#0a0f16] scroll-reveal hover:border-[#a2e5d0]/40 transition-colors"
                data-delay={String((idx % 2) + 1)}
              >
                <h3 className="text-[19px] sm:text-[20px] font-bold text-white tracking-tight text-balance">
                  {faq.question}
                </h3>
                <p className="mt-3 text-[15px] sm:text-[16px] text-[#9eb3be] leading-relaxed text-pretty">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        eyebrow="SHARE A WORKFLOW"
        title="Have a real workflow in mind for ELEVEN?"
        description="Tell us what you’re trying to accomplish, how you handle it today, and where an assistant could help."
        actionLabel="Discuss a use case"
        actionHref="/contact"
      />
    </>
  );
}

import type { Metadata } from "next";
import { Eye, Target, Workflow, ShieldCheck, FileSearch } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { CtaBanner } from "@/components/cta-banner";

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
      <section className="masthead">
        <div className="container-main relative z-10">
          <div className="entry-1">
            <p className="eyebrow text-[#a2e5d0] mb-5 sm:mb-6 flex items-center gap-2">
              <span className="status-dot" aria-hidden="true" />
              <span>ABOUT RENKAV</span>
            </p>
          </div>
          <h1 className="display entry-2 max-w-[850px] text-balance">
            <span className="font-reveal-line">
              <span className="font-reveal-inner">Why we started RENKAV.</span>
            </span>
          </h1>
          <p className="entry-3 mt-6 sm:mt-7 text-[#c4d5dc] max-w-[62ch] text-[16px] md:text-[18px] leading-[1.7] text-pretty">
            We want working with AI to feel less like starting over every time.
          </p>
        </div>
      </section>

      <section className="section-pad bg-[#f8faf7]">
        <div className="container-main max-w-3xl! ml-0!">
          <SectionHeading kicker="FOUNDING STORY" title="Why RENKAV exists." />
          <div className="mt-6 sm:mt-7 space-y-5 bodycopy text-[16px] md:text-[17px] leading-[1.7] text-pretty max-w-[65ch]">
            <p>
              Switching between AI tools can mean rebuilding context every time.
              You explain the project again, bring the right notes over, and
              decide what to do with the answer. We started RENKAV to explore a
              simpler way to work with AI. ELEVEN is where we’re starting.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#eef4f0]">
        <div className="container-main grid md:grid-cols-2 gap-6 lg:gap-8">
          <div className="bg-[#0b1017] text-white rounded-xl p-8 sm:p-10 md:p-12 border border-[#1b2533] shadow-lg flex flex-col justify-between scroll-reveal">
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
          <div className="bg-white rounded-xl p-8 sm:p-10 md:p-12 border border-[#e2e8e3] shadow-sm flex flex-col justify-between scroll-reveal" data-delay="1">
            <div>
              <Eye
                size={30}
                color="#08766c"
                strokeWidth={1.6}
                aria-hidden="true"
              />
              <p className="eyebrow text-[#08766c] mt-7 mb-4">Our vision</p>
              <h2 className="subheading text-[#0d141e] text-balance">
                An assistant that keeps the thread of your work across
                conversations, models and approved tools, while you decide what it
                remembers and what it can do.
              </h2>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white border-y border-[#e2e8e3]">
        <div className="container-main">
          <SectionHeading
            kicker="WORKING PRINCIPLES"
            title="How we approach the work."
          />
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 mt-12">
            {principles.map((p, idx) => (
              <div
                className="soft-card p-7 sm:p-8 lg:p-9 scroll-reveal"
                data-delay={String(idx + 1)}
                key={p.title}
              >
                <p.icon
                  color="#08766c"
                  size={28}
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
                <h3 className="mt-7 text-[20px] sm:text-[21px] font-bold tracking-tight text-[#0d141e] text-balance">
                  {p.title}
                </h3>
                <p className="bodycopy mt-3 text-[15px] sm:text-[16px] text-pretty">
                  {p.description}
                </p>
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

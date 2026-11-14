import type { Metadata } from "next";
import Link from "next/link";
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
      <section className="masthead">
        <div className="container-main relative z-10 grid lg:grid-cols-[1.12fr_.88fr] gap-12 items-center">
          <div>
            <div className="entry-1">
              <p className="eyebrow text-[#a2e5d0] mb-6 flex items-center gap-2">
                <span className="status-dot-lime" aria-hidden="true" />
                <span>OUR FIRST PROJECT · PROTOTYPE IN DEVELOPMENT</span>
              </p>
            </div>
            <h1 className="display entry-2 max-w-[820px]">
              ELEVEN.{" "}
              <span className="text-[#a2e5d0]">
                One assistant for work that continues.
              </span>
            </h1>
            <p className="entry-3 mt-7 text-[#c4d5dc] max-w-2xl text-lg leading-8">
              ELEVEN by RENKAV is a prototype for what we call an Intelligence
              Operating System. It’s an AI layer designed to connect
              conversations, project context and approved tools. It is not a
              replacement for Windows or your existing operating system.
            </p>
            <div className="entry-4 mt-9 flex flex-col sm:flex-row flex-wrap gap-3.5">
              <Link
                href="/contact"
                className="btn btn-light w-full sm:w-auto"
              >
                Discuss a use case{" "}
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
              {elevenWebsiteUrl && (
                <a
                  href={elevenWebsiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn border border-white/20 text-white hover:bg-white/10 w-full sm:w-auto"
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

      <section className="section-pad bg-[#f8faf7]">
        <div className="container-main">
          <SectionHeading
            kicker="WORKED EXAMPLE"
            title="A realistic workflow"
          />
          <div className="mt-10 bg-white border border-[#e2e8e3] rounded-xl p-7 md:p-10 shadow-sm">
            <blockquote className="text-[20px] md:text-[23px] font-semibold text-[#0d141e] leading-snug tracking-tight border-l-4 border-[#08766c] pl-5">
              “Pick up yesterday’s partnership proposal. Check my approved
              notes, tell me what’s missing, and draft a follow-up.”
            </blockquote>
            <p className="bodycopy mt-6 max-w-3xl text-[16px]">
              ELEVEN would use the notes you allow, flag anything it can’t
              verify, and prepare a draft for review. It would not send the
              email without the required approval.
            </p>
            <ol className="mt-8 grid md:grid-cols-3 gap-4 list-none p-0">
              {workflowSteps.map((item) => (
                <li
                  key={item.step}
                  className="bg-[#f8faf7] border border-[#e2e8e3] rounded-lg p-6 flex flex-col justify-between"
                >
                  <div>
                    <span className="mono text-xs font-bold uppercase tracking-widest text-[#08766c]">
                      Step {item.step}
                    </span>
                    <h3 className="mt-2 text-lg font-bold text-[#0d141e]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#566978] leading-6">
                      {item.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-6 pt-5 border-t border-[#e2e8e3] text-xs font-semibold text-[#566978] mono">
              Illustrative workflow. The full experience is not being announced
              as available today.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white border-y border-[#e2e8e3]">
        <div className="container-main">
          <SectionHeading
            kicker="WHAT WE ARE BUILDING"
            title="Development priorities"
          />
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {priorities.map((item) => (
              <div key={item.title} className="soft-card p-8">
                <item.icon
                  color="#08766c"
                  size={26}
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
                <h3 className="mt-7 mb-2 text-[20px] font-bold text-[#0d141e]">
                  {item.title}
                </h3>
                <p className="bodycopy text-[15px]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#f8faf7]">
        <div className="container-main">
          <SectionHeading
            kicker="QUESTIONS & ANSWERS"
            title="Frequently asked questions"
          />
          <div className="mt-10 grid md:grid-cols-2 gap-5">
            {faqs.map((faq) => (
              <div key={faq.question} className="soft-card p-7 md:p-8">
                <h3 className="text-[19px] font-bold text-[#0d141e]">
                  {faq.question}
                </h3>
                <p className="bodycopy mt-3 text-[15px]">{faq.answer}</p>
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

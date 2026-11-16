import type { Metadata } from "next";
import { Mail, ArrowUpRight, ShieldAlert } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { CanvasParticleField } from "@/components/canvas-particle-field";
import { PagePillNav } from "@/components/page-pill-nav";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact RENKAV Technologies about ELEVEN, partnerships, research or general business inquiries.",
};

const prompts = [
  {
    title: "Product inquiry.",
    detail:
      "Tell us what you’re trying to accomplish, how you do it today, and what gets in the way.",
  },
  {
    title: "Partnership or research.",
    detail:
      "Tell us who you are and what you’d like to explore together.",
  },
  {
    title: "Investor or incubator inquiry.",
    detail:
      "Share your organization and the kind of conversation you have in mind.",
  },
];

export default function Contact() {
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
              <span>CONTACT RENKAV</span>
            </p>
          </div>
          <h1 className="display entry-2 max-w-[820px] text-balance text-white">
            <span className="font-reveal-line">
              <span className="font-reveal-inner">Let’s talk.</span>
            </span>
          </h1>
          <p className="entry-3 mt-6 sm:mt-7 text-[#c4d5dc] max-w-[62ch] text-[16px] md:text-[18px] leading-[1.7] text-pretty">
            Get in touch about ELEVEN, a potential partnership, or a general
            business inquiry.
          </p>
        </div>
      </section>

      <section className="section-pad bg-[#050505] text-white border-t border-white/10">
        <div className="container-main grid lg:grid-cols-[.88fr_1.12fr] gap-12 lg:gap-16 items-start">
          <div className="scroll-reveal">
            <p className="eyebrow text-[#a2e5d0] mb-3 sm:mb-4">DIRECT CONTACT</p>
            <h2 className="subheading text-white text-balance">
              Reach us by email.
            </h2>
            <a
              href="mailto:gitanshu@renkav.online"
              className="mt-6 inline-flex items-center gap-3.5 p-4 rounded-2xl bg-[#090d14] border border-white/12 hover:border-[#a2e5d0] transition-colors group shadow-xl"
            >
              <span className="w-11 h-11 rounded-xl bg-[#a2e5d0]/15 border border-[#a2e5d0]/30 flex items-center justify-center text-[#a2e5d0] shrink-0">
                <Mail size={20} aria-hidden="true" />
              </span>
              <span className="text-sm md:text-base font-bold text-white group-hover:text-[#a2e5d0] break-all">
                Email Gitanshu · gitanshu@renkav.online{" "}
                <ArrowUpRight
                  size={15}
                  className="inline"
                  aria-hidden="true"
                />
              </span>
            </a>

            <div className="mt-10">
              <h3 className="text-lg font-bold text-white mb-4">
                What to include
              </h3>
              <div className="space-y-4">
                {prompts.map((item) => (
                  <div
                    key={item.title}
                    className="bg-[#090d14] border border-white/10 rounded-2xl p-5 shadow-lg hover:border-[#a2e5d0]/40 transition-colors"
                  >
                    <p className="text-sm font-bold text-white">
                      {item.title}
                    </p>
                    <p className="text-sm text-[#9eb3be] leading-6 mt-1">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 border border-[#a2e5d0]/25 bg-[#091815] rounded-2xl p-5 flex gap-3.5 items-start">
              <ShieldAlert
                color="#a2e5d0"
                size={20}
                className="shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <p className="text-xs leading-6 text-[#c4d5dc]">
                Please don’t include passwords, confidential files or sensitive
                customer information.
              </p>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}

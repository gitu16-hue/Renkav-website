import Link from "next/link";
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

const principles = [
  {
    num: "01",
    icon: History,
    title: "Pick up where you left off.",
    description:
      "Use context you choose to keep so you don’t have to explain the whole project again.",
    tag: "CONTEXT THAT CONTINUES",
  },
  {
    num: "02",
    icon: Layers3,
    title: "Use the right model for the job.",
    description:
      "The goal is one assistant experience that can work with different AI models.",
    tag: "INTELLIGENCE THAT ADAPTS",
  },
  {
    num: "03",
    icon: ShieldCheck,
    title: "Keep important decisions yours.",
    description:
      "Review sensitive actions before they happen and see what happened afterward.",
    tag: "CONTROL THAT’S VISIBLE",
  },
];

export default function Home() {
  return (
    <>
      <section className="hero relative overflow-hidden text-white">
        <div className="absolute inset-0 grid-pattern opacity-35" />
        <div className="container-main relative grid lg:grid-cols-[1.12fr_.88fr] gap-12 lg:gap-12 items-center pt-16 pb-20 lg:pt-[96px] lg:pb-[112px]">
          <div>
            <div className="entry-1">
              <p className="eyebrow text-[#a2e5d0] mb-6 flex items-center gap-2.5">
                <span className="status-dot" aria-hidden="true" />
                <span>RENKAV TECHNOLOGIES</span>
              </p>
            </div>
            <h1 className="display hero-title entry-2 max-w-[770px]">
              AI that helps you{" "}
              <span className="text-[#a2e5d0]">get work done.</span>
            </h1>
            <p className="entry-3 mt-7 max-w-[580px] text-[#c4d5dc] text-[16px] md:text-[18px] leading-[1.8]">
              We’re building software that helps people pick up where they left
              off, plan their next steps, and stay in control of what AI does on
              their behalf.
            </p>
            <div className="entry-4 mt-9 flex flex-col sm:flex-row flex-wrap gap-3.5">
              <Link
                href="/ventures"
                className="btn btn-light w-full sm:w-auto"
              >
                Explore ELEVEN <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="btn border border-white/20 text-white hover:bg-white/10 w-full sm:w-auto"
              >
                Get in touch <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <p className="entry-4 mt-12 pt-6 border-t border-white/10 text-[#a2e5d0] uppercase tracking-[.22em] text-[11px] font-bold mono flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a2e5d0]/60" />
              <span>Make the Next Matter.</span>
            </p>
          </div>
          <div className="relative">
            <NetworkArt />
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#f8faf7]">
        <div className="container-main grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-1 lg:order-2">
            <div className="tag mb-6 border-[#a2e5d0]/50 text-[#08766c] bg-[#eef7f3]">
              <span className="status-dot-lime mr-1" aria-hidden="true" />
              <span>OUR FIRST PROJECT · IN DEVELOPMENT</span>
            </div>
            <h2 className="heading text-[#0d141e]">
              Meet <span className="text-[#08766c]">ELEVEN.</span>
            </h2>
            <p className="bodycopy mt-6 text-[16px] md:text-[17px]">
              ELEVEN is an AI assistant in development. We’re designing it to
              pick up ongoing work using context you’ve approved, work with
              different AI models, and ask before taking actions that need your
              permission.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/ventures" className="btn btn-dark">
                See what we’re building{" "}
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
              <span className="text-xs text-[#566978] mono">
                Subsidiary Cognitive Runtime
              </span>
            </div>
          </div>
          <div className="relative order-2 lg:order-1">
            <div
              className="bg-[#0b1017] rounded-xl p-8 md:p-12 min-h-[380px] md:min-h-[440px] overflow-hidden relative border border-[#1a2533] shadow-2xl"
              aria-hidden="true"
            >
              <div className="absolute inset-0 grid-pattern opacity-20" />
              <div className="absolute -right-20 -bottom-20 w-[420px] h-[420px] rounded-full border border-[#a2e5d0]/20" />
              <div className="absolute right-0 bottom-0 w-[300px] h-[300px] rounded-full border border-[#b8f36b]/15" />
              <div className="absolute right-[50px] bottom-[45px] w-[200px] h-[200px] rounded-full border border-[#a2e5d0]/30" />
              
              <div className="relative z-10 flex items-center justify-between">
                <span className="eyebrow text-[#a2e5d0] flex items-center gap-2">
                  <span className="status-dot" /> RENKAV / VENTURE 01
                </span>
                <span className="mono text-[10px] text-[#b8f36b] uppercase tracking-wider px-2 py-0.5 rounded-full border border-[#b8f36b]/30 bg-[#b8f36b]/10">
                  Prototype
                </span>
              </div>

              <div className="absolute bottom-10 left-8 md:left-12 z-10">
                <span className="block text-white text-[clamp(3.8rem,7vw,6.4rem)] font-bold tracking-[-.06em] leading-none">
                  ELEVEN<span className="text-[#b8f36b]">.</span>
                </span>
                <p className="mt-3 text-[#98abb5] uppercase tracking-[.22em] text-[10px] font-bold mono">
                  Intelligence Operating System Prototype
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white border-y border-[#e2e8e3]">
        <div className="container-main">
          <SectionHeading
            kicker="PRODUCT PRINCIPLES"
            title="What we’re designing for"
          />
          <div className="mt-12 grid lg:grid-cols-3 gap-5">
            {principles.map((p) => (
              <div
                key={p.num}
                className="soft-card p-7 md:p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="mono text-[12px] font-bold tracking-widest text-[#566978]">
                      {p.num} / 03
                    </span>
                    <p.icon
                      size={24}
                      strokeWidth={1.6}
                      color="#08766c"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-[21px] font-bold tracking-tight text-[#0d141e] mb-3">
                    {p.title}
                  </h3>
                  <p className="bodycopy text-[15px]">{p.description}</p>
                </div>
                <div className="mt-8 pt-4 border-t border-[#f0f4f1]">
                  <span className="mono text-[10px] font-bold tracking-widest text-[#08766c] uppercase">
                    {p.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#f8faf7]">
        <div className="container-main grid md:grid-cols-[1.15fr_.85fr] gap-10 items-center">
          <div>
            <p className="eyebrow text-[#08766c] mb-5">FOUNDING TEAM</p>
            <h2 className="heading text-[#0d141e]">
              Meet the people building RENKAV.
            </h2>
            <p className="bodycopy mt-5 max-w-2xl">
              Gitanshu Damade and Yashika Pawar are the founders behind RENKAV
              and its first project, ELEVEN.
            </p>
          </div>
          <div className="flex md:justify-end">
            <Link href="/leadership" className="btn btn-outline">
              <Users size={17} aria-hidden="true" /> Meet the founders{" "}
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}

import type { Metadata } from "next";
import { UserRound } from "lucide-react";
import { CtaBanner } from "@/components/cta-banner";
import { Card3DTilt } from "@/components/card-3d-tilt";
import { CanvasParticleField } from "@/components/canvas-particle-field";
import { PagePillNav } from "@/components/page-pill-nav";
import { DiagonalMarqueeRibbon } from "@/components/diagonal-marquee-ribbon";

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "Meet Gitanshu Damade and Yashika Pawar, the founders behind RENKAV Technologies.",
};

const team = [
  {
    initials: "GD",
    name: "Gitanshu Damade",
    role: "Founder",
    accent: "#a2e5d0",
    bio: "Gitanshu leads the technical direction of ELEVEN and works on turning the product vision into a testable prototype.",
  },
  {
    initials: "YP",
    name: "Yashika Pawar",
    role: "Co-founder",
    accent: "#00d8ff",
    bio: "Yashika is part of RENKAV’s founding team, helping shape how the company explains its work and understands the people it aims to serve.",
  },
];

export default function Leadership() {
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
              <span>FOUNDING TEAM</span>
            </p>
          </div>
          <h1 className="display entry-2 max-w-[820px] text-balance text-white">
            <span className="font-reveal-line">
              <span className="font-reveal-inner">The founders behind RENKAV.</span>
            </span>
          </h1>
          <p className="entry-3 mt-6 sm:mt-7 text-[#c4d5dc] max-w-[62ch] text-[16px] md:text-[18px] leading-[1.7] text-pretty">
            RENKAV is being built by Gitanshu Damade and Yashika Pawar. Their
            first project is ELEVEN.
          </p>
        </div>
      </section>

      <section className="section-pad bg-[#050505] text-white border-t border-white/10">
        <div className="container-main">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {team.map((t, idx) => (
              <div
                key={t.name}
                className="scroll-reveal h-full"
                data-delay={String(idx + 1)}
              >
                <Card3DTilt maxTilt={5}>
                  <article className="rounded-3xl overflow-hidden flex flex-col h-full border border-white/12 bg-[#090d14] shadow-2xl">
                    <div
                      className="h-[280px] md:h-[320px] flex items-center justify-center relative overflow-hidden bg-[#06090e] border-b border-white/10"
                      aria-hidden="true"
                    >
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage: `radial-gradient(circle at 50% 50%, ${t.accent} 0%, transparent 70%)`,
                        }}
                      />
                      <div className="absolute inset-0 grid-pattern opacity-15" />

                      <div
                        className="w-36 h-36 rounded-full border flex items-center justify-center bg-[#0d141e] relative z-10 shadow-xl"
                        style={{
                          borderColor: `${t.accent}55`,
                          boxShadow: `0 0 36px ${t.accent}24`,
                        }}
                      >
                        <span
                          className="mono tabular-nums text-5xl font-bold tracking-tighter"
                          style={{ color: t.accent }}
                        >
                          {t.initials}
                        </span>
                      </div>
                      <div
                        className="absolute bottom-6 right-7 opacity-40"
                        style={{ color: t.accent }}
                      >
                        <UserRound size={26} strokeWidth={1.3} />
                      </div>
                    </div>
                    <div className="p-8 sm:p-9 md:p-10 flex-1 flex flex-col justify-between">
                      <div>
                        <h2 className="text-[23px] sm:text-[26px] tracking-tight font-bold text-white text-balance">
                          {t.name}{" "}
                          <span
                            className="font-semibold text-lg"
                            style={{ color: t.accent }}
                          >
                            · {t.role}
                          </span>
                        </h2>
                        <p className="mt-4 text-[15px] sm:text-[16px] text-[#9eb3be] leading-relaxed text-pretty">
                          {t.bio}
                        </p>
                      </div>
                    </div>
                  </article>
                </Card3DTilt>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DiagonalMarqueeRibbon />

      <CtaBanner
        eyebrow="GET IN TOUCH"
        title="Have a question about what we’re building?"
        description=""
        actionLabel="Contact RENKAV"
        actionHref="/contact"
      />
    </>
  );
}

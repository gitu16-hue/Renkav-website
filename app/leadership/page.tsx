import type { Metadata } from "next";
import { UserRound } from "lucide-react";
import { CtaBanner } from "@/components/cta-banner";

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
    bio: "Gitanshu leads the technical direction of ELEVEN and works on turning the product vision into a testable prototype.",
  },
  {
    initials: "YP",
    name: "Yashika Pawar",
    role: "Co-founder",
    bio: "Yashika is part of RENKAV’s founding team, helping shape how the company explains its work and understands the people it aims to serve.",
  },
];

export default function Leadership() {
  return (
    <>
      <section className="masthead">
        <div className="container-main relative z-10">
          <div className="entry-1">
            <p className="eyebrow text-[#a2e5d0] mb-5 sm:mb-6 flex items-center gap-2">
              <span className="status-dot" aria-hidden="true" />
              <span>FOUNDING TEAM</span>
            </p>
          </div>
          <h1 className="display entry-2 max-w-[820px] text-balance">
            The founders behind RENKAV.
          </h1>
          <p className="entry-3 mt-6 sm:mt-7 text-[#c4d5dc] max-w-[62ch] text-[16px] md:text-[18px] leading-[1.7] text-pretty">
            RENKAV is being built by Gitanshu Damade and Yashika Pawar. Their
            first project is ELEVEN.
          </p>
        </div>
      </section>

      <section className="section-pad bg-[#f8faf7]">
        <div className="container-main">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {team.map((t) => (
              <article
                className="soft-card overflow-hidden flex flex-col"
                key={t.name}
              >
                <div
                  className="portrait h-[280px] md:h-[320px] flex items-center justify-center relative overflow-hidden"
                  aria-hidden="true"
                >
                  <div className="founder-avatar w-36 h-36 rounded-full border border-[#b4d0c7] flex items-center justify-center bg-[#d9eae4] relative">
                    <span className="mono tabular-nums text-5xl font-bold tracking-tighter text-[#0d141e]">
                      {t.initials}
                    </span>
                  </div>
                  <div className="absolute bottom-6 right-7 text-[#4f8176]/60">
                    <UserRound size={26} strokeWidth={1.3} />
                  </div>
                </div>
                <div className="p-8 sm:p-9 md:p-10 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-[23px] sm:text-[25px] tracking-tight font-bold text-[#0d141e] text-balance">
                      {t.name}{" "}
                      <span className="text-[#08766c] font-semibold text-lg">
                        · {t.role}
                      </span>
                    </h2>
                    <p className="bodycopy mt-4 text-[15px] sm:text-[16px] text-pretty">
                      {t.bio}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

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

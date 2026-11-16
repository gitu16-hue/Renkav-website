import { ArrowUpRight } from "lucide-react";
import { CanvasParticleField } from "./canvas-particle-field";
import { RollButton } from "./roll-button";

export function CtaBanner({
  eyebrow = "CONTACT RENKAV",
  title = "Tell us what you’d like AI to help with.",
  description = "We’d like to hear from people with a real workflow in mind and teams interested in collaborating.",
  actionLabel = "Get in touch",
  actionHref = "/contact",
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <section className="cta-banner relative overflow-hidden bg-[#050505] text-white border-t border-white/10 py-20 sm:py-24 md:py-28">
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <CanvasParticleField />
      <div
        className="pointer-events-none absolute -right-24 -bottom-24 w-[420px] h-[420px] rounded-full bg-[#a2e5d0]/10 blur-[100px]"
        aria-hidden="true"
      />
      <div className="container-main relative z-10 scroll-reveal flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-12">
        <div className="max-w-[780px]">
          <p className="eyebrow text-[#a2e5d0] mb-3 sm:mb-4 flex items-center gap-2">
            <span className="status-dot" aria-hidden="true" />
            <span>{eyebrow}</span>
          </p>
          <h2 className="heading text-white text-balance">{title}</h2>
          {description && (
            <p className="mt-4 sm:mt-5 text-[#9eb3be] max-w-[62ch] text-[16px] md:text-[17px] leading-[1.7] text-pretty">
              {description}
            </p>
          )}
        </div>
        <RollButton
          href={actionHref}
          variant="light"
          className="shrink-0 self-start lg:self-end"
          icon={<ArrowUpRight size={17} aria-hidden="true" />}
        >
          {actionLabel}
        </RollButton>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

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
    <section className="bg-[#eaf2ee] border-t border-[#e2e8e3] py-16 sm:py-20 md:py-24">
      <div className="container-main flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-12">
        <div className="max-w-[780px]">
          <p className="eyebrow text-[#08766c] mb-3 sm:mb-4 flex items-center gap-2">
            <span className="status-dot" aria-hidden="true" />
            <span>{eyebrow}</span>
          </p>
          <h2 className="heading text-[#0d141e] text-balance">{title}</h2>
          {description && (
            <p className="mt-4 sm:mt-5 text-[#425a66] max-w-[62ch] text-[16px] md:text-[17px] leading-[1.7] text-pretty">
              {description}
            </p>
          )}
        </div>
        <Link
          href={actionHref}
          className="btn btn-dark shrink-0 self-start lg:self-end"
        >
          {actionLabel} <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

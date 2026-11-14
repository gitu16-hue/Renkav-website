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
    <section className="bg-[#eaf2ee] border-t border-[#e2e8e3] py-[72px] md:py-[88px]">
      <div className="container-main flex flex-col lg:flex-row lg:items-end justify-between gap-9">
        <div>
          <p className="eyebrow text-[#08766c] mb-4 flex items-center gap-2">
            <span className="status-dot" aria-hidden="true" />
            <span>{eyebrow}</span>
          </p>
          <h2 className="heading max-w-[750px] text-[#0d141e]">{title}</h2>
          {description && (
            <p className="mt-5 text-[#425a66] max-w-xl leading-7">
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

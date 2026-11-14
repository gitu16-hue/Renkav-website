import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "./logo";
export function SiteFooter() {
  return (
    <footer className="bg-[#090e15] border-t border-white/10 text-white pt-16 pb-10">
      <div className="container-main">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr] pb-12">
          <div>
            <Brand inverse />
            <p className="mt-6 uppercase text-[11px] tracking-[.22em] font-bold text-[#a2e5d0] mono flex items-center gap-2">
              <span className="status-dot" aria-hidden="true" />
              <span>Make the Next Matter.</span>
            </p>
          </div>
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#ecf6f2] mb-5">
              Navigation
            </h2>
            <div className="flex flex-col gap-3.5">
              {[
                ["/", "Home"],
                ["/about", "About"],
                ["/ventures", "Ventures"],
                ["/leadership", "Leadership"],
                ["/contact", "Contact"],
              ].map(([href, label]) => (
                <Link className="footer-link" href={href} key={href}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#ecf6f2] mb-5">
              Contact
            </h2>
            <a
              className="footer-link inline-flex items-center gap-2"
              href="mailto:gitanshu@renkav.online"
            >
              gitanshu@renkav.online{" "}
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row gap-3 justify-between text-[12px] text-[#9fb1c0]">
          <span>RENKAV Technologies · Make the Next Matter.</span>
          <a
            href="mailto:gitanshu@renkav.online"
            className="hover:text-[#a2e5d0] transition-colors"
          >
            gitanshu@renkav.online
          </a>
        </div>
      </div>
    </footer>
  );
}

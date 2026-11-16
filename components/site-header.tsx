"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { Brand } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { RollButton } from "./roll-button";

const links = [
  ["/", "Home"],
  ["/about", "About"],
  ["/ventures", "Ventures"],
  ["/leadership", "Leadership"],
  ["/contact", "Contact"],
];

export function SiteHeader({
  showThemeToggle = true,
}: {
  showThemeToggle?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const path = usePathname();

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  return (
    <>
      <header ref={header} className="site-header">
        <div className="container-main h-[88px] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Brand />
            <span className="hidden xl:inline-block h-4 w-[1px] bg-current opacity-15" aria-hidden="true" />
            <span className="hidden xl:inline-block mono text-[10px] tracking-[0.2em] uppercase opacity-60">
              Make the Next Matter.
            </span>
          </div>

          <nav
            className="hidden md:flex items-center gap-6 lg:gap-8"
            aria-label="Main navigation"
          >
            {links.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="nav-link group"
                aria-current={path === href ? "page" : undefined}
              >
                <span className="split-hover inline-block overflow-hidden align-bottom">
                  <span className="line line-normal">{label}</span>
                  <span aria-hidden="true" className="line line-hover">
                    {label}
                  </span>
                </span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {showThemeToggle && <ThemeToggle />}
            <div className="hidden md:block">
              <RollButton
                href="/contact"
                variant="glass"
                className="!py-2.5 !px-5 !text-xs uppercase font-mono tracking-wider !bg-[#0d141e] !text-white dark:!bg-white/10"
                icon={<ArrowUpRight size={15} aria-hidden="true" />}
              >
                Get in touch
              </RollButton>
            </div>

            {/* Signature / Menu Pill Drawer Toggle (Desktop & Mobile) */}
            <button
              ref={button}
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-current/20 bg-black/5 dark:bg-white/10 backdrop-blur-md px-4 py-2 text-xs font-mono font-bold tracking-widest uppercase hover:border-[#a2e5d0] transition-all cursor-pointer"
              aria-expanded={open}
              aria-controls="fullscreen-menu-drawer"
              aria-label={open ? "Close navigation" : "Open navigation"}
              onClick={() => setOpen(!open)}
            >
              <span>{open ? "/ Close" : "/ Menu"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Made to Disrupt-inspired Fullscreen Obsidian Navigation Drawer */}
      {open && (
        <div
          id="fullscreen-menu-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Full navigation drawer"
          className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[540px] h-full bg-[#050505] text-white border-l border-white/10 p-8 sm:p-12 flex flex-col justify-between shadow-2xl overflow-y-auto"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              <span className="mono text-xs font-bold tracking-[0.2em] text-[#a2e5d0] uppercase">
                RENKAV // NAVIGATION
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close navigation drawer"
                className="h-10 w-10 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Giant Uppercase Nav Links with Hover Indent */}
            <nav aria-label="Drawer navigation" className="my-10 flex flex-col gap-3">
              {links.map(([href, label], idx) => {
                const isActive = path === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`group flex items-center justify-between py-2 text-3xl sm:text-5xl font-normal tracking-tight transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] hover:pl-4 ${
                      isActive
                        ? "text-[#a2e5d0]"
                        : "text-white hover:text-[#a2e5d0]"
                    }`}
                    style={{ fontFamily: "var(--font-optima)" }}
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="mono text-xs font-bold text-white/35 group-hover:text-[#a2e5d0]">
                        0{idx + 1}
                      </span>
                      <span className="split-hover inline-block overflow-hidden">
                        <span className="line line-normal">{label}</span>
                        <span aria-hidden="true" className="line line-hover">
                          {label}
                        </span>
                      </span>
                    </span>
                    <ArrowUpRight
                      size={24}
                      className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Drawer Footer */}
            <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="mono text-[10px] uppercase tracking-widest text-white/40 block">
                  Direct Inquiries
                </span>
                <a
                  href="mailto:gitanshu@renkav.online"
                  className="text-sm font-mono text-white hover:text-[#a2e5d0] transition-colors inline-flex items-center gap-1 mt-1"
                >
                  gitanshu@renkav.online <ArrowUpRight size={13} />
                </a>
              </div>
              <span className="mono text-[10px] tracking-[0.2em] uppercase text-[#a2e5d0]">
                Make the Next Matter.
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

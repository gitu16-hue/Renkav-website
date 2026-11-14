"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Brand } from "./logo";
import { ThemeToggle } from "./theme-toggle";
const links = [
  ["/", "Home"],
  ["/about", "About"],
  ["/ventures", "Ventures"],
  ["/leadership", "Leadership"],
  ["/contact", "Contact"],
];
export function SiteHeader() {
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
    const outside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !header.current?.contains(event.target)
      )
        setOpen(false);
    };
    const query = matchMedia("(min-width: 1024px)");
    const resize = () => {
      if (query.matches) setOpen(false);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    query.addEventListener("change", resize);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
      query.removeEventListener("change", resize);
    };
  }, [open]);
  return (
    <header
      ref={header}
      className="site-header"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <div className="container-main h-[88px] flex items-center justify-between">
        <Brand />
        <nav
          className="hidden lg:flex items-center gap-8"
          aria-label="Main navigation"
        >
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="nav-link"
              aria-current={path === href ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            className="btn btn-dark hidden! lg:inline-flex! !py-3"
            href="/contact"
          >
            Get in touch <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
          <button
            ref={button}
            type="button"
            className="lg:hidden p-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/10"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      <nav
        id="mobile-navigation"
        hidden={!open}
        className="mobile-navigation lg:hidden border-t border-[#e2e9e6] px-5 py-4"
        aria-label="Mobile navigation"
      >
        {links.map(([href, label]) => (
          <Link
            onClick={() => setOpen(false)}
            key={href}
            href={href}
            aria-current={path === href ? "page" : undefined}
            className="nav-link block rounded-md px-4 py-3"
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

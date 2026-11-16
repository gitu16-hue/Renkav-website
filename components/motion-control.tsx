"use client";
import { useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
const preferenceKey = "renkav-reduced-motion";
let sessionPreference: boolean | null = null;
function snapshot() {
  if (sessionPreference !== null) return sessionPreference;
  try {
    return localStorage.getItem(preferenceKey) === "true";
  } catch {
    return false;
  }
}
function subscribe(notify: () => void) {
  const syncStorage = () => {
    sessionPreference = null;
    notify();
  };
  window.addEventListener("storage", syncStorage);
  window.addEventListener("renkav-motion", notify);
  return () => {
    window.removeEventListener("storage", syncStorage);
    window.removeEventListener("renkav-motion", notify);
  };
}
export function MotionControl() {
  const paused = useSyncExternalStore(subscribe, snapshot, () => false);
  const path = usePathname();
  useEffect(() => {
    document.documentElement.dataset.reduceMotion = String(paused);
    if (
      paused ||
      matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      document.querySelectorAll(".scroll-reveal").forEach((el) => {
        el.classList.add("revealed");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px 120px 0px",
        threshold: 0.01,
      },
    );

    const scanAndObserve = () => {
      const targets = document.querySelectorAll(
        ".scroll-reveal, .soft-card, .section-pad h2, .section-pad .subheading, .cta-banner"
      );

      targets.forEach((el) => {
        el.classList.add("scroll-reveal");
        if (el.classList.contains("revealed")) return;
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 120) {
          el.classList.add("revealed");
        } else {
          observer.observe(el);
        }
      });
    };

    scanAndObserve();
    const timer = window.setTimeout(scanAndObserve, 120);
    window.addEventListener("scroll", scanAndObserve, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", scanAndObserve);
      observer.disconnect();
    };
  }, [path, paused]);
  function toggle() {
    sessionPreference = !paused;
    try {
      localStorage.setItem(preferenceKey, String(sessionPreference));
    } catch {
      /* Fall back to this tab's memory. */
    }
    window.dispatchEvent(new Event("renkav-motion"));
  }
  return (
    <button
      type="button"
      className="motion-control"
      onClick={toggle}
      aria-pressed={paused}
    >
      Reduce motion <span aria-hidden="true">{paused ? "✓" : "○"}</span>
    </button>
  );
}

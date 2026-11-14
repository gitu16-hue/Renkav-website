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
    )
      return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    document
      .querySelectorAll(
        ".section-pad .soft-card, .section-pad .heading, .section-pad .subheading",
      )
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
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

"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

const THEME_KEY = "renkav-theme";
const THEME_CHANGE_EVENT = "renkav-theme-change";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(THEME_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(THEME_CHANGE_EVENT, callback);
  };
}

function getSnapshot(): "dark" | "light" {
  try {
    const val = localStorage.getItem(THEME_KEY);
    return val === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

function getServerSnapshot(): "dark" | "light" {
  return "dark";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isDark = theme === "dark";

  // Ensure DOM element classes and dataset accurately reflect the state on client mount
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.dataset.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.dataset.theme = "light";
    }
  }, [theme]);

  const toggleTheme = () => {
    const next = isDark ? "light" : "dark";
    try {
      localStorage.setItem(THEME_KEY, next);
      if (next === "dark") {
        document.documentElement.classList.add("dark");
        document.documentElement.dataset.theme = "dark";
      } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.dataset.theme = "light";
      }
      // Notify listeners in this window and across tabs
      window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: next }));
      window.dispatchEvent(new Event("storage"));
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="p-2.5 rounded-lg border border-transparent hover:border-current/20 hover:bg-black/5 dark:hover:bg-white/10 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer text-current"
    >
      {isDark ? (
        <Sun
          size={18}
          className="text-[#a2e5d0] hover:text-[#b8f36b] transition-colors"
          aria-hidden="true"
        />
      ) : (
        <Moon
          size={18}
          className="text-[#08766c] hover:text-[#0d141e] transition-colors"
          aria-hidden="true"
        />
      )}
    </button>
  );
}

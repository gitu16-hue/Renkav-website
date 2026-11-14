import { flag } from "flags/next";
import { vercelAdapter } from "@flags-sdk/vercel";

/**
 * RENKAV Feature Flags declared via Vercel Flags SDK.
 * Server-evaluated, zero-layout-shift, and manageable from the Vercel Dashboard or CLI.
 */

export const showHolographicOrb = flag<boolean>({
  key: "hero-holographic-orb",
  description:
    "Controls whether the Three.js WebGL Holographic Orb renders in hero sections",
  defaultValue: true,
  options: [
    { value: true, label: "3D WebGL Orb (Active)" },
    { value: false, label: "Static Fallback" },
  ],
  adapter: vercelAdapter,
});

export const showThemeToggle = flag<boolean>({
  key: "theme-toggle",
  description: "Controls the Dark / Light mode switcher in the navigation header",
  defaultValue: true,
  options: [
    { value: true, label: "Visible" },
    { value: false, label: "Hidden" },
  ],
  adapter: vercelAdapter,
});

export const showCognitiveSimulator = flag<boolean>({
  key: "cognitive-simulator",
  description:
    "Controls the interactive cognitive state mode selector beneath the 3D Orb",
  defaultValue: true,
  options: [
    { value: true, label: "Interactive Controls" },
    { value: false, label: "Passive Display" },
  ],
  adapter: vercelAdapter,
});

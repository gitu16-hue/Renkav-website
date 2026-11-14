import { animationsEnabled } from './motion';

// Editorial camera moves inspired by the reference. Native scrolling remains intact.
const hero = document.querySelector<HTMLElement>('.home-hero');
const visual = hero?.querySelector<HTMLElement>('.hero-visual');
const panel = document.querySelector<HTMLElement>('.eleven-panel');
const assembly = document.querySelector<HTMLElement>('.continuity-visual');
const scene = document.querySelector<HTMLElement>('[data-continuity]');
const clamp = (value: number) => Math.max(0, Math.min(1, value));
let frame = 0;
function render() {
  frame = 0;
  if (!animationsEnabled()) return;
  if (hero && visual) {
    const rect = hero.getBoundingClientRect();
    const p = clamp(-rect.top / rect.height);
    const wide = window.innerWidth >= 1024;
    visual.style.transform = `translate3d(${wide ? -100 * p : 0}px,${p * 65}px,0) scale(${1 + p * (wide ? 0.55 : 0.15)})`;
  }
  if (panel) {
    const rect = panel.getBoundingClientRect();
    const p = clamp(
      (window.innerHeight - rect.top) / (window.innerHeight * 0.65),
    );
    panel.style.clipPath = `inset(${(1 - p) * 10}% ${(1 - p) * 13}% round 8px)`;
  }
  if (assembly && scene) {
    const rect = scene.getBoundingClientRect();
    const p = clamp(-rect.top / Math.max(1, rect.height - window.innerHeight));
    assembly.style.transform = `scale(${0.88 + p * 0.24})`;
  }
}
function schedule() {
  if (!frame) frame = requestAnimationFrame(render);
}
window.addEventListener('scroll', schedule, { passive: true });
window.addEventListener('resize', schedule, { passive: true });
window.addEventListener('renkav:motion', () => {
  if (animationsEnabled()) schedule();
  else {
    visual?.style.removeProperty('transform');
    panel?.style.removeProperty('clip-path');
    assembly?.style.removeProperty('transform');
  }
});
schedule();

// Reveal each editorial heading as one gesture, keeping its final layout intact.
const headings = document.querySelectorAll<HTMLElement>('main h2');
const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      observer.unobserve(entry.target);
      const parentReveals = entry.target.closest('[data-reveal]');
      if (!animationsEnabled() || parentReveals) continue;
      const animation = entry.target.animate(
        [
          {
            clipPath: 'inset(0 0 100% 0)',
            transform: 'translateY(22px)',
            opacity: 0,
          },
          {
            clipPath: 'inset(0 0 0% 0)',
            transform: 'translateY(0)',
            opacity: 1,
          },
        ],
        { duration: 800, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' },
      );
      const cancel = () => {
        if (!animationsEnabled()) animation.cancel();
      };
      window.addEventListener('renkav:motion', cancel);
      animation.finished
        .catch(() => {})
        .finally(() => window.removeEventListener('renkav:motion', cancel));
    }
  },
  { threshold: 0.25 },
);
headings.forEach((heading) => observer.observe(heading));

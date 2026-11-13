import { animationsEnabled } from './motion';

const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const scene = document.querySelector<HTMLElement>('[data-continuity]');
const assembly = scene?.querySelector<HTMLElement>('[data-assembly]');
const layers = [...document.querySelectorAll<HTMLElement>('[data-layer]')];
const chapters = [...document.querySelectorAll<HTMLElement>('[data-chapter]')];
const sceneProgress = scene?.querySelector<HTMLElement>(
  '[data-scene-progress]',
);
const sceneCount = scene?.querySelector<HTMLElement>('[data-scene-count]');
const eleven = document.querySelector<HTMLElement>('.eleven-object');
const portraits = [
  ...document.querySelectorAll<HTMLElement>('.portrait-rings, .initials-orbit'),
];
let frame = 0;
let progress = 0;
let targetProgress = 0;

// Use scroll position as the timeline; no wheel interception or forced scroll.
function measure() {
  if (!scene) return;
  const rect = scene.getBoundingClientRect();
  const top = window.innerWidth < 768 ? 72 : 86;
  const travel = rect.height - (window.innerHeight - top);
  targetProgress =
    travel > 100
      ? clamp((top - rect.top) / travel)
      : clamp(
          (window.innerHeight - rect.top) / (window.innerHeight + rect.height),
        );
}
function paintScene(p: number) {
  if (!assembly) return;
  const mobile = window.innerWidth < 768;
  const spread = 1 - p;
  assembly.style.transform = `rotateX(${lerp(44, 56, p)}deg) rotateY(${lerp(-18, 8, p)}deg) rotateZ(${lerp(-21, -32, p)}deg)`;
  layers.forEach((layer, i) => {
    const x = [-95, 30, 105][i] * spread * (mobile ? 0.6 : 1);
    const y = [80, -5, -90][i] * spread;
    const z = 38 + i * 52 + spread * (i + 1) * 28;
    layer.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateZ(${[-13, 6, 17][i] * spread}deg)`;
  });
  const active = Math.min(2, Math.floor(p * 3));
  chapters.forEach((chapter, i) =>
    chapter.classList.toggle('is-active', i === active),
  );
  if (sceneCount) sceneCount.textContent = `0${active + 1} / 03`;
  if (sceneProgress) sceneProgress.style.transform = `scaleX(${p})`;
}
function paintDecorations() {
  if (eleven) {
    const rect = eleven.parentElement!.getBoundingClientRect();
    const p = clamp(
      (window.innerHeight - rect.top) / (window.innerHeight + rect.height),
    );
    eleven.style.transform = `perspective(900px) rotateX(${lerp(18, -24, p)}deg) rotateY(${lerp(-45, 35, p)}deg) rotateZ(${lerp(24, -12, p)}deg)`;
    eleven.querySelectorAll<HTMLElement>(':scope > span').forEach((bar, i) => {
      bar.style.transform = `translate3d(${(i ? 1 : -1) * Math.sin(p * Math.PI) * 16}px,${(i ? -1 : 1) * Math.cos(p * Math.PI) * 20}px,${Math.sin(p * Math.PI) * 28}px)`;
    });
  }
  for (const portrait of portraits) {
    const rect = portrait.parentElement!.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) continue;
    const p = clamp(
      (window.innerHeight - rect.top) / (window.innerHeight + rect.height),
    );
    portrait.style.transform = `perspective(600px) rotateX(${lerp(28, -15, p)}deg) rotateY(${lerp(-18, 18, p)}deg) rotateZ(${lerp(-55, 15, p)}deg)`;
  }
}
function tick() {
  frame = 0;
  if (!animationsEnabled() || document.hidden) return;
  measure();
  progress = lerp(progress, targetProgress, 0.16);
  if (Math.abs(progress - targetProgress) < 0.001) progress = targetProgress;
  paintScene(progress);
  paintDecorations();
  if (progress !== targetProgress) frame = requestAnimationFrame(tick);
}
function schedule() {
  if (!frame && animationsEnabled() && !document.hidden)
    frame = requestAnimationFrame(tick);
}
function updateMode() {
  cancelAnimationFrame(frame);
  frame = 0;
  if (animationsEnabled()) schedule();
  else {
    // A complete, readable composition when motion is reduced or paused.
    paintScene(0.7);
    eleven?.style.removeProperty('transform');
    eleven
      ?.querySelectorAll<HTMLElement>(':scope > span')
      .forEach((bar) => bar.style.removeProperty('transform'));
    portraits.forEach((el) => el.style.removeProperty('transform'));
    chapters.forEach((el) => el.classList.add('is-active'));
  }
}
window.addEventListener('scroll', schedule, { passive: true });
window.addEventListener('resize', schedule, { passive: true });
window.addEventListener('renkav:motion', updateMode);
document.addEventListener('visibilitychange', schedule);
updateMode();

// Small spring-following depth on decorative portraits only; touch scrolling is untouched.
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
document
  .querySelectorAll<HTMLElement>('.founder-initials, .founder-portrait')
  .forEach((el) => {
    let x = 0,
      y = 0,
      vx = 0,
      vy = 0,
      targetX = 0,
      targetY = 0,
      raf = 0,
      last = 0;
    function spring(time: number) {
      raf = 0;
      if (!animationsEnabled()) {
        el.style.removeProperty('transform');
        return;
      }
      const dt = Math.min((time - last) / 1000 || 0.016, 0.032);
      last = time;
      // mass 1, stiffness 100, damping 10 — shared animation skill spring recipe.
      vx += ((targetX - x) * 100 - vx * 10) * dt;
      vy += ((targetY - y) * 100 - vy * 10) * dt;
      x += vx * dt;
      y += vy * dt;
      el.style.transform = `perspective(700px) rotateX(${x}deg) rotateY(${y}deg)`;
      if (
        Math.abs(targetX - x) +
          Math.abs(targetY - y) +
          Math.abs(vx) +
          Math.abs(vy) >
        0.02
      )
        raf = requestAnimationFrame(spring);
    }
    function start() {
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(spring);
      }
    }
    el.addEventListener('pointermove', (event) => {
      if (
        !animationsEnabled() ||
        !finePointer.matches ||
        event.pointerType !== 'mouse'
      )
        return;
      const rect = el.getBoundingClientRect();
      targetX =
        -clamp(((event.clientY - rect.top) / rect.height) * 2 - 1, -1, 1) * 8;
      targetY =
        clamp(((event.clientX - rect.left) / rect.width) * 2 - 1, -1, 1) * 10;
      start();
    });
    el.addEventListener('pointerleave', () => {
      targetX = 0;
      targetY = 0;
      start();
    });
    window.addEventListener('renkav:motion', () => {
      if (!animationsEnabled()) {
        cancelAnimationFrame(raf);
        raf = 0;
        el.style.removeProperty('transform');
      }
    });
  });

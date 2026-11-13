const systemPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
function storedPreference() {
  try {
    return localStorage.getItem('renkav-motion');
  } catch {
    return null;
  }
}
export function motionEnabled() {
  const saved = storedPreference();
  return saved === 'on' || (saved !== 'paused' && !systemPreference.matches);
}
let memoryPreference: boolean | undefined;
export function animationsEnabled() {
  return memoryPreference ?? motionEnabled();
}
export function syncMotion() {
  const active = animationsEnabled();
  document.documentElement.dataset.motion = active ? 'on' : 'off';
  document
    .querySelectorAll<HTMLButtonElement>('[data-motion-toggle]')
    .forEach((button) => {
      button.disabled = false;
      button.setAttribute('aria-pressed', String(!active));
      button.setAttribute(
        'aria-label',
        active ? 'Pause animations' : 'Enable animations',
      );
      button.title = active ? 'Pause animations' : 'Enable animations';
      const label = button.querySelector('[data-motion-label]');
      const icon = button.querySelector('.pause-icon');
      if (label) label.textContent = active ? 'Motion on' : 'Motion off';
      if (icon) icon.textContent = active ? 'Ⅱ' : '▷';
    });
  window.dispatchEvent(new Event('renkav:motion'));
}
export function initMotionControls() {
  syncMotion();
  document
    .querySelectorAll<HTMLButtonElement>('[data-motion-toggle]')
    .forEach((button) => {
      button.addEventListener('click', () => {
        memoryPreference = !animationsEnabled();
        try {
          localStorage.setItem(
            'renkav-motion',
            memoryPreference ? 'on' : 'paused',
          );
        } catch {
          /* In-memory control remains available. */
        }
        syncMotion();
      });
    });
  systemPreference.addEventListener('change', syncMotion);
  document.addEventListener('visibilitychange', () => {
    document.documentElement.dataset.pageHidden = String(document.hidden);
  });
}

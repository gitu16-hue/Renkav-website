const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const preference = {
  get(key: string) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string) {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* Storage may be disabled. */
    }
  },
};

// Brief, synthesized tactile clicks. Audio only starts inside a visitor gesture.
let soundEnabled = preference.get('renkav-sound') !== 'off';
let audioContext: AudioContext | undefined;
const soundButton = document.querySelector<HTMLButtonElement>(
  '[data-sound-toggle]',
);
function updateSoundControl() {
  soundButton?.setAttribute('aria-pressed', String(soundEnabled));
  soundButton?.setAttribute(
    'aria-label',
    soundEnabled ? 'Mute click sounds' : 'Enable click sounds',
  );
  const label = soundButton?.querySelector('[data-sound-label]');
  if (label) label.textContent = soundEnabled ? 'Sound on' : 'Sound off';
}
function clickSound() {
  if (!soundEnabled) return;
  try {
    audioContext ??= new AudioContext();
    if (audioContext.state === 'suspended')
      void audioContext.resume().catch(() => {});
    const now = audioContext.currentTime;
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(620, now);
    oscillator.frequency.exponentialRampToValueAtTime(210, now + 0.045);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.055, now + 0.003);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.055);
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.06);
    oscillator.onended = () => {
      oscillator.disconnect();
      gain.disconnect();
    };
  } catch {
    /* Browsers without audio still have a fully usable website. */
  }
}
updateSoundControl();
soundButton?.addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  preference.set('renkav-sound', soundEnabled ? 'on' : 'off');
  updateSoundControl();
  if (soundEnabled) clickSound();
});
document.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;
  if (target.closest('a,button') && !target.closest('[data-sound-toggle]'))
    clickSound();
});

// Mobile navigation is a disclosure, keeping ordinary link and keyboard behavior.
const menuButton = document.querySelector<HTMLButtonElement>('.menu-toggle');
const menu = document.querySelector<HTMLElement>('#mobile-nav');
function closeMenu(returnFocus = false) {
  if (!menu || !menuButton) return;
  menu.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  const label = menuButton.querySelector('[data-menu-label]');
  if (label) label.textContent = 'Menu';
  if (returnFocus) menuButton.focus();
}
menuButton?.addEventListener('click', () => {
  if (!menu) return;
  const open = menu.hidden;
  menu.hidden = !open;
  menuButton.setAttribute('aria-expanded', String(open));
  const label = menuButton.querySelector('[data-menu-label]');
  if (label) label.textContent = open ? 'Close' : 'Menu';
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu && !menu.hidden) closeMenu(true);
});
document.addEventListener('click', (event) => {
  if (!(event.target as HTMLElement).closest('.site-header')) closeMenu();
});
menu
  ?.querySelectorAll('a')
  .forEach((link) => link.addEventListener('click', () => closeMenu()));
window.matchMedia('(min-width: 768px)').addEventListener('change', (event) => {
  if (event.matches) closeMenu();
});

// Once-only reveals preserve natural scrolling, and stay visible without JS.
if (!reducedMotion.matches) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -25px 0px' },
  );
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    if (el.getBoundingClientRect().top > window.innerHeight * 0.9) {
      el.classList.add('reveal-ready');
      revealObserver.observe(el);
    }
  });
}
const progress = document.querySelector<HTMLElement>('.scroll-progress');
let scrollFrame = 0;
function updateProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (progress)
    progress.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
  scrollFrame = 0;
}
window.addEventListener(
  'scroll',
  () => {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateProgress);
  },
  { passive: true },
);
window.addEventListener('resize', updateProgress, { passive: true });
updateProgress();
const orbitObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      orbitObserver.unobserve(entry.target);
      const element = entry.target as HTMLElement;
      void import('./orbit')
        .then(({ initOrbit }) => initOrbit(element))
        .catch(() => {
          const control = element.querySelector<HTMLButtonElement>(
            '[data-motion-toggle]',
          );
          if (control) control.hidden = true;
        });
    }
  },
  { rootMargin: '100px' },
);
document
  .querySelectorAll<HTMLElement>('[data-orbit]')
  .forEach((el) => orbitObserver.observe(el));

// Fixed recipient, local form only: no requests, analytics, or stored field values.
const recipient = 'gitanshu@renkav.online';
const copyButton =
  document.querySelector<HTMLButtonElement>('[data-copy-email]');
copyButton?.addEventListener('click', async () => {
  const feedback = document.querySelector<HTMLElement>('[data-copy-status]');
  try {
    await navigator.clipboard.writeText(recipient);
    if (feedback) feedback.textContent = 'Email address copied.';
  } catch {
    if (feedback)
      feedback.textContent = `Select and copy the address above: ${recipient}`;
  }
});
const form = document.querySelector<HTMLFormElement>('#contact-form');
if (form) form.hidden = false;
const message = form?.querySelector<HTMLTextAreaElement>('#message');
message?.addEventListener('input', () => {
  const count = form?.querySelector('[data-character-count]');
  if (count)
    count.textContent = `${message.value.length.toLocaleString()} / 1,000`;
});
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = form.querySelector<HTMLInputElement>('#name')!;
  const email = form.querySelector<HTMLInputElement>('#email')!;
  const message = form.querySelector<HTMLTextAreaElement>('#message')!;
  const inquiry = form.querySelector<HTMLSelectElement>('#inquiry')!;
  let firstInvalid: HTMLElement | null = null;
  const checks: [HTMLInputElement | HTMLTextAreaElement, string][] = [
    [name, name.value.trim() ? '' : 'Enter your name.'],
    [
      email,
      email.value.trim() && email.validity.valid
        ? ''
        : 'Enter a valid email address.',
    ],
    [
      message,
      message.value.trim() ? '' : 'Tell us what you’d like to discuss.',
    ],
  ];
  for (const [field, error] of checks) {
    field.setAttribute('aria-invalid', String(Boolean(error)));
    const element = document.getElementById(`${field.id}-error`);
    if (element) element.textContent = error;
    if (error && !firstInvalid) firstInvalid = field;
  }
  if (firstInvalid) {
    firstInvalid.focus();
    return;
  }
  const subject = `RENKAV — ${inquiry.value}`;
  const body = `Name: ${name.value.trim().slice(0, 80)}\nEmail: ${email.value.trim().slice(0, 120)}\nInquiry: ${inquiry.value}\n\n${message.value.trim().slice(0, 1000)}`;
  const href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const result = form.querySelector<HTMLElement>('.form-result')!;
  const link = form.querySelector<HTMLAnchorElement>('[data-draft-link]')!;
  link.href = href;
  result.hidden = false;
  result.focus({ preventScroll: true });
  link.click();
});

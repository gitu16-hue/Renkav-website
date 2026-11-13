import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = ['/', '/about', '/ventures', '/leadership', '/contact'];

for (const width of [320, 390, 768, 1024, 1440]) {
  test(`all five pages fit a ${width}px viewport`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    for (const route of routes) {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        'content',
        'noindex, nofollow',
      );
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
      for (const link of await page.locator('main a[href^="/"]').all()) {
        const href = await link.getAttribute('href');
        expect(routes).toContain(href?.split('#')[0]);
      }
    }
  });
}

for (const route of routes) {
  test(`accessible landmarks, labels, and contrast on ${route}`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(route);
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(
      result.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      })),
    ).toEqual([]);
  });
}

test('mobile menu supports Escape, focus return, and navigation', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const toggle = page.locator('.menu-toggle');
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(
    page.getByRole('navigation', { name: 'Mobile navigation' }),
  ).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click();
  await page
    .getByRole('navigation', { name: 'Mobile navigation' })
    .getByRole('link', { name: 'Ventures' })
    .click();
  await expect(page).toHaveURL('/ventures');
  await expect(page.locator('.menu-toggle')).toHaveAttribute(
    'aria-expanded',
    'false',
  );
});

test('contact validates fields and prepares encoded email without sending data', async ({
  page,
}) => {
  const externalRequests: string[] = [];
  page.on('request', (request) => {
    if (!request.url().startsWith('http://127.0.0.1:4321'))
      externalRequests.push(request.url());
  });
  await page.goto('/contact');
  await page.getByRole('button', { name: 'Open email draft' }).click();
  await expect(
    page.getByText('Enter your name.', { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText('Enter a valid email address.', { exact: true }),
  ).toBeVisible();
  await expect(page.getByLabel('Name', { exact: true })).toBeFocused();
  await page.getByLabel('Name', { exact: true }).fill('Test & Example');
  await page.getByLabel('Email', { exact: true }).fill('visitor@example.com');
  await page.getByLabel('Inquiry type').selectOption('ELEVEN');
  await page
    .getByLabel('What do you have in mind?')
    .fill('Plan a proposal & review the draft.\nKeep 100% of the context.');
  await page.evaluate(() =>
    document.addEventListener(
      'click',
      (event) => {
        if ((event.target as Element).closest('a[href^="mailto:"]'))
          event.preventDefault();
      },
      true,
    ),
  );
  await page.getByRole('button', { name: 'Open email draft' }).click();
  const href = await page.locator('[data-draft-link]').getAttribute('href');
  expect(href).toContain('mailto:gitanshu@renkav.online?');
  const params = new URL(href!).searchParams;
  expect(params.get('subject')).toBe('RENKAV — ELEVEN');
  expect(params.get('body')).toContain('Test & Example');
  expect(params.get('body')).toContain(
    'Plan a proposal & review the draft.\nKeep 100% of the context.',
  );
  await expect(page.locator('.form-result')).toContainText(
    'Nothing has been sent',
  );
  await expect(page.getByLabel('Email', { exact: true })).toHaveValue(
    'visitor@example.com',
  );
  expect(externalRequests).toEqual([]);
});

test('copy email uses the actual contact address', async ({
  page,
  context,
}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/contact');
  await page.getByRole('button', { name: 'Copy email' }).click();
  await expect(page.locator('[data-copy-status]')).toHaveText(
    'Email address copied.',
  );
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    'gitanshu@renkav.online',
  );
});

test('3D renders, pauses, and click-sound preference persists', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page.locator('[data-orbit]')).toHaveClass(/is-rendered/);
  const canvas = page.locator('[data-orbit] canvas');
  const before = await canvas.screenshot();
  await page.waitForTimeout(350);
  const after = await canvas.screenshot();
  expect(before.equals(after)).toBe(false);
  await page.locator('.orbital-art [data-motion-toggle]').click();
  await expect(
    page.locator('.orbital-art [data-motion-toggle]'),
  ).toHaveAttribute('aria-pressed', 'true');
  const paused = await canvas.screenshot();
  await page.waitForTimeout(200);
  expect(paused.equals(await canvas.screenshot())).toBe(true);
  await page.getByRole('button', { name: 'Mute click sounds' }).click();
  await expect(
    page.getByRole('button', { name: 'Enable click sounds' }),
  ).toHaveAttribute('aria-pressed', 'false');
  await page.goto('/ventures');
  await expect(
    page.getByRole('button', { name: 'Enable click sounds' }),
  ).toHaveAttribute('aria-pressed', 'false');
  await expect(page.locator('.orbital-art [data-motion-toggle]')).toBeVisible();
  expect(errors).toEqual([]);
});

test('reduced motion keeps all content available with a static sculpture', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');
  await expect(page.locator('.header-motion-toggle')).toHaveAttribute(
    'aria-label',
    'Enable animations',
  );
  await expect(page.locator('[data-orbit]')).toHaveClass(/is-rendered/);
  expect(
    await page
      .locator('.entry')
      .first()
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe('none');
  const canvas = page.locator('[data-orbit] canvas');
  const first = await canvas.screenshot();
  await page.waitForTimeout(150);
  expect(first.equals(await canvas.screenshot())).toBe(true);
});

test('unsupported WebGL retains artwork and usable navigation', async ({
  page,
}) => {
  await page.addInitScript(() => {
    const getContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      ...args: Parameters<typeof getContext>
    ) {
      if (String(args[0]).startsWith('webgl')) return null;
      return getContext.apply(this, args);
    } as typeof getContext;
  });
  await page.goto('/');
  await expect(page.locator('[data-orbit] canvas')).toBeHidden();
  await expect(page.locator('.orbit-fallback')).toBeVisible();
  const ring = page.locator('.orbit-fallback i').first();
  const before = await ring.evaluate((el) => getComputedStyle(el).transform);
  await page.waitForTimeout(200);
  expect(await ring.evaluate((el) => getComputedStyle(el).transform)).not.toBe(
    before,
  );
  await page.locator('.header-motion-toggle').click();
  const paused = await ring.evaluate((el) => getComputedStyle(el).transform);
  await page.waitForTimeout(200);
  expect(await ring.evaluate((el) => getComputedStyle(el).transform)).toBe(
    paused,
  );
  await expect(
    page.getByRole('link', { name: 'Explore ELEVEN', exact: true }),
  ).toBeVisible();
});

test('unknown routes return a real 404 with recovery navigation', async ({
  page,
}) => {
  const response = await page.goto('/this-page-does-not-exist');
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole('heading', { name: 'Page not found.' }),
  ).toBeVisible();
  await page.getByRole('link', { name: 'Back to RENKAV' }).click();
  await expect(page).toHaveURL('/');
});

test('click feedback produces audio only after interaction and respects mute', async ({
  page,
}) => {
  await page.addInitScript(() => {
    const start = OscillatorNode.prototype.start;
    OscillatorNode.prototype.start = function (when?: number) {
      document.documentElement.dataset.audioClicks = String(
        Number(document.documentElement.dataset.audioClicks || 0) + 1,
      );
      return start.call(this, when);
    };
  });
  await page.goto('/contact');
  expect(
    await page.locator('html').getAttribute('data-audio-clicks'),
  ).toBeNull();
  await page.getByRole('button', { name: 'Open email draft' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-audio-clicks', '1');
  await page.getByRole('button', { name: 'Mute click sounds' }).click();
  await page.getByRole('button', { name: 'Open email draft' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-audio-clicks', '1');
  await page.getByRole('button', { name: 'Enable click sounds' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-audio-clicks', '2');
});

test('without JavaScript, direct contact works and the draft form cannot submit a GET request', async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/contact');
  await expect(page.locator('#contact-form')).toBeHidden();
  await expect(
    page.getByRole('link', { name: 'Email Gitanshu' }),
  ).toHaveAttribute('href', 'mailto:gitanshu@renkav.online');
  await context.close();
});

test('scroll assembles the 3D layers and rotates the ELEVEN sculpture', async ({
  page,
}) => {
  await page.goto('/');
  const eleven = page.locator('.eleven-object');
  const before = await eleven.evaluate((el) => el.style.transform);
  await eleven.scrollIntoViewIfNeeded();
  await expect
    .poll(() => eleven.evaluate((el) => el.style.transform))
    .not.toBe(before);
  const scene = page.locator('[data-continuity]');
  const layer = page.locator('[data-layer="2"]');
  await scene.evaluate((el) =>
    window.scrollTo({
      top: (el as HTMLElement).offsetTop - 86,
      behavior: 'instant',
    }),
  );
  await expect(page.locator('[data-scene-count]')).toHaveText('01 / 03');
  const exploded = await layer.evaluate((el) => el.style.transform);
  await scene.evaluate((el) =>
    window.scrollTo({
      top:
        (el as HTMLElement).offsetTop -
        86 +
        el.clientHeight -
        (innerHeight - 86),
      behavior: 'instant',
    }),
  );
  await expect(page.locator('[data-scene-count]')).toHaveText('03 / 03');
  expect(await layer.evaluate((el) => el.style.transform)).not.toBe(exploded);
  await page.locator('.header-motion-toggle').click();
  const paused = await layer.evaluate((el) => el.style.transform);
  await page.mouse.wheel(0, -400);
  await page.waitForTimeout(250);
  expect(await layer.evaluate((el) => el.style.transform)).toBe(paused);
});

test('a visitor can explicitly enable animations while the system prefers reduced motion', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');
  await page.locator('.header-motion-toggle').click();
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'on');
  await expect(page.locator('[data-orbit]')).toHaveAttribute(
    'data-renderer',
    'webgl',
  );
  const canvas = page.locator('[data-orbit] canvas');
  const before = await canvas.screenshot();
  await page.waitForTimeout(400);
  expect(before.equals(await canvas.screenshot())).toBe(false);
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'on');
});

# RENKAV website

A five-page, statically generated Astro + TypeScript website based on the RENKAV design and content specification. Three.js renders the original orbital sculpture; the remaining interactions use native browser APIs and CSS. No external fonts, image services, analytics, or email backend are required.

## Develop

Use the existing `/workspace/Renkav-website` checkout. Cloud tasks are isolated already; create a Git worktree only if explicitly requested.

Requires Node.js 22.12+ (validated with Node.js 24) and npm.

```sh
cd /workspace/Renkav-website
npm ci
npm run dev
```

The development server listens on port 4321. The published environment includes Node.js and Chromium. Astro telemetry is disabled by the package scripts.

## Validate

```sh
npm run build
npm run test:e2e
```

`build` runs strict Astro/TypeScript diagnostics, then creates `dist/`. The browser suite starts a production preview when needed. It uses `/usr/bin/chromium` if available, otherwise the Playwright-managed browser. On other machines run `npx playwright install chromium`, or set `PLAYWRIGHT_CHROMIUM_EXECUTABLE` to the installed browser path.

The suite covers all five routes at 320, 390, 768, 1024, and 1440 px; automated WCAG checks; menu navigation and keyboard dismissal; email validation, URI encoding, and clipboard copying; 3D rendering and pause; sound preference persistence; reduced motion; WebGL fallback; and actual HTTP 404 behavior.

```sh
npm run preview
```

Live servers must restart in a new cloud task; installed dependencies and generated files can be retained.

## Site structure

- `src/pages/`: Home, About, Ventures, Leadership, Contact, and 404.
- `src/layouts/Layout.astro`: shared navigation, metadata, and footer.
- `src/styles/global.css`: responsive layout and motion styles.
- `src/scripts/site.ts`: navigation, click sounds, reveals, and the local email-draft form.
- `src/scripts/orbit.ts`: lazily loaded procedural 3D artwork with visibly turning ring planes, pointer/scroll response, and cleanup.
- `src/scripts/depth.ts`: scroll-driven assembly of the context, intelligence, and control layers; ELEVEN sculpture rotation; decorative portrait depth.
- `src/scripts/motion.ts`: shared motion preference and controls. Reduced motion is the default when requested by the operating system; a visitor can explicitly enable it. CSS fallback artwork also animates when WebGL is unavailable.

The form generates a `mailto:` URI to `gitanshu@renkav.online`. It does not submit, store, or log visitor values. An installed email handler is needed to open the draft. A direct address and copy control provide a webmail fallback. Sound is generated only following an interaction, with a mute preference saved locally. Motion also has a saved pause preference, respects reduced-motion settings, and stops rendering offscreen or in a hidden tab. Without WebGL, animated CSS artwork remains visible. The header motion control pauses or enables all decorative motion, including the scroll scene and CSS fallback.

## Draft and release status

The website remains a local draft: all pages have `noindex, nofollow` and `robots.txt` blocks indexing. No domain, DNS, email-routing, or hosting changes have been made. ELEVEN is explicitly presented as a prototype in development. Founder initials and confirmed names/roles are used without invented portraits or unapproved biographies.

The monogram is an original draft treatment, not a claim of an approved or registered trademark. Confirm the brand treatment, copy, founder details, canonical hostname, and actual hosting/privacy practices before public launch. At that point configure absolute canonical/social URLs, a host-specific sitemap, a broadly supported PNG social image, and a privacy notice based on the actual services used. Remove draft indexing restrictions only for the approved public release.

Deploy the `dist/` directory only when authorized. Configure the chosen static host to serve generated directory routes and `404.html` with a 404 status (do not use an SPA catch-all that returns 200 for unknown routes).

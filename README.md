# RENKAV Technologies

An upgraded Next.js company website with an original CSS 3D orbital sculpture, locally served variable typography, accessible navigation, and a privacy-conscious email-draft workflow.

## Run

Use Node.js 22 or later and npm.

```sh
npm ci
npm run dev
```

For production validation:

```sh
npm run typecheck
npm run build
npm run test:smoke
npm start
```

The smoke test briefly starts a production server on loopback port 31479 and stops it afterward. Ensure that port is free. The regular development/production site uses port 3000.

## Design

- Original layered CSS 3D sculpture with metallic rings, shaded core, satellite details, perspective and restrained pointer tilt. No WebGL library, remote asset, or render loop.
- Inter body text and Manrope display type, self-hosted through `next/font/local`; the two variable Latin font files are preloaded with font-display swap.
- Dark ink, restrained mint, warm paper, editorial headings and coordinated spacing across six pages.
- Finite entrance animation; no continuous ambient movement. OS reduced-motion settings and the footer's persistent Reduce motion setting disable animation and 3D tilt. Touch input does not drive tilt.
- Cards and buttons have restrained interaction feedback. Content remains visible without animation or IntersectionObserver.

## Pages

`/`, `/about`, `/ventures`, `/leadership`, `/contact` (plus `/privacy` draft route, custom 404 with routes to `/` and `/ventures`, and route error recovery).

Company content follows the 13 November 2026 Design & Copy Handoff Specification: ELEVEN is presented as an AI assistant and Intelligence Operating System prototype in development, and leadership cards present Gitanshu Damade (Founder) and Yashika Pawar (Co-founder) with initials in place of unapproved portraits.

## Security and privacy

- A per-request CSP nonce authorizes Next.js scripts; production disallows unsafe-eval, framing, plugins, external connections and native form submission.
- `proxy.ts` forwards CSP to Next.js so framework scripts receive matching nonces. Documents are dynamically rendered and marked private/no-store. **Run with a Next.js-compatible server; do not convert this implementation to a static export or cache document HTML.**
- Inline styles remain permitted because CSS transforms and framework-generated styles require them. Scripts use nonces, not unsafe-inline.
- nosniff, no-referrer, restricted Permissions-Policy, same-origin opener policy, frame denial and noindex response headers are configured.
- The form validates required fields, rejects whitespace-only names/messages, bounds lengths and percent-encodes mailto parameters. It does not post to a backend or claim delivery. Long URLs fall back to a copyable draft. Clipboard failures offer manual selection.
- No application analytics, tracking cookies, third-party embeds, form storage or third-party font requests. Only a motion preference is persisted. Hosting logs and email-provider handling are separate; see `/privacy`.
- Dependency lockfile included. React updated; a scoped minimatch override fixes the moderate development-tool advisory GHSA-g3hv-75wg-m249. Node 22+ supports its runtime requirements. Revisit this override when typescript-eslint adopts the patched version.

## Validation

See `VALIDATION.md` for completed checks and remaining browser review. Source is formatted for maintainability. `npm run lint` remains available for contributors.

## Deployment handoff

This delivery is source code, not a verified live deployment. No DNS or mail settings are changed. Use a Node-capable Next.js host or an explicitly tested compatible adapter. Configure HTTPS and HSTS at the host after validating domain/TLS behavior. Keep noindex until the company details, privacy terms, biographies and branding are approved for publication. Update metadataBase/Open Graph URLs if the intended public domain changes.

Hosting-side controls, logs/retention, contact-email handling, backups, monitoring, browser accessibility review and a continuing patch process must be assessed for the selected deployment. Application hardening is not a penetration-test certification.

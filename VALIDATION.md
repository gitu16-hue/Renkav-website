# Validation and handoff

Validated on 13 November 2026 with Node.js 24.22.1 and Next.js 16.4.6 against the 13 November 2026 Design & Copy Handoff Specification.

## Completed

- TypeScript strict type check (`npm run typecheck`) — 0 errors.
- ESLint check (`npm run lint`) — 0 errors.
- Optimized production build (`npm run build`) of all routes (`/`, `/about`, `/ventures`, `/leadership`, `/contact`, `/privacy`), custom 404, icon and request proxy.
- Production HTTP smoke suite (`npm run test:smoke`): successful page responses, exactly one H1 per page, updated handoff headlines and sections, skip link, motion control, local asset responses, 404 response.
- Security smoke assertions on every page: unique per-response nonce, every script nonce matches CSP, no production unsafe-eval, framing denied, form-action disabled, nosniff, no-referrer, document caching disabled, no framework identification header, draft noindex retained.
- Browser review (`http://127.0.0.1:3000`) at desktop (`1440×900`) and mobile (`390×844`) viewports across `/`, `/about`, `/ventures`, `/leadership`, `/contact` and 404:
  - Zero horizontal overflow (`scrollWidth <= clientWidth`).
  - Mobile stacking order verified (Hero copy/CTAs above 3D sculpture, ELEVEN copy above wordmark panel on `/`, Mission above Vision on `/about`, Gitanshu Damade above Yashika Pawar on `/leadership`, direct email & inquiry prompts above form on `/contact`).
  - Mobile navigation menu toggle, `Escape` dismissal and focus return verified.
  - Contact form inline validation (`"Enter a valid email address."` while preserving field values) and draft preparation flow (`Open email draft`, `#contact-draft` output, and non-submission status message) verified without sending an email.

## Scope & remaining owner approvals

- External product URL for the `Visit the ELEVEN website` button on `/ventures` is wired via `NEXT_PUBLIC_ELEVEN_URL` in `app/ventures/page.tsx` and remains hidden until a verified public URL is configured.
- No live deployment, DNS change, real email submission, backend storage or production-domain validation. Privacy text accurately distinguishes application handling from hosting logs and email processing; owner-specific legal and retention information remains to be confirmed before linking `/privacy` in the public footer.

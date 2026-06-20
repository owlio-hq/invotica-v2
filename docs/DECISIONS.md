# Decision Log (ADR-lite)

Short records of meaningful choices. Newest first.

---

### ADR-006 — Static output, no SSR adapter (for now)
**Decision:** `output: "static"`; deploy `dist/` to Netlify via `netlify.toml`. No
SSR adapter.
**Why:** The contact form is client-side (Web3Forms); nothing needs a server.
Static = lightest payload + best Lighthouse. Adapter can be added later for only
the routes that need it.

### ADR-005 — Skiper UI as lazy React islands
**Decision:** Use Skiper UI (React + Motion) for 1–3 showcase moments only,
hydrated with `client:visible`.
**Why:** Skiper's polish is worth it for hero/showcase, but loading React on every
page would break the "loads light" requirement. Islands isolate the cost.

### ADR-004 — Production trace logger over a heavy APM
**Decision:** Custom `src/lib/logger.ts` with per-session traceId, ring buffer,
global error capture, and a Sentry-ready `report()` hook (off by default).
**Why:** Gives real production debuggability with ~0kb cost. Sentry can be switched
on later via the existing hook without code churn.

### ADR-003 — Fonts: Fraunces (display) + Geist (body), self-hosted
**Decision:** Variable fonts via `@fontsource-variable`, no Google Fonts CDN.
**Why:** Premium editorial pairing; self-hosting removes a render-blocking external
request and improves privacy + speed. Both free for commercial use.

### ADR-002 — Tailwind v4 (CSS-first)
**Decision:** Tailwind v4 with `@theme` tokens in `global.css` via the Vite plugin.
**Why:** Faster builds, design tokens and utilities defined in one place, smallest
output. Brand palette becomes first-class utilities (`bg-forest`, `text-terracotta`).

### ADR-001 — Astro (MPA) over Next.js
**Decision:** Build the marketing site on Astro.
**Why:** Requirement is an ultra-light, multi-page (non-SPA) marketing site. Astro
ships near-zero JS and is a true MPA. Next.js (React-first, heavier) is reserved for
the future product app, kept separate so it never weighs down marketing pages.

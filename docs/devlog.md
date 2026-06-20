# Dev Log

Human-readable narrative of what was built and why. Newest entries at the bottom
of each day. Pair with `git log` for the precise diff history.

---

## 2026-06-21 — Project kickoff

**Scaffolding & foundations**
- Initialised the project: Astro 5 (static MPA) + Tailwind v4 (CSS-first) + React
  island support for Skiper UI. Node 24 / npm 11.
- Stack rationale recorded in `DECISIONS.md` (ADR-001/002). Astro chosen for an
  ultra-light, true multi-page (non-SPA) marketing site; future auth/payments stay
  separate so they never weigh down marketing pages.
- Config: `astro.config.mjs` (static output, viewport prefetch, sitemap, React,
  Tailwind Vite plugin), `tsconfig.json` (strict + `@/*` alias), `netlify.toml`
  (static publish + cache headers + security headers), `.gitignore`.

**Brand system**
- Extracted brand palette from `logo.jpeg`: forest `#214239`, sage `#4B6460`,
  terracotta `#C35F3B`. Canvas `#F7F4F0` + ink `#161718` from the reference site.
- `src/styles/global.css`: Tailwind v4 `@theme` tokens (colors, fonts, fluid type
  scale, easings), base layer (typography, focus rings, reduced-motion handling),
  reusable `.container-x` / `.section-y` / `.eyebrow` helpers, scroll-reveal styles
  that fail open for no-JS / reduced-motion users.
- Fonts: Fraunces (display) + Geist (body), self-hosted variable fonts.

**Observability**
- `src/lib/logger.ts`: production trace logger — per-session traceId, ring buffer,
  localStorage persistence, global error + unhandledrejection capture, Sentry-ready
  sink (off by default). `window.__invotica.dump()` for live prod debugging.
- Docs: `ARCHITECTURE.md`, `DECISIONS.md`, `LOGGING.md`, this `devlog.md`.
- `src/lib/cn.ts`: class-merge util for Skiper React components.

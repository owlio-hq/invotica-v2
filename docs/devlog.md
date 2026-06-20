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

**Pages & sections**
- Core shell: `Base.astro` layout (SEO/OG/Twitter/JSON-LD, skip link, favicon),
  sticky frosted `Nav`, full-screen animated `MenuOverlay` (CSS clip-path reveal
  + staggered links, focus trap, Esc to close, scroll lock), forest `Footer` with
  giant wordmark. UI primitives: `Button`, `SectionLabel`, `PlanCard`, `FinalCTA`.
- Home: Hero (typewriter via `data-typewriter` + floating brand shapes + sweep
  line), MarqueeBelt (pure CSS), TheProblem, TheNumbers (vanilla count-up),
  RealDifference, Process, PlanTeasers, OurWork, Guarantee, About, CrowdStrip,
  FinalCTA.
- Pricing: detailed plan cards (full mode), comparison matrix (`comparison` in
  site.ts), no-JS `<details>` FAQ accordion, FinalCTA.
- Contact: intro + details + guarantees, `ContactForm` (Web3Forms AJAX submit,
  honeypot, inline status, logger-instrumented). Branded 404 page.

**Decisions / deviations from plan (flagged)**
- Scroll reveals use native **IntersectionObserver**, not GSAP → removed the
  `gsap` dependency entirely (lighter, no unused code). Motion still powers the
  one React island.
- Skipped Astro View Transitions / ClientRouter to keep the site a *genuine* MPA
  (full page loads, not SPA-style client routing); `prefetch` keeps nav instant.
- `output: static` (no Netlify SSR adapter) — form is client-side, nothing needs
  a server. See ADR-006.

**Verification (all green)**
- `astro check`: 0 errors, 0 warnings (1 inline-script hint, expected).
- `npm run build`: 4 pages. Initial JS ≈ 8 kB gz; React showcase (~100 kB gz)
  loads only on scroll via `client:visible`.
- Live checks in preview: body bg `#F7F4F0`, Fraunces headings, menu open/close,
  typewriter running, React island hydrates (5 cards), all routes 200 + 404 page
  serves. No console errors.

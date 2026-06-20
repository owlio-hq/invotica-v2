# Invotica — Marketing Website

High-end, **static multi-page** marketing site for Invotica. Built for premium
design **and** instant loading.

- **Stack:** Astro 5 (static MPA) · Tailwind v4 · TypeScript
- **Motion:** Lenis smooth scroll · IntersectionObserver reveals · CSS animations
  · one lazy React/Motion island (the work showcase)
- **Fonts:** Fraunces (display) + Geist (body), self-hosted variable fonts
- **Pages:** Home · Pricing · Contact · 404

## Getting started
```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # → dist/  (static)
npm run preview    # preview the production build
npm run check      # type / diagnostics
```

## Configure before launch
Edit `src/data/site.ts` — the single source of truth for all copy/config:
- `email`, `phone`, `founder`, `social` — replace the DUMMY placeholders.
- `web3formsKey` — paste your free key from https://web3forms.com (powers the
  contact form). Until set, the form will show a friendly error on submit.
- `plans`, `comparison`, `faq` — DRAFT pricing/features; confirm before launch.

## Deploy (Netlify)
`netlify.toml` is preconfigured: build `npm run build`, publish `dist/`.
Push to a repo and connect it in Netlify — no adapter needed (fully static).

## Project docs
- `docs/ARCHITECTURE.md` — system design, folder map, render model, perf budget.
- `docs/DECISIONS.md` — why each major choice was made (ADR-lite).
- `docs/LOGGING.md` — production debugging runbook + the trace logger.
- `docs/devlog.md` — human narrative of what was built.

## Debugging in production
Open the browser console and run `window.__invotica.dump()` to get the full,
trace-id-stamped session log. See `docs/LOGGING.md`.

## Notes / placeholders (replace before launch)
- Founder name + story, contact email/phone are **DUMMY** values.
- "Our Work" uses placeholder concept cards (no real portfolio images yet).
- `og-image.svg` is a branded placeholder — swap for a 1200×630 PNG for best
  social-share compatibility.
- Social links are hidden until added to `site.social`.

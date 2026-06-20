# Invotica — Architecture

## What this is
A high-end, **static multi-page** marketing website for Invotica (custom websites
for Canadian businesses). Built to look premium and **load instantly**.

## Tech stack & why
| Concern | Choice | Why |
| --- | --- | --- |
| Framework | **Astro 5** (`output: static`) | True MPA — each page is its own HTML doc (not a SPA). Ships ~zero JS by default. |
| Styling | **Tailwind v4** (CSS-first `@theme`) | Tiny purged CSS, brand tokens in one place (`src/styles/global.css`). |
| Smooth scroll | **Lenis** (~3kb) | Buttery scroll; disabled under `prefers-reduced-motion`. |
| Scroll reveals | **GSAP + ScrollTrigger** (lazy) | Loaded only on pages that use it; reveals fail open. |
| "Wow" components | **Skiper UI** (React + Motion) | Loaded as **lazy React islands** (`client:visible`) on 1–3 sections only. |
| Typewriter / marquee / crowd | Hand-written CSS + tiny vanilla JS | No dependency, near-zero cost. |
| Fonts | **Fraunces** + **Geist** (self-hosted, variable) | Premium pairing, zero external requests. |
| Contact form | **Web3Forms** | Static, emails to inbox, no backend. |
| Hosting | **Netlify** (static `dist/`) | Free, fast, simple. |

## Render & JS model
- Every page renders to static HTML at build time.
- Default JS payload per page: **only Lenis + the page's scroll-reveal init**.
- React + Motion load **on demand** when a Skiper island scrolls into view
  (`client:visible`) — never on first paint, never on pages without one.
- `prefetch` (viewport strategy) warms the next page so navigation feels instant
  while staying a real MPA.

## Folder map
```
src/
  data/site.ts        # SINGLE source of truth: nav, plans, stats, contact, copy
  lib/
    logger.ts         # production trace logger (see LOGGING.md)
    cn.ts             # className merge util (Skiper components)
  layouts/Base.astro  # <head> SEO/OG, fonts, logger init, Nav, MenuOverlay, Footer, Lenis
  components/
    nav/              # Nav, MenuOverlay
    home/             # Hero, MarqueeBelt, TheProblem, ... CrowdStrip, FinalCTA
    ui/               # Button, SectionLabel, Reveal, Stat, Card
    skiper/           # React islands (the "wow" moments)
    Footer.astro
  scripts/            # typewriter.ts, scroll-reveal.ts, smooth-scroll.ts
  pages/              # index, pricing, contact, 404
  styles/global.css   # Tailwind import + @theme tokens + base layer
public/               # logo, favicons, og-image, robots.txt
docs/                 # this file + DECISIONS, devlog, LOGGING
```

## Data flow
All copy/config that repeats or may change lives in `src/data/site.ts`. Components
import from it — no hardcoded duplicated strings. Change a price or nav label once.

## Performance budget (targets)
- Lighthouse 95+ (Perf/A11y/Best/SEO).
- Initial JS < ~30kb gz; CSS < ~20kb gz.
- All decorative motion is CSS/SVG; React only where it earns its weight.

## Future: auth & payments
This repo stays the **marketing site**. When the product (user accounts, billing)
arrives, it lives either as Astro server routes (`output: server` + Netlify adapter
on those routes only) or as a separate app at `app.invotica.com`. The marketing
site's speed is never compromised by product code.

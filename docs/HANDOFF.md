# Invotica — Handoff / Restart Guide

**Starting a fresh session? Tell Claude: "read docs/HANDOFF.md".** This is the
single source of truth for what this project is, the design rules, and what the
user (Invotica owner) likes. Pair with `git log` + `docs/devlog.md` for history.

---

## What it is
- Marketing site for **Invotica** — custom websites for Canadian businesses.
- Stack: **Astro 5** (static MPA) + **Tailwind v4** (CSS-first `@theme` in
  `src/styles/global.css`) + a couple **React islands** (the walking-crowd canvas).
- Pages: Home, Pricing, Contact, 404.
- Repo: **github.com/owlio-hq/invotica-v2** (remote `origin`, branch `main`).
  **Commit + push after every change.** Co-author line: Claude.

## Brand / design rules — FOLLOW THESE
- **Palette (exact):** lime `#AFFE08`, bright royal blue `#0039C7`, white `#ffffff`
  (the dominant canvas), near-black `#0a0a0a` (used sparingly), deep green
  `#1a2a0d` (text on lime). Rough balance **45% white / 35% blue / 15% black /
  5% lime**. NO black/dark dominance.
- **Energy = bold agency:** big headings, lime "marker" highlight on key heading
  words, squiggle-underline **Kicker** labels (underline matches label width),
  hand-drawn squiggle arrows, frosted glass.
- **Hero:** full bright-blue, huge white headline, lime squiggle underline on the
  rotating typewriter word, floating frosted cards, rotating lime badge, grid
  texture. NO fade/opacity-on-scroll.
- **Nav:** borderless; transparent over the hero → **liquid-glass** bar on scroll.
  **Full-screen menu** (mobile AND desktop) with clip-path wipe + staggered links.
  Menu trigger is a clean "MENU ☰" (kept minimal).
- **Buttons:** ONE system — `.btn` in global.css. **Outline by default, fills
  solid on hover (colours invert), NO lift/pop, diagonal ↗ arrow.** Schemes:
  `btn-light` (dark/blue bg), `btn-lime`, `btn-dark` (light bg), `btn-blue`.
- **Cards:** static — no hover lift/pop anywhere.
- **Pricing:** One-time / Managed toggle (animated sliding indicator + dynamic
  explainer line + lime "Hands-off" tag). 3 plans Starter/Growth/Pro; Growth is
  the blue "MOST POPULAR" featured card. Plant icons grow seedling→plant→cluster.
- **Crowd canvas:** KEEP it. Desktop = default size; mobile = fewer + smaller +
  top-clamped (no cut heads).
- Consistent section spacing via `section-y`; gaps kept moderate.

## What the user likes / dislikes
- **Likes:** bold type, blue+lime, the CLOSE-button outline→fill hover (now the
  global button style), the glass nav, squiggle doodles, static cards.
- **Dislikes (all removed):** hover "pop"/lift on cards & buttons; generic lime
  pill labels (→ squiggle kickers); the dot-field hero & the preloader; the
  "$X/day" price framing; hero fade-on-scroll; anything that feels generic.
- **How to work with them:** act and verify, commit+push each change, give honest
  opinions / push back (don't just agree), ask when it's genuinely their call.

## TODO before launch
- **Contact form (FormSubmit):** delivers to `vasu.invotica@gmail.com`. The FIRST
  real submission triggers a one-time **activation email** to that inbox — click
  the link once, then submissions flow. (Optional: after activating, swap the
  email in the endpoint for FormSubmit's random alias to hide it from scrapers.)
- **Domain:** when the real domain is connected, update `site` in
  `astro.config.mjs`, `url`/`domain` in `src/data/site.ts`, and the Sitemap URL in
  `public/robots.txt` (all currently `invotica.com`).
- **Real contact details are set:** email `vasu.invotica@gmail.com`, phone
  `+1 (403) 431-8228` (tel: links + JSON-LD wired).
- Hero stats (14 / 100% / 2 wk) + Numbers stats are placeholder claims — confirm.
- Managed prices + setup fees are DRAFTS — confirm.
- `public/og-image.svg` is a placeholder — social previews need a real **1200×630
  PNG** (SVG OG images don't render on most platforms).
- Founder/About section is hidden (commented out in `index.astro`).
- Payments not built — all plan CTAs route to the contact form for now.
- Logo files: `public/logo-white.svg` (on dark), `public/logo-black.svg` (on
  light), `public/favicon.svg` (blue app tile).

## Run / deploy
- Dev: in the project folder run `npm run dev` → http://localhost:4321
  (only ONE process can hold port 4321 at a time).
- Build: `npm run build` (static output, no server needed).

## If the context window fills up
- It auto-compacts (summarises) and keeps going — nothing is lost.
- For a clean restart: `/clear`, then "read docs/HANDOFF.md". Git history +
  `docs/devlog.md` hold the full record.

# Logging & Production Debugging Runbook

The goal: when a bug appears in production, find **where** and **when** fast —
not a needle-in-a-haystack hunt.

## The trace logger (`src/lib/logger.ts`)
Initialised once in `Base.astro` for every page. Each browser session gets a
short **traceId**. Every log line and every captured error is stamped with that
traceId + the page path + a component "scope" tag.

### Levels
`debug` → `info` → `warn` → `error`. In dev, all show in the console. In prod,
only `warn`/`error` print, but **all** levels are kept in an in-memory ring buffer
(last 200 entries) and persisted to `localStorage` so they survive a reload.

### Using it in code
```ts
import { logger } from "@/lib/logger";

logger.info("Hero", "typewriter started", { phrases: 3 });
logger.warn("ContactForm", "honeypot tripped");
logger.error("ContactForm", "submit failed", { status: 500 });
```
Always pass a **scope** (component name) as the first arg — that's how you locate
the failing piece.

## Reproducing a production bug — step by step
1. Ask the user to reproduce, then open DevTools → Console.
2. Run:
   ```js
   window.__invotica.dump()
   ```
   You get the ordered list of everything that happened this session (with the
   traceId, page, scope, message, data). The last `error` entries point at the
   failing component + line/stack.
3. The same data is in `localStorage` under `invotica:trace` (survives reloads).
   Copy it out for a bug report.
4. To reset: `window.__invotica.clear()`.

## What's captured automatically
- Uncaught errors (`window.onerror`) — message, file, line, col, stack.
- Unhandled promise rejections — reason + stack.
Both are recorded at `error` level with full context.

## Turning on a real backend (Sentry) later
The logger has a Sentry-ready sink. To enable:
```ts
import { logger } from "@/lib/logger";
import * as Sentry from "@sentry/browser"; // add dependency

Sentry.init({ dsn: import.meta.env.PUBLIC_SENTRY_DSN });
logger.configure({
  report: true,
  onReport: (entry) =>
    Sentry.captureMessage(entry.message, {
      level: entry.level,
      tags: { scope: entry.scope, traceId: entry.traceId, page: entry.page },
      extra: { data: entry.data },
    }),
});
```
No other code changes needed — every `logger.error(...)` already flows to the sink.

## Build & dev logs
- `npm run dev` / `npm run build` print Astro's build diagnostics to the terminal.
- To archive a build log: `npm run build > logs/build-$(date +%F).log 2>&1`
  (`logs/` is git-ignored).

## Git as a trace
Commits are atomic + conventional (`feat(...)`, `fix(...)`, `chore(...)`), so
`git log` and `git blame <file>` tell you exactly when any line/section was
introduced or changed. See `docs/devlog.md` for the human narrative.

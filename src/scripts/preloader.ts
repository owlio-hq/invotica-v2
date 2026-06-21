/**
 * Preloader controller — plays the "stairs" reveal on every page load.
 *
 * Flow: lock scroll → fade the brand mark in → wait for `window.load` (capped by
 * a max timeout so a slow asset never traps the user) → climb the columns away →
 * remove the node and unlock scroll. Skipped only for no-JS / reduced-motion.
 */
import { logger } from "@/lib/logger";

const MIN_VISIBLE = 650; // keep the mark on screen at least this long (ms)
const MAX_WAIT = 2600; // never hold the page hostage longer than this (ms)

export function initPreloader(): void {
  const el = document.getElementById("preloader");
  const root = document.documentElement;

  if (!el) {
    root.classList.remove("is-loading");
    return;
  }

  root.classList.add("is-loading");
  // next frame so the fade-in transition actually runs
  requestAnimationFrame(() => el.classList.add("pl-in"));

  const start = performance.now();
  let done = false;

  const finish = () => {
    if (done) return;
    done = true;

    const elapsed = performance.now() - start;
    const wait = Math.max(0, MIN_VISIBLE - elapsed);

    window.setTimeout(() => {
      el.classList.remove("pl-in");
      el.classList.add("pl-out");

      const cleanup = () => {
        el.remove();
        root.classList.remove("is-loading");
        logger.info("preloader", "revealed", { elapsed: Math.round(elapsed) });
      };

      // last column has the longest stagger; clean up after it settles
      const last = el.querySelector<HTMLElement>(".pl-col:last-child");
      if (last) {
        last.addEventListener("transitionend", cleanup, { once: true });
        window.setTimeout(cleanup, 1400); // safety net
      } else {
        window.setTimeout(cleanup, 800);
      }
    }, wait);
  };

  if (document.readyState === "complete") {
    finish();
  } else {
    window.addEventListener("load", finish, { once: true });
    window.setTimeout(finish, MAX_WAIT); // hard cap
  }
}

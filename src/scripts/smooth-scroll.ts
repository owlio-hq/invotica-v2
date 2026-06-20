import Lenis from "lenis";
import { logger } from "@/lib/logger";

/** Initialise Lenis smooth scrolling, unless the user prefers reduced motion. */
export function initSmoothScroll(): Lenis | null {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    logger.debug("smooth-scroll", "skipped (prefers-reduced-motion)");
    return null;
  }

  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.6,
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Make in-page anchor links use Lenis for a smooth glide.
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target as HTMLElement, { offset: -80 });
      }
    });
  });

  logger.debug("smooth-scroll", "Lenis initialised");
  return lenis;
}

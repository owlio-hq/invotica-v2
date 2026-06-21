/**
 * Client entry point — imported once by Base.astro.
 * Wires up the logger, smooth scroll, reveals, count-ups, typewriter, and menu.
 * Each module is defensive and no-ops when its target elements are absent.
 */
import { logger } from "@/lib/logger";
import { initPreloader } from "./preloader";
import { initSmoothScroll } from "./smooth-scroll";
import { initReveal } from "./reveal";
import { initCountUp } from "./count-up";
import { initTypewriter } from "./typewriter";
import { initMenu } from "./menu";

function boot() {
  // Swap no-js → js so CSS can trust that JS ran.
  document.documentElement.classList.remove("no-js");
  document.documentElement.classList.add("js");

  logger.install();

  try {
    initPreloader();
    initSmoothScroll();
    initReveal();
    initCountUp();
    initTypewriter();
    initMenu();
  } catch (err) {
    logger.error("main", "boot failed", { err: (err as Error)?.message });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}

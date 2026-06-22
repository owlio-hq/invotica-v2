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
import { initScrollFx } from "./scroll-fx";
import { initDotField } from "./dotfield";
import type Lenis from "lenis";

function boot() {
  // Swap no-js → js so CSS can trust that JS ran.
  document.documentElement.classList.remove("no-js");
  document.documentElement.classList.add("js");

  logger.install();

  // Run each init in isolation so one failure never takes down the others
  // (e.g. a preloader hiccup must not break the menu). scrollFx runs after
  // smoothScroll so it can sync ScrollTrigger to the live Lenis instance.
  let lenis: Lenis | null = null;
  const steps: [string, () => void][] = [
    ["preloader", initPreloader],
    ["smoothScroll", () => { lenis = initSmoothScroll(); }],
    ["reveal", initReveal],
    ["countUp", initCountUp],
    ["typewriter", initTypewriter],
    ["menu", initMenu],
    ["dotField", initDotField],
    ["scrollFx", () => initScrollFx(lenis)],
  ];
  for (const [name, fn] of steps) {
    try {
      fn();
    } catch (err) {
      logger.error("main", `init failed: ${name}`, { err: (err as Error)?.message });
    }
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}

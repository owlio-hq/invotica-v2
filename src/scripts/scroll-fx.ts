/**
 * Immersive scroll motion — GSAP + ScrollTrigger, synced to Lenis.
 *
 * Opt-in via data attributes so it never fights the lightweight [data-reveal]
 * fades (reveal.ts). Everything is scrubbed/eased and subtle — the page should
 * feel alive, not busy. Fully skipped under prefers-reduced-motion (the markup
 * stays in its natural, fully-visible state).
 *
 *   data-fx="hero"        recede + fade the hero as it scrolls away (depth)
 *   data-fx="parallax"    drift on scroll; tune with data-fx-speed (default .2)
 *   data-fx="expand"      scale/opacity up as the element enters (cards "open")
 *   data-fx="stagger"     children rise in one after another (once)
 *   data-fx="draw"        horizontal line draws in (scaleX 0→1, once)
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

export function initScrollFx(lenis: Lenis | null): void {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!("IntersectionObserver" in window)) return;

  gsap.registerPlugin(ScrollTrigger);

  // Keep ScrollTrigger in lockstep with Lenis' smoothed scroll position.
  if (lenis) lenis.on("scroll", ScrollTrigger.update);

  // --- Parallax drift --------------------------------------------------------
  gsap.utils.toArray<HTMLElement>("[data-fx='parallax']").forEach((el) => {
    const speed = Number(el.dataset.fxSpeed ?? 0.2);
    gsap.to(el, {
      yPercent: -speed * 100,
      ease: "none",
      scrollTrigger: {
        trigger: el.closest("section") ?? el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  // --- Expand: cards/blocks open up as they enter ----------------------------
  gsap.utils.toArray<HTMLElement>("[data-fx='expand']").forEach((el) => {
    gsap.fromTo(
      el,
      { scale: 0.94, opacity: 0.5, yPercent: 4 },
      {
        scale: 1,
        opacity: 1,
        yPercent: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 92%",
          end: "top 55%",
          scrub: 0.6,
        },
      },
    );
  });

  // --- Stagger: children rise in sequence ------------------------------------
  gsap.utils.toArray<HTMLElement>("[data-fx='stagger']").forEach((group) => {
    gsap.from(Array.from(group.children), {
      y: 48,
      opacity: 0,
      duration: 0.85,
      ease: "power3.out",
      stagger: 0.12,
      scrollTrigger: { trigger: group, start: "top 82%", once: true },
    });
  });

  // --- Draw: horizontal connector line scales in -----------------------------
  gsap.utils.toArray<HTMLElement>("[data-fx='draw']").forEach((el) => {
    gsap.fromTo(
      el,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "bottom 60%",
          scrub: 0.8,
        },
      },
    );
  });

  // Recalculate once the first layout settles, and again once fonts/images load.
  requestAnimationFrame(() => ScrollTrigger.refresh());
  window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
}

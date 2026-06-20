/**
 * Animate numeric stats when they scroll into view. Vanilla, no dependency.
 * Usage: <span data-count="81" data-suffix="%">81%</span>
 * Non-numeric stats (e.g. "2x", "SEO Ready") are left untouched.
 */
export function initCountUp(): void {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const els = document.querySelectorAll<HTMLElement>("[data-count]");
  if (!els.length || reduce || !("IntersectionObserver" in window)) return;

  const io = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        const target = Number(el.dataset.count);
        const suffix = el.dataset.suffix ?? "";
        if (Number.isNaN(target)) {
          obs.unobserve(el);
          continue;
        }
        const duration = 1100;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
          el.textContent = Math.round(target * eased) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.unobserve(el);
      }
    },
    { threshold: 0.5 },
  );

  els.forEach((el) => io.observe(el));
}

/**
 * Lightweight scroll-reveal using the native IntersectionObserver — no library.
 * Elements with [data-reveal] fade/slide in once. Honors prefers-reduced-motion
 * and fails open (CSS shows everything if JS never runs).
 *
 * Optional: [data-reveal-delay="120"] adds a stagger in ms.
 */
export function initReveal(): void {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
  if (!els.length) return;

  if (reduce || !("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        const delay = Number(el.dataset.revealDelay ?? 0);
        window.setTimeout(() => el.classList.add("is-visible"), delay);
        obs.unobserve(el);
      }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
  );

  els.forEach((el) => io.observe(el));
}

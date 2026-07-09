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
    // Positive bottom margin pre-reveals elements ~25% of a viewport BEFORE they
    // scroll into view, so fast scrolling never lands on a blank section.
    // threshold 0 = fire on the first pixel.
    { rootMargin: "0px 0px 25% 0px", threshold: 0 },
  );

  // Immediately reveal anything already in the viewport on load — otherwise
  // above-the-fold elements (esp. on mobile) stay hidden until the user scrolls.
  const vh = window.innerHeight || document.documentElement.clientHeight;
  els.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < vh && rect.bottom > 0) {
      el.classList.add("is-visible");
    } else {
      io.observe(el);
    }
  });
}

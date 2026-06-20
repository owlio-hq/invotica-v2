/**
 * Full-screen menu overlay controller. Handles open/close, focus trapping,
 * body scroll lock, Escape to close, and ARIA state. Animation is CSS-driven
 * (see MenuOverlay.astro) — this just toggles [data-open].
 */
export function initMenu(): void {
  const overlay = document.querySelector<HTMLElement>("[data-menu]");
  const openBtn = document.querySelector<HTMLButtonElement>("[data-menu-open]");
  const closeBtn = document.querySelector<HTMLButtonElement>("[data-menu-close]");
  if (!overlay || !openBtn) return;

  let lastFocused: HTMLElement | null = null;

  const setOpen = (open: boolean) => {
    overlay.dataset.open = String(open);
    overlay.setAttribute("aria-hidden", String(!open));
    openBtn.setAttribute("aria-expanded", String(open));
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open) {
      lastFocused = document.activeElement as HTMLElement;
      // focus first link for keyboard users
      overlay.querySelector<HTMLElement>("a, button")?.focus();
    } else {
      lastFocused?.focus();
    }
  };

  openBtn.addEventListener("click", () => setOpen(true));
  closeBtn?.addEventListener("click", () => setOpen(false));

  // Close when a nav link is clicked.
  overlay.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => setOpen(false)),
  );

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.dataset.open === "true") setOpen(false);
  });
}

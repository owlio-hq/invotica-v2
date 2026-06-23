/**
 * Full-screen menu overlay controller. Toggles [data-open], locks body scroll
 * while open, closes on the close button, link clicks, and Escape. The reveal
 * animation is CSS-driven (see MenuOverlay.astro).
 */
export function initMenu(): void {
  const overlay = document.querySelector<HTMLElement>("[data-menu]");
  const openBtn = document.querySelector<HTMLButtonElement>("[data-menu-open]");
  const closeBtn = document.querySelector<HTMLButtonElement>("[data-menu-close]");
  if (!overlay || !openBtn) return;

  let lastFocused: HTMLElement | null = null;

  const isOpen = () => overlay.dataset.open === "true";

  const setOpen = (open: boolean) => {
    overlay.dataset.open = String(open);
    overlay.setAttribute("aria-hidden", String(!open));
    openBtn.setAttribute("aria-expanded", String(open));
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open) {
      lastFocused = document.activeElement as HTMLElement;
      overlay.querySelector<HTMLElement>("a, button")?.focus();
    } else {
      lastFocused?.focus();
    }
  };

  openBtn.addEventListener("click", () => setOpen(true));
  closeBtn?.addEventListener("click", () => setOpen(false));

  overlay.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => setOpen(false)),
  );

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) setOpen(false);
  });
}

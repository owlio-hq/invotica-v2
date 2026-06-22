/**
 * Compact menu dropdown controller. Toggles [data-open] on the panel + backdrop,
 * closes on link click, outside click, and Escape. Animation is CSS-driven
 * (see MenuOverlay.astro). No scroll lock — it's a small anchored card.
 */
export function initMenu(): void {
  const panel = document.querySelector<HTMLElement>("[data-menu]");
  const backdrop = document.querySelector<HTMLElement>("[data-menu-backdrop]");
  const openBtn = document.querySelector<HTMLButtonElement>("[data-menu-open]");
  const closeBtn = document.querySelector<HTMLButtonElement>("[data-menu-close]");
  if (!panel || !openBtn) return;

  let lastFocused: HTMLElement | null = null;

  const isOpen = () => panel.dataset.open === "true";

  const setOpen = (open: boolean) => {
    panel.dataset.open = String(open);
    backdrop?.setAttribute("data-open", String(open));
    panel.setAttribute("aria-hidden", String(!open));
    openBtn.setAttribute("aria-expanded", String(open));
    if (open) {
      lastFocused = document.activeElement as HTMLElement;
      panel.querySelector<HTMLElement>("a, button")?.focus();
    } else {
      lastFocused?.focus();
    }
  };

  openBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    setOpen(!isOpen());
  });
  closeBtn?.addEventListener("click", () => setOpen(false));
  backdrop?.addEventListener("click", () => setOpen(false));

  // Close when a nav link is clicked.
  panel.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => setOpen(false)),
  );

  // Close on outside click (anything not inside the panel or the trigger).
  document.addEventListener("click", (e) => {
    if (!isOpen()) return;
    const target = e.target as Node;
    if (!panel.contains(target) && !openBtn.contains(target)) setOpen(false);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) setOpen(false);
  });
}

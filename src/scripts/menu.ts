/**
 * Menu controller. The fixed header stays in place; the blue overlay opens
 * behind it. The single header button toggles open/close (Menu ↔ Close), and
 * the header gets [data-menuopen] so it can flip to white-on-blue. Locks body
 * scroll while open; closes on link click and Escape.
 */
export function initMenu(): void {
  const overlay = document.querySelector<HTMLElement>("[data-menu]");
  const header = document.querySelector<HTMLElement>("[data-nav]");
  const toggleBtn = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
  const toggleText = document.querySelector<HTMLElement>("[data-menu-text]");
  if (!overlay || !toggleBtn) return;

  let lastFocused: HTMLElement | null = null;
  const isOpen = () => overlay.dataset.open === "true";

  const setOpen = (open: boolean) => {
    overlay.dataset.open = String(open);
    overlay.setAttribute("aria-hidden", String(!open));
    toggleBtn.setAttribute("aria-expanded", String(open));
    header?.setAttribute("data-menuopen", String(open));
    if (toggleText) toggleText.textContent = open ? "Close" : "Menu";
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open) {
      lastFocused = document.activeElement as HTMLElement;
      overlay.querySelector<HTMLElement>("a, button")?.focus();
    } else {
      lastFocused?.focus();
    }
  };

  toggleBtn.addEventListener("click", () => setOpen(!isOpen()));

  overlay.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => setOpen(false)),
  );

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) setOpen(false);
  });
}

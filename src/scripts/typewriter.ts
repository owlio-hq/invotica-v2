/**
 * Tiny typewriter effect — no dependency. Cycles through phrases, typing and
 * deleting with a blinking caret. Honors prefers-reduced-motion (shows the first
 * phrase statically). Drives the element matching [data-typewriter].
 *
 * Phrases are read from the element's data-phrases attribute (JSON array).
 */
export function initTypewriter(): void {
  const el = document.querySelector<HTMLElement>("[data-typewriter]");
  if (!el) return;

  let phrases: string[] = [];
  try {
    phrases = JSON.parse(el.dataset.phrases ?? "[]");
  } catch {
    phrases = [];
  }
  if (!phrases.length) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    el.textContent = phrases[0];
    return;
  }

  const TYPE = 55;
  const DELETE = 30;
  const HOLD = 1400;

  let phrase = 0;
  let char = 0;
  let deleting = false;

  function loop() {
    const current = phrases[phrase];
    el!.textContent = current.slice(0, char);

    if (!deleting && char < current.length) {
      char++;
      setTimeout(loop, TYPE);
    } else if (!deleting && char === current.length) {
      deleting = true;
      setTimeout(loop, HOLD);
    } else if (deleting && char > 0) {
      char--;
      setTimeout(loop, DELETE);
    } else {
      deleting = false;
      phrase = (phrase + 1) % phrases.length;
      setTimeout(loop, TYPE * 4);
    }
  }
  loop();
}

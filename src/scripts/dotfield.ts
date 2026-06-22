/**
 * Interactive dot field — an ambient, mouse-reactive grid of dots for the hero.
 *
 * Inspired by the idle particle heroes (e.g. antigravity.google) but pushed
 * further: every dot breathes on a continuous diagonal wave so the field is
 * alive even at rest, and the cursor acts as a soft magnet — nearby dots are
 * pushed outward, grow, brighten, and shift toward the brand blue, creating a
 * travelling "spotlight". Pure canvas, dpr-aware, pauses when off-screen, and
 * renders a single static frame under prefers-reduced-motion.
 */
export function initDotField(): void {
  const canvas = document.querySelector<HTMLCanvasElement>("[data-dotfield]");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const GAP = 32; // px between dots
  const RADIUS = 165; // cursor influence radius

  const base = [184, 190, 218]; // faint cool grey at rest
  const accent = [124, 140, 255]; // brand blue-bright near the cursor

  let w = 0;
  let h = 0;
  let cols = 0;
  let rows = 0;
  let t = 0;
  let visible = true;
  const mouse = { x: -9999, y: -9999 };
  const smooth = { x: -9999, y: -9999 };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    w = rect.width;
    h = rect.height;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = Math.ceil(w / GAP) + 1;
    rows = Math.ceil(h / GAP) + 1;
  };

  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    // ease the cursor so the spotlight glides instead of snapping
    smooth.x += (mouse.x - smooth.x) * 0.12;
    smooth.y += (mouse.y - smooth.y) * 0.12;

    // travelling blue bloom under the dots, following the cursor
    if (smooth.x > -1000 && smooth.y > -1000) {
      const g = ctx.createRadialGradient(smooth.x, smooth.y, 0, smooth.x, smooth.y, RADIUS * 1.7);
      g.addColorStop(0, "rgba(108,132,255,0.18)");
      g.addColorStop(1, "rgba(108,132,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    }

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const bx = i * GAP;
        const by = j * GAP;
        const wave = Math.sin(bx * 0.015 + by * 0.02 + t);

        let x = bx;
        let y = by;
        let size = 1.1 + (wave + 1) * 0.5;
        let a = 0.16 + (wave + 1) * 0.07;
        let mix = 0;

        const dx = bx - smooth.x;
        const dy = by - smooth.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < RADIUS * RADIUS) {
          const dist = Math.sqrt(d2) || 1;
          const f = 1 - dist / RADIUS;
          const ff = f * f;
          const push = ff * 22;
          x += (dx / dist) * push;
          y += (dy / dist) * push;
          size += ff * 3;
          a += ff * 0.6;
          mix = ff;
        }

        const r = (base[0] + (accent[0] - base[0]) * mix) | 0;
        const g = (base[1] + (accent[1] - base[1]) * mix) | 0;
        const b = (base[2] + (accent[2] - base[2]) * mix) | 0;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, 6.283);
        ctx.fillStyle = `rgba(${r},${g},${b},${a > 0.9 ? 0.9 : a})`;
        ctx.fill();
      }
    }
  };

  resize();
  window.addEventListener("resize", resize, { passive: true });

  if (reduce) {
    draw();
    return;
  }

  const loop = () => {
    t += 0.014;
    if (visible) draw();
    requestAnimationFrame(loop);
  };

  window.addEventListener(
    "pointermove",
    (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    },
    { passive: true },
  );
  window.addEventListener("pointerleave", () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  // Pause rendering while the hero is scrolled out of view.
  new IntersectionObserver(
    (entries) => {
      visible = entries[0]?.isIntersecting ?? true;
    },
    { threshold: 0 },
  ).observe(canvas);

  loop();
}

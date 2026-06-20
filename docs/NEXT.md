# Next Session — Redesign Notes (user feedback)

Status: **site left as-is**. Do this work next session, not now.

## Core feedback (must internalise)
1. **Match the inspiration site's DESIGN LANGUAGE, not just its colors.**
   Reference: https://proxyp-brainstorm-zksz.vercel.app/
   Study thoroughly *before building*: hero composition, how every element is
   shaped, the actual SVGs/graphics, spacing/typography rhythm, motion style, and
   the overall restraint/modern-designer vibe. Keep our green/orange + cream/ink
   palette, but the *feel* must come from the inspiration.
2. **Current build is wrong vibe.** It's a generic agency layout dressed in
   green/orange + floating blobs + glow sweeps + too many hover effects. The
   blobs and excess hovers read as distracting clutter — remove them.
3. **Crowd section was bad.** The user wanted the real Skiper39 CrowdCanvas
   (canvas-rendered walking people via an openpeeps sprite sheet), not the SVG
   silhouette marquee I made. BUT the user notes Skiper39 won't suit the current
   design at all → don't bolt it on; rethink the design first, then decide.

## To do next session (proposed)
- [ ] Open the inspiration site and do a real teardown (hero, sections, type,
      graphics/SVG approach, motion). Write findings here before coding.
- [ ] Redo the hero + overall visual system to that language, green/orange kept.
- [ ] Strip distracting blobs / glow / over-eager hover effects across the site.
- [ ] Re-decide the crowd moment after the new design exists.
- [ ] User has "many things to say + reviews" — collect their full list first.

## Inspiration teardown (studied from the user's 51s scroll video)
Reference: https://proxyp-brainstorm-zksz.vercel.app/ ("Proxy Papers"). It's a
high-contrast editorial site. Design DNA to reproduce:

- **Palette:** near-black ink + warm cream/white + ONE bold accent = **periwinkle
  blue** (~#5B7CF0). We KEEP the inspiration's blue/black/white theme — green &
  orange are DROPPED entirely (user decision 2026-06-21).
- **Signature move:** full-bleed sections with big rounded top/bottom corners so
  the next panel "tucks under" — nested rounded panels. Thin **curved arc lines**
  form a lens/portal in the hero.
- **Type:** huge LIGHT-weight headlines (not bold), tight leading, sentence case,
  two-tone (one word in accent/muted gray, e.g. "...your **data.**"). Tiny
  UPPERCASE eyebrows (PROBLEM, VOLUME, FRICTION, RISK). Ghosted giant numerals
  (01/02/03) as watermarks.
- **Components:** bordered stat grids; process as big list rows (number + giant
  word + right-aligned caption + divider line); bold scrolling marquee; orbital
  diagram (dashed concentric rings + avatars circling the logo).
- **Hero motif:** they use a sky/clouds photo recurring across hero + footer. We
  must invent OUR OWN equivalent motif (NOT clouds). Decide with user.
- **Menu:** top-right "Menu" pill expands into a COMPACT cream card anchored to the
  button (FR|EN toggle, big links, logo + socials, "Close") — NOT a fullscreen
  overlay. Replace the current fullscreen menu.
- **Motion:** smooth, scroll-linked, purposeful — logo reveal, portal cards
  sliding through, panel overlap reveals, card fan→spread, marquee, orbit. No
  blobs, no glows, restrained.

Section order observed: logo intro → hero (portal of doc cards) → Problem (stat
grid + big SVG) → 3 fanned profile cards → process list → sovereignty/trust (cream
+ marquee) → referrers (orbital) → final CTA → big footer on the motif panel.

Frames extracted to `frames/f_001.jpg`..`f_051.jpg` (1 fps) from
`20260619-1335-39.3206089.mp4`. ~95MB of media in repo — gitignore or delete next
session (ask user).

## Adaptation rules (agreed with user)
- This is a **full redesign**, not a patch of the current build.
- Aim **~75–85% of the inspiration's structure/feel**, NOT a 99% copy. Keep their
  composition + restraint, but bring **our own elements** — e.g. the **CrowdCanvas
  crowd** moment (Skiper39, below) and other original touches, our own hero motif,
  our own copy from the content md.
- Theme = **blue + black + white/cream** (like the inspo). NO green, NO orange.
  Kill blobs + excess hover effects.
- Multi-page (Home / Pricing / Contact), not SPA. Keep it light & fast.
- Start tomorrow FROM THIS FILE.

## Skiper39 CrowdCanvas — reference component (saved verbatim, NOT wired in)
Source: https://skiper-ui.com/v1/skiper39 — React + GSAP + Canvas. Needs a sprite
sheet at `/images/peeps/all-peeps.png` (openpeeps, 15 cols × 7 rows). Free to use
with Skiper UI attribution. Adapted from codepen.io/zadvorsky/pen/xxwbBQV,
illustrations from openpeeps.com.

```tsx
"use client";

import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";

interface CrowdCanvasProps {
  src: string;
  rows?: number;
  cols?: number;
}

const CrowdCanvas = ({ src, rows = 15, cols = 7 }: CrowdCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const config = { src, rows, cols };

    // UTILS
    const randomRange = (min: number, max: number) => min + Math.random() * (max - min);
    const randomIndex = (array: any[]) => randomRange(0, array.length) | 0;
    const removeFromArray = (array: any[], i: number) => array.splice(i, 1)[0];
    const removeItemFromArray = (array: any[], item: any) => removeFromArray(array, array.indexOf(item));
    const removeRandomFromArray = (array: any[]) => removeFromArray(array, randomIndex(array));
    const getRandomFromArray = (array: any[]) => array[randomIndex(array) | 0];

    // TWEEN FACTORIES
    const resetPeep = ({ stage, peep }: { stage: any; peep: any }) => {
      const direction = Math.random() > 0.5 ? 1 : -1;
      const offsetY = 100 - 250 * gsap.parseEase("power2.in")(Math.random());
      const startY = stage.height - peep.height + offsetY;
      let startX: number;
      let endX: number;
      if (direction === 1) {
        startX = -peep.width;
        endX = stage.width;
        peep.scaleX = 1;
      } else {
        startX = stage.width + peep.width;
        endX = 0;
        peep.scaleX = -1;
      }
      peep.x = startX;
      peep.y = startY;
      peep.anchorY = startY;
      return { startX, startY, endX };
    };

    const normalWalk = ({ peep, props }: { peep: any; props: any }) => {
      const { startX, startY, endX } = props;
      const xDuration = 10;
      const yDuration = 0.25;
      const tl = gsap.timeline();
      tl.timeScale(randomRange(0.5, 1.5));
      tl.to(peep, { duration: xDuration, x: endX, ease: "none" }, 0);
      tl.to(peep, { duration: yDuration, repeat: xDuration / yDuration, yoyo: true, y: startY - 10 }, 0);
      return tl;
    };

    const walks = [normalWalk];

    type Peep = {
      image: HTMLImageElement;
      rect: number[];
      width: number;
      height: number;
      drawArgs: any[];
      x: number;
      y: number;
      anchorY: number;
      scaleX: number;
      walk: any;
      setRect: (rect: number[]) => void;
      render: (ctx: CanvasRenderingContext2D) => void;
    };

    const createPeep = ({ image, rect }: { image: HTMLImageElement; rect: number[] }): Peep => {
      const peep: Peep = {
        image,
        rect: [],
        width: 0,
        height: 0,
        drawArgs: [],
        x: 0,
        y: 0,
        anchorY: 0,
        scaleX: 1,
        walk: null,
        setRect: (rect: number[]) => {
          peep.rect = rect;
          peep.width = rect[2];
          peep.height = rect[3];
          peep.drawArgs = [peep.image, ...rect, 0, 0, peep.width, peep.height];
        },
        render: (ctx: CanvasRenderingContext2D) => {
          ctx.save();
          ctx.translate(peep.x, peep.y);
          ctx.scale(peep.scaleX, 1);
          ctx.drawImage(peep.image, peep.rect[0], peep.rect[1], peep.rect[2], peep.rect[3], 0, 0, peep.width, peep.height);
          ctx.restore();
        },
      };
      peep.setRect(rect);
      return peep;
    };

    const img = document.createElement("img");
    const stage = { width: 0, height: 0 };
    const allPeeps: Peep[] = [];
    const availablePeeps: Peep[] = [];
    const crowd: Peep[] = [];

    const createPeeps = () => {
      const { rows, cols } = config;
      const { naturalWidth: width, naturalHeight: height } = img;
      const total = rows * cols;
      const rectWidth = width / rows;
      const rectHeight = height / cols;
      for (let i = 0; i < total; i++) {
        allPeeps.push(
          createPeep({
            image: img,
            rect: [(i % rows) * rectWidth, ((i / rows) | 0) * rectHeight, rectWidth, rectHeight],
          }),
        );
      }
    };

    const initCrowd = () => {
      while (availablePeeps.length) {
        addPeepToCrowd().walk.progress(Math.random());
      }
    };

    const addPeepToCrowd = () => {
      const peep = removeRandomFromArray(availablePeeps);
      const walk = getRandomFromArray(walks)({
        peep,
        props: resetPeep({ peep, stage }),
      }).eventCallback("onComplete", () => {
        removePeepFromCrowd(peep);
        addPeepToCrowd();
      });
      peep.walk = walk;
      crowd.push(peep);
      crowd.sort((a, b) => a.anchorY - b.anchorY);
      return peep;
    };

    const removePeepFromCrowd = (peep: Peep) => {
      removeItemFromArray(crowd, peep);
      availablePeeps.push(peep);
    };

    const render = () => {
      if (!canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(devicePixelRatio, devicePixelRatio);
      crowd.forEach((peep) => peep.render(ctx));
      ctx.restore();
    };

    const resize = () => {
      if (!canvas) return;
      stage.width = canvas.clientWidth;
      stage.height = canvas.clientHeight;
      canvas.width = stage.width * devicePixelRatio;
      canvas.height = stage.height * devicePixelRatio;
      crowd.forEach((peep) => peep.walk.kill());
      crowd.length = 0;
      availablePeeps.length = 0;
      availablePeeps.push(...allPeeps);
      initCrowd();
    };

    const init = () => {
      createPeeps();
      resize();
      gsap.ticker.add(render);
    };

    img.onload = init;
    img.src = config.src;

    const handleResize = () => resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      gsap.ticker.remove(render);
      crowd.forEach((peep) => {
        if (peep.walk) peep.walk.kill();
      });
    };
  }, []);
  return <canvas ref={canvasRef} className="absolute bottom-0 h-[90vh] w-full" />;
};

const Skiper39 = () => {
  return (
    <div className="relative h-full w-full bg-white text-black">
      <div className="top-22 absolute left-1/2 grid -translate-x-1/2 content-start justify-items-center gap-6 text-center text-black">
        <span className="relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-white after:to-black after:content-['']">
          Croud Canvas
        </span>
      </div>
      <div className="absolute bottom-0 h-full w-screen">
        <CrowdCanvas src="/images/peeps/all-peeps.png" rows={15} cols={7} />
      </div>
    </div>
  );
};

export { CrowdCanvas, Skiper39 };
```

> Note: this would reintroduce a `gsap` dependency and needs the openpeeps sprite
> sheet. Only add if the new design actually calls for it.

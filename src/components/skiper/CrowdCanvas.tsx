import { gsap } from "gsap";
import { useEffect, useRef } from "react";

/**
 * CrowdCanvas — a looping crowd of walking "peeps" rendered to a <canvas>.
 *
 * Adapted from Skiper UI's Skiper39 (Canvas_Landing_004), itself inspired by
 * https://codepen.io/zadvorsky/pen/xxwbBQV with open-peeps illustrations
 * (https://www.openpeeps.com/). Independent recreation for interaction study.
 * Free for personal/commercial use; attribution to Skiper UI for the free tier.
 *
 * `src` is a sprite sheet sliced into rows×cols figures. Lazy-mounted as an
 * island (client:visible) so gsap only loads when the section scrolls into view.
 */
interface CrowdCanvasProps {
  src: string;
  rows?: number;
  cols?: number;
  className?: string;
  /** Base size multiplier for each peep (further reduced on small screens). */
  scale?: number;
}

type Peep = {
  image: HTMLImageElement;
  rect: number[];
  width: number;
  height: number;
  x: number;
  y: number;
  anchorY: number;
  scaleX: number;
  walk: gsap.core.Timeline | null;
  setRect: (rect: number[]) => void;
  render: (ctx: CanvasRenderingContext2D) => void;
};

export const CrowdCanvas = ({
  src,
  rows = 15,
  cols = 7,
  className = "absolute inset-0 h-full w-full",
  scale = 1,
}: CrowdCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const config = { src, rows, cols };

    // Desktop keeps the default size; narrower screens shrink the peeps so the
    // crowd stays readable. `compact` also turns on top-clamping (no cut heads).
    const computeScale = () => {
      const w = window.innerWidth;
      const factor = w < 640 ? 0.55 : w < 1024 ? 0.85 : 1;
      return scale * factor;
    };
    let currentScale = computeScale();
    let compact = window.innerWidth < 1024;

    // utils
    const randomRange = (min: number, max: number) => min + Math.random() * (max - min);
    const randomIndex = (array: unknown[]) => randomRange(0, array.length) | 0;
    const removeFromArray = <T,>(array: T[], i: number) => array.splice(i, 1)[0];
    const removeItemFromArray = <T,>(array: T[], item: T) =>
      removeFromArray(array, array.indexOf(item));
    const removeRandomFromArray = <T,>(array: T[]) => removeFromArray(array, randomIndex(array));
    const getRandomFromArray = <T,>(array: T[]): T => array[randomIndex(array) | 0];

    const resetPeep = ({ stage, peep }: { stage: { width: number; height: number }; peep: Peep }) => {
      const direction = Math.random() > 0.5 ? 1 : -1;
      const ease = gsap.parseEase("power2.in")(Math.random());
      let startY: number;
      if (compact) {
        // Mobile/tablet: front peeps overflow below canvas (clipped by
        // section overflow-hidden), back peeps sit exactly on the baseline.
        // This fills the canvas bottom edge with figures — no transparent
        // black gap between peeps and the section boundary.
        startY = stage.height - peep.height + 80 * (1 - ease);
        if (startY < 0) startY = 0;
      } else {
        // Desktop: original look (front peeps overflow the bottom for depth).
        startY = stage.height - peep.height + (100 - 250 * ease);
      }
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

    const normalWalk = ({
      peep,
      props,
    }: {
      peep: Peep;
      props: { startX: number; startY: number; endX: number };
    }) => {
      const { startY, endX } = props;
      const xDuration = 10;
      const yDuration = 0.25;
      const tl = gsap.timeline();
      tl.timeScale(randomRange(0.5, 1.5));
      tl.to(peep, { duration: xDuration, x: endX, ease: "none" }, 0);
      tl.to(peep, { duration: yDuration, repeat: xDuration / yDuration, yoyo: true, y: startY - 10 }, 0);
      return tl;
    };

    const walks = [normalWalk];

    const createPeep = ({ image, rect }: { image: HTMLImageElement; rect: number[] }): Peep => {
      const peep: Peep = {
        image,
        rect: [],
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        anchorY: 0,
        scaleX: 1,
        walk: null,
        setRect: (rect: number[]) => {
          peep.rect = rect;
          peep.width = rect[2] * currentScale;
          peep.height = rect[3] * currentScale;
        },
        render: (c: CanvasRenderingContext2D) => {
          c.save();
          c.translate(peep.x, peep.y);
          c.scale(peep.scaleX, 1);
          c.drawImage(
            peep.image,
            peep.rect[0],
            peep.rect[1],
            peep.rect[2],
            peep.rect[3],
            0,
            0,
            peep.width,
            peep.height,
          );
          c.restore();
        },
      };
      peep.setRect(rect);
      return peep;
    };

    const img = document.createElement("img");
    img.crossOrigin = "anonymous";
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

    const addPeepToCrowd = (): Peep => {
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

    const initCrowd = () => {
      // Fewer people on small screens (keeps the same density, less clutter).
      const w = window.innerWidth;
      const ratio = w < 640 ? 0.52 : w < 1024 ? 0.72 : 1;
      const target = Math.max(8, Math.round(allPeeps.length * ratio));
      while (availablePeeps.length && crowd.length < target) {
        // progress randomly so the first frame isn't an empty edge
        addPeepToCrowd().walk?.progress(Math.random());
      }
    };

    const render = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(devicePixelRatio, devicePixelRatio);
      crowd.forEach((peep) => peep.render(ctx));
      ctx.restore();
    };

    const resize = () => {
      stage.width = canvas.clientWidth;
      stage.height = canvas.clientHeight;
      canvas.width = stage.width * devicePixelRatio;
      canvas.height = stage.height * devicePixelRatio;
      // Re-apply scale (it may have changed across the responsive breakpoints).
      currentScale = computeScale();
      compact = window.innerWidth < 1024;
      allPeeps.forEach((peep) => peep.setRect(peep.rect));
      crowd.forEach((peep) => peep.walk?.kill());
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
      crowd.forEach((peep) => peep.walk?.kill());
    };
  }, [src, rows, cols]);

  return <canvas ref={canvasRef} className={className} />;
};

export default CrowdCanvas;

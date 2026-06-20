import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "motion/react";
import { logger } from "@/lib/logger";

export interface WorkItem {
  title: string;
  category: string;
  /** two brand colors for the card's gradient */
  from: string;
  to: string;
}

/**
 * Skiper-UI–style draggable showcase carousel (React island, Motion-powered).
 * Loaded lazily via `client:visible`, so React + Motion only download when this
 * section scrolls into view — never on first paint.
 */
export default function WorkShowcase({ items }: { items: WorkItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [maxDrag, setMaxDrag] = useState(0);
  const x = useMotionValue(0);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const viewport = viewportRef.current;
      if (!track || !viewport) return;
      const overflow = track.scrollWidth - viewport.offsetWidth;
      setMaxDrag(overflow > 0 ? overflow : 0);
    };
    measure();
    window.addEventListener("resize", measure);
    logger.debug("WorkShowcase", "island hydrated", { count: items.length });
    return () => window.removeEventListener("resize", measure);
  }, [items.length]);

  return (
    <div ref={viewportRef} className="overflow-hidden">
      <motion.div
        ref={trackRef}
        className="flex w-max cursor-grab gap-5 active:cursor-grabbing"
        style={{ x }}
        drag="x"
        dragConstraints={{ left: -maxDrag, right: 0 }}
        dragElastic={0.08}
        dragTransition={{ power: 0.25, timeConstant: 220 }}
      >
        {items.map((item, i) => (
          <motion.article
            key={i}
            className="relative h-[340px] w-[280px] shrink-0 overflow-hidden rounded-3xl sm:w-[340px]"
            style={{
              background: `linear-gradient(150deg, ${item.from}, ${item.to})`,
            }}
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
          >
            {/* faux browser chrome */}
            <div className="absolute left-5 top-5 flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/40" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            </div>

            <div className="absolute inset-x-6 bottom-6 text-cream">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cream/70">
                {item.category}
              </p>
              <h3 className="mt-2 font-display text-2xl font-medium leading-tight">
                {item.title}
              </h3>
              <p className="mt-2 text-xs text-cream/60">Sample concept</p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </div>
  );
}

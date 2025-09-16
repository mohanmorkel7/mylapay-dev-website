import { RefObject, useEffect, useRef, useState } from "react";

export type ScrollProgressOptions = {
  /** Start mapping when element's top is at this viewport height ratio (0..1) */
  startViewportRatio?: number; // e.g. 0.9 means near bottom
  /** Finish mapping when element's top reaches this viewport height ratio */
  endViewportRatio?: number; // e.g. 0.3 means upper third
};

export function useScrollProgress<T extends HTMLElement = HTMLElement>(
  { startViewportRatio = 0.9, endViewportRatio = 0.3 }: ScrollProgressOptions = {}
): { ref: RefObject<T>; progress: number } {
  const ref = useRef<T | null>(null);
  const frame = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const onFrame = () => {
      frame.current = null;
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const startY = vh * startViewportRatio;
      const endY = vh * endViewportRatio;
      const p = 1 - (rect.top - endY) / (startY - endY);
      const clamped = Math.max(0, Math.min(1, p));
      setProgress(clamped);
    };

    const onScroll = () => {
      if (frame.current == null) {
        frame.current = window.requestAnimationFrame(onFrame);
      }
    };

    onFrame();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [startViewportRatio, endViewportRatio]);

  return { ref, progress };
}

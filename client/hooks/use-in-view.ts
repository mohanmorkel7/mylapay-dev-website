import { RefObject, useEffect, useMemo, useRef, useState } from "react";

export type UseInViewOptions = {
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean; // animate once when it enters view
};

export function useInView<T extends HTMLElement = HTMLElement>(
  options: UseInViewOptions = {}
): { ref: RefObject<T>; inView: boolean } {
  const { root = null, rootMargin = "0px 0px -10% 0px", threshold = 0.1, once = true } = options;

  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  // Respect prefers-reduced-motion
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
    try {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      return false;
    }
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (prefersReducedMotion) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setInView(false);
          }
        });
      },
      { root: root ?? null, rootMargin, threshold }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [root, rootMargin, threshold, once, prefersReducedMotion]);

  return { ref, inView };
}

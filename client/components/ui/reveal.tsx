import { PropsWithChildren, useMemo } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/use-in-view";

export type RevealProps = PropsWithChildren<{
  className?: string;
  delay?: number; // ms
  duration?: number; // ms
  as?: keyof JSX.IntrinsicElements;
  /**
   * scale: subtle scale + fade + rise
   * fadeUp: fade + rise
   * fade: fade only
   */
  variant?: "scale" | "fadeUp" | "fade";
  /** If true, element will animate again when it leaves and re-enters */
  repeat?: boolean;
}>;

export function Reveal({
  children,
  className,
  delay = 0,
  duration = 700,
  as = "div",
  variant = "scale",
  repeat = false,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ once: !repeat, rootMargin: "0px 0px -10% 0px", threshold: 0.15 });

  const Comp = as as any;

  const baseHidden = useMemo(() => {
    switch (variant) {
      case "fadeUp":
        return "opacity-0 translate-y-4";
      case "fade":
        return "opacity-0";
      case "scale":
      default:
        return "opacity-0 translate-y-2 scale-[0.97]";
    }
  }, [variant]);

  const baseVisible = useMemo(() => {
    switch (variant) {
      case "fadeUp":
        return "opacity-100 translate-y-0";
      case "fade":
        return "opacity-100";
      case "scale":
      default:
        return "opacity-100 translate-y-0 scale-100";
    }
  }, [variant]);

  return (
    <Comp
      ref={ref}
      className={cn(
        "will-change-transform will-change-opacity transform-gpu transition-all ease-out",
        // Respect reduced motion via utilities as well
        "motion-reduce:opacity-100 motion-reduce:translate-y-0 motion-reduce:scale-100",
        inView ? baseVisible : baseHidden,
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionProperty: "opacity, transform, filter",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </Comp>
  );
}

export default Reveal;

import { PropsWithChildren, useMemo } from "react";
import { cn } from "@/lib/utils";
import { useScrollProgress } from "@/hooks/use-scroll-progress";

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export type ScrollScaleProps = PropsWithChildren<{
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  fromScale?: number; // initial scale
  toScale?: number;   // final scale
  fromOpacity?: number;
  toOpacity?: number;
  /** When true, element is visually hidden (opacity 0, pointer-events none) until it starts entering */
  hideUntilInView?: boolean;
  /** Start/end ratios describing when the animation should begin/end as element top moves in viewport */
  startViewportRatio?: number;
  endViewportRatio?: number;
  transformOrigin?: string;
}>;

export default function ScrollScale({
  as = "div",
  className,
  children,
  fromScale = 0.92,
  toScale = 1,
  fromOpacity = 0.4,
  toOpacity = 1,
  hideUntilInView = true,
  startViewportRatio = 0.9,
  endViewportRatio = 0.3,
  transformOrigin = "center",
  ...rest
}: ScrollScaleProps & Record<string, any>) {
  const { ref, progress } = useScrollProgress<HTMLDivElement>({ startViewportRatio, endViewportRatio });
  const Comp = as as any;

  const eased = useMemo(() => easeOutCubic(progress), [progress]);
  const scale = fromScale + (toScale - fromScale) * eased;
  const opacity = fromOpacity + (toOpacity - fromOpacity) * eased;

  const hidden = hideUntilInView && progress <= 0;

  return (
    <Comp
      ref={ref}
      className={cn(
        "transform-gpu will-change-transform will-change-opacity",
        hidden ? "pointer-events-none" : undefined,
        className
      )}
      style={{
        transform: `scale(${scale})`,
        opacity: opacity,
        transformOrigin,
      }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

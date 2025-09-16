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
  toScale?: number; // final scale
  fromOpacity?: number;
  toOpacity?: number;
  /** Horizontal translation from -> to (in px). If provided, overrides 'direction'. */
  fromX?: number;
  toX?: number;
  /** Vertical translation from -> to (in px). */
  fromY?: number;
  toY?: number;
  /** Slide-in direction helper. If set, defaults to fromX=-64 for 'left' and fromX=64 for 'right'. */
  direction?: "left" | "right";
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
  fromX,
  toX,
  direction,
  hideUntilInView = true,
  startViewportRatio = 0.9,
  endViewportRatio = 0.3,
  transformOrigin = "center",
  fromY = 0,
  toY = 0,
  ...rest
}: ScrollScaleProps & Record<string, any>) {
  const { ref, progress } = useScrollProgress<HTMLDivElement>({
    startViewportRatio,
    endViewportRatio,
  });
  const Comp = as as any;

  const eased = useMemo(() => easeOutCubic(progress), [progress]);
  const scale = fromScale + (toScale - fromScale) * eased;
  const opacity = fromOpacity + (toOpacity - fromOpacity) * eased;

  // Determine horizontal translation
  const defaults =
    direction === "left"
      ? { fx: -64, tx: 0 }
      : direction === "right"
        ? { fx: 64, tx: 0 }
        : { fx: 0, tx: 0 };
  const fx = fromX ?? defaults.fx;
  const tx = toX ?? defaults.tx;
  const translateX = fx + (tx - fx) * eased;
  const translateY = fromY + (toY - fromY) * eased;

  const hidden = hideUntilInView && progress <= 0;

  return (
    <Comp
      ref={ref}
      className={cn(
        "transform-gpu will-change-transform will-change-opacity",
        hidden ? "pointer-events-none" : undefined,
        className,
      )}
      style={{
        transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
        opacity: opacity,
        transformOrigin,
      }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

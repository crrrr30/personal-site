"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type HTMLMotionProps,
} from "motion/react";
import {
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  type PropsWithChildren,
} from "react";

import { useElementSize } from "@/app/hooks/useElementWidth";
import { useVh } from "@/app/hooks/useVh";
import { useBodyDivContext } from "@/app/providers/BodyDivContext";
import { cn } from "@/lib/utils";

export interface PanelSectionProps extends HTMLMotionProps<"section"> {
  className?: string;
  minScale?: number;
  minOpacity?: number;
  disableScale?: boolean;
  disableFade?: boolean;
  clampTail?: boolean;
  clampTailVh?: number;
}

const defaultSpring = { stiffness: 120, damping: 26, mass: 0.6 } as const;
const DEFAULT_CLAMP_VH = 80;

const PanelSectionBase = forwardRef<
  HTMLElement,
  PropsWithChildren<PanelSectionProps>
>(
  (
    {
      children,
      className,
      style,
      minScale = 0.7,
      minOpacity = 0.5,
      disableScale = false,
      disableFade = false,
      clampTail = true,
      clampTailVh = DEFAULT_CLAMP_VH,
      ...rest
    },
    forwardedRef,
  ) => {
    const bodyDiv = useBodyDivContext();
    const wrapperRef = useRef<HTMLElement | null>(null);

    const { scrollYProgress } = useScroll({
      container: bodyDiv,
      target: wrapperRef,
      offset: ["start start", "end start"],
    });

    const easedProgress = useSpring(scrollYProgress, defaultSpring);
    const { height } = useElementSize(wrapperRef);
    const vh = useVh();

    const clampStart = useMemo(() => {
      if (!clampTail || !height || height <= 0) return null;

      const clampPixels = Math.min(clampTailVh * vh, height);
      const normalized = 1 - clampPixels / height;

      if (!Number.isFinite(normalized)) {
        return null;
      }

      return Math.max(0, normalized);
    }, [clampTail, clampTailVh, height, vh]);

    const clampStartRef = useRef<number | null>(null);

    clampStartRef.current = clampStart;

    const clampedProgress = useTransform(easedProgress, (value) => {
      const start = clampStartRef.current;

      if (start == null) return value;
      if (value <= start) return 0;

      const span = 1 - start;

      if (span <= 0) return 1;

      return Math.min(Math.max((value - start) / span, 0), 1);
    });

    const scale = useTransform(
      clampedProgress,
      [0, 0.6, 1],
      [1, minScale, minScale],
    );
    const opacity = useTransform(
      clampedProgress,
      [0, 0.85, 1],
      [1, minOpacity, 0],
    );
    const blur = useTransform(
      clampedProgress,
      // [0, 0.85, 1],
      // ["blur(0px)", "blur(0px)", "blur(12px)"],
      [0, 1],
      ["blur(0px)", "blur(4px)"],
    );

    const assignWrapperRef = useCallback(
      (node: HTMLElement | null) => {
        wrapperRef.current = node;

        if (typeof forwardedRef === "function") {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      },
      [forwardedRef],
    );

    return (
      <motion.section
        ref={assignWrapperRef}
        className={cn("will-change-transform", className)}
        style={{
          ...style,
          scale: disableScale ? undefined : scale,
          opacity: disableFade ? undefined : opacity,
          filter: blur,
        }}
        {...rest}
      >
        {children}
      </motion.section>
    );
  },
);

PanelSectionBase.displayName = "PanelSection";

export const PanelSection = PanelSectionBase;

"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useMemo, useRef, type FC } from "react";

const springConfig = { stiffness: 230, damping: 28, mass: 0.45 } as const;

export const useCursor = () => {
  const hasShownCursorRef = useRef(false);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rawOpacity = useMotionValue(0);

  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);
  const opacity = useSpring(rawOpacity, { stiffness: 160, damping: 25 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleMouseMove = (event: MouseEvent) => {
      rawX.set(event.clientX);
      rawY.set(event.clientY);

      if (!hasShownCursorRef.current) {
        hasShownCursorRef.current = true;
        rawOpacity.set(1);
      }
    };

    const handleMouseLeave = () => {
      rawOpacity.set(0);
      hasShownCursorRef.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [rawX, rawY, rawOpacity]);

  const Cursor = useMemo(() => {
    const CursorComponent: FC = () => (
      <motion.div
        className="cursor"
        style={{
          left: x,
          top: y,
          opacity,
        }}
      >
        <div />
      </motion.div>
    );

    CursorComponent.displayName = "Cursor";

    return CursorComponent;
  }, [x, y, opacity]);

  return { Cursor };
};

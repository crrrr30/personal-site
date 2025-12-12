"use client";

import {
  motion,
  useInView,
  type UseInViewOptions,
  type Variants,
  type MotionProps,
} from "motion/react";
import { type RefObject, useContext, useRef } from "react";

import { PageInViewContext } from "@/app/providers/PageInViewContext";
import { appEasing } from "@/lib/animations";

type MarginType = UseInViewOptions["margin"];

export interface BlurFadeProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  variant?: {
    hidden: { y: number };
    visible: { y: number };
  };
  duration?: number;
  delay?: number;
  offset?: `${number}${"em" | "px"}`;
  direction?: "up" | "down" | "left" | "right";
  inViewMargin?: MarginType;
  blur?: string;
  inViewRef?: RefObject<Element | null>;
}

export function BlurFade({
  children,
  className,
  variant,
  duration = 1.6,
  delay = 0,
  offset = "8em",
  direction = "up",
  inViewMargin = "-50px",
  blur = "0.375rem",
  inViewRef,
  ...props
}: BlurFadeProps) {
  const ref = useRef(null);
  const pageInView = useContext(PageInViewContext);
  const inViewResult = useInView(inViewRef ?? ref, {
    once: true,
    margin: inViewMargin,
  });
  const isInView = pageInView && inViewResult;
  const defaultVariants: Variants = {
    hidden: {
      [direction === "left" || direction === "right" ? "x" : "y"]:
        direction === "right" || direction === "down" ? `-${offset}` : offset,
      opacity: 0,
      filter: `blur(${blur})`,
    },
    visible: {
      [direction === "left" || direction === "right" ? "x" : "y"]: 0,
      opacity: 1,
      filter: `blur(0px)`,
    },
  };
  const combinedVariants = variant || defaultVariants;

  return (
    <motion.div
      ref={ref}
      animate={isInView ? "visible" : "hidden"}
      className={className}
      exit="hidden"
      initial="hidden"
      transition={{
        delay: 0.04 + delay,
        duration,
        ...appEasing,
      }}
      variants={combinedVariants}
      {...props}
    >
      {children}
    </motion.div>
  );
}

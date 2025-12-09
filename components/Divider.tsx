import {
  motion,
  useInView,
  type Variants,
  type UseInViewOptions,
} from "motion/react";
import { useContext, useRef } from "react";

import { homePageEasing } from "@/app/page";
import { PageInViewContext } from "@/app/providers/PageInViewContext";
import { cn } from "@/lib/utils";

type MarginType = UseInViewOptions["margin"];

export function Divider({
  className,
  delay = 0,
  vertical = false,
  from = "center",
  duration = 1.6,
  inViewMargin = "-50px",
}: {
  className?: string;
  delay?: number;
  vertical?: boolean;
  from?: "center" | "start" | "end";
  duration?: number;
  inViewMargin?: MarginType;
}) {
  const ref = useRef(null);
  const pageInView = useContext(PageInViewContext);
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin });
  const isInView = pageInView && inViewResult;

  const variants: Variants = {
    hidden: vertical ? { height: 0 } : { width: 0 },
    visible: vertical ? { height: "100%" } : { width: "100%" },
  };

  return (
    <div
      ref={ref}
      className={cn(
        vertical ? "h-full w-[1px]" : "w-full h-[1px]",
        ...["flex", vertical ? " flex-col" : "flex-row"],
        from === "center"
          ? "justify-center"
          : from === "start"
            ? "justify-start"
            : "justify-end",
        className,
      )}
    >
      <motion.div
        animate={isInView ? "visible" : "hidden"}
        className={cn(vertical ? "w-full" : "h-full", "bg-gray-300")}
        initial="hidden"
        transition={{
          delay: 0.04 + delay,
          duration,
          ...homePageEasing,
          // type: "spring",
          // stiffness: 72,
          // damping: 18,
          // restDelta: 0.001,
          // ease: "easeOut",
        }}
        variants={variants}
      />
    </div>
  );
}

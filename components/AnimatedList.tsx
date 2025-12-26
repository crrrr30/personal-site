"use client";

import { motion } from "motion/react";
import { type FC, Fragment, type ReactNode } from "react";

import { useBlurFade } from "@/app/hooks/useBlurFade";
import { useDivider } from "@/app/hooks/useDivider";
import { useElementSize } from "@/app/hooks/useElementWidth";
import { appEasing } from "@/lib/animations";
import { cn } from "@/lib/utils";

export const AnimatedList: FC<{
  baseDelay?: number;
  listData: Array<{ header: ReactNode; content: ReactNode }>;
  className?: string;
}> = ({ baseDelay = 0, listData, className }) => {
  const { ref, width } = useElementSize<HTMLDivElement>();
  const BlurFade = useBlurFade(ref);
  const Divider = useDivider(ref);

  const transition = {
    duration: 0.6,
    ...appEasing,
  };

  return (
    <div
      ref={ref}
      className={cn(
        "grid auto-rows-min md:auto-rows-fr grid-cols-1 md:grid-cols-[max-content,1fr] gap-x-8 gap-y-6",
        className,
      )}
    >
      {listData.map(({ header, content }, idx) => (
        <Fragment key={idx}>
          <BlurFade delay={baseDelay + 0.15 * idx}>{header}</BlurFade>

          {/* TODO: disable hover effect until the blurfade has loaded */}
          <motion.div
            animate="initial"
            className="flex flex-col justify-between"
            initial="initial"
            whileHover="hovered"
          >
            <BlurFade delay={baseDelay + 0.15 * idx + 0.05}>
              <motion.div
                className="pb-4"
                transition={transition}
                variants={{
                  initial: { color: "var(--color-gray-600)" },
                  hovered: { color: "black" },
                }}
              >
                {content}
              </motion.div>
            </BlurFade>

            <div className={cn("w-full h-[1px]", "relative")}>
              <Divider delay={baseDelay + 0.15 * idx + 0.1} from="end" />

              <div className="absolute top-0 right-0 bottom-0">
                <motion.div
                  className="bg-black h-full"
                  transition={transition}
                  variants={{
                    initial: { width: 0 },
                    hovered: { width: width ?? 0 },
                  }}
                />
              </div>
            </div>
          </motion.div>
        </Fragment>
      ))}
    </div>
  );
};

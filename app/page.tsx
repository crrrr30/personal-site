"use client";

import { motion, useAnimate } from "motion/react";
import { useEffect, useState, type FC } from "react";

import { HomeContent } from "@/app/components/HomeContent";
import { PageInViewContext } from "@/app/providers/PageInViewContext";
import flowy from "@/assets/flowy.png";
import { cn } from "@/lib/utils";

export const homePageEasing = { ease: [0.16, 1, 0.3, 1] } as const;

const HomePage: FC = () => {
  const [scope, animate] = useAnimate();
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        // 1) zoom image frame outward
        await Promise.all([
          animate(
            ".frame",
            { scale: 1 },
            {
              duration: 1.1,
              ...homePageEasing,
            },
          ),
          animate(
            ".left",
            { x: "1em" },
            {
              duration: 1.1,
              ...homePageEasing,
            },
          ),
          animate(
            ".right",
            { x: "-1em" },
            {
              duration: 1.1,
              ...homePageEasing,
            },
          ),
        ]);

        // 2) dock image to the top = move frame upward
        await animate(
          ".frame",
          { y: "-100vh" },
          {
            duration: 0.8,
            ...homePageEasing,
          },
        );
      } finally {
        if (!cancelled) {
          setAnimationComplete(true);
        }
      }
    };

    const timeoutId = setTimeout(run, 300);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [animate]);

  return (
    <PageInViewContext.Provider value={animationComplete}>
      <motion.div ref={scope}>
        <motion.div
          aria-busy={!animationComplete}
          className={cn(
            "content",
            animationComplete
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none",
          )}
        >
          <HomeContent
            className={
              animationComplete ? "overflow-y-auto" : "overflow-y-hidden"
            }
          />
        </motion.div>

        <motion.div
          aria-hidden="true"
          className="fixed inset-0"
          style={{ pointerEvents: animationComplete ? "none" : "auto" }}
        >
          <motion.div
            className="frame relative"
            initial={{
              width: "100vw",
              height: "100vh",
              scale: 0.5,
            }}
            style={{
              transformOrigin: "center",
              willChange: animationComplete ? "auto" : "transform",
            }}
          >
            <motion.img
              className="h-full w-full object-cover"
              src={flowy.src}
            />

            <motion.div
              className={cn(
                "absolute top-0 left-0 size-full",
                "flex flex-row justify-between items-center",
                "[&_p]:text-7xl [&_p]:text-white font-semibold",
              )}
            >
              <motion.p
                className="left"
                style={{ willChange: animationComplete ? "auto" : "transform" }}
              >
                JONATHAN
              </motion.p>
              <motion.p
                className="right"
                style={{ willChange: animationComplete ? "auto" : "transform" }}
              >
                CUI
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </PageInViewContext.Provider>
  );
};

export default HomePage;

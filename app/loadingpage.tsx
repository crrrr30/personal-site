"use client";

import { type Easing, motion, stagger, useAnimate } from "motion/react";
import React, { useEffect } from "react";

import imgD from "@/assets/flowy.png";
import imgA from "@/assets/main-shot.png";
import imgB from "@/assets/secondary-portrait-alt.png";
import imgC from "@/assets/side-shot.png";
import { cn } from "@/lib/utils";

export const expoInOut: Easing = [0.625, 0.05, 0, 1] as const;

export function AppLoadingPage() {
  const [ref, animate] = useAnimate();

  useEffect(() => {
    void (async () => {
      await animate(
        "span",
        { y: 0 },
        {
          duration: 1.25,
          delay: stagger(0.025),
          ease: expoInOut,
        },
      );

      await animate(
        "#image-container",
        { width: "fit-content" },
        { duration: 1, ease: expoInOut },
      );

      await animate(
        "#image",
        { width: "fit-content" },
        { duration: 1, ease: expoInOut },
      );

      await animate("#image2", { opacity: 1 }, { delay: 0.2, duration: 0 });
      await animate("#image3", { opacity: 1 }, { delay: 0.2, duration: 0 });
      await animate("#image4", { opacity: 1 }, { delay: 0.2, duration: 0 });

      await sleep(0.2);

      await Promise.all([
        animate(
          "#image4",
          {
            width: "100vw",
            height: "100vh",
          },
          { duration: 1, ease: expoInOut },
        ),
        animate(
          "#image-container",
          {
            width: "100vw",
            height: "100vh",
          },
          { duration: 1, ease: expoInOut },
        ),
        animate(
          ref.current,
          {
            width: "300vw",
            x: "-100vw",
          },
          { duration: 1, ease: expoInOut },
        ),
        animate(
          "#text-left",
          {
            width: "100vw",
          },
          { duration: 1, ease: expoInOut },
        ),
        animate(
          "#text-right",
          {
            width: "100vw",
          },
          { duration: 1, ease: expoInOut },
        ),
      ]);

      await animate(
        ref.current,
        { y: "-100%" },
        { duration: 1.25, ease: expoInOut },
      );
    })();
  }, [animate, ref]);

  return (
    <motion.div
      ref={ref}
      layout
      className={cn(
        "w-screen h-screen bg-gray-50",
        "flex flex-row justify-center items-center",
      )}
    >
      <div className="flex flex-row items-baseline justify-center gap-0">
        <p
          className="overflow-hidden [&_span]:text-[4rem] [&_span]:tracking-tighter"
          id="text-left"
        >
          <span className="left-token">J</span>
          <span className="left-token">O</span>
          <span className="left-token">N</span>
          <span className="left-token">A</span>
          <span className="left-token">T</span>
          <span className="left-token">H</span>
          <span className="left-token">A</span>
          <span className="left-token">N</span>
        </p>

        <motion.div
          layout
          className={cn(
            "flex flex-row justify-center overflow-hidden relative",
            "mx-2",
          )}
          id="image-container"
        >
          <div className="flex h-[calc(4rem*0.7)] aspect-[4/3]" id="image">
            <img className="object-cover w-full h-full" src={imgA.src} />
          </div>
          <div className="absolute opacity-0 h-full aspect-[4/3]" id="image2">
            <img className="object-cover w-full h-full" src={imgB.src} />
          </div>
          <div className="absolute opacity-0 h-full aspect-[4/3]" id="image3">
            <img className="object-cover w-full h-full" src={imgC.src} />
          </div>
          <div className="absolute opacity-0 h-full aspect-[4/3]" id="image4">
            <img className="object-cover w-full h-full" src={imgD.src} />
          </div>
        </motion.div>

        <p
          className="overflow-hidden [&_span]:text-[4rem] [&_span]:tracking-tighter"
          id="text-right"
        >
          <span className="right-token">C</span>
          <span className="right-token">U</span>
          <span className="right-token">I</span>
        </p>
      </div>
    </motion.div>
  );
}

const sleep = (seconds: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};

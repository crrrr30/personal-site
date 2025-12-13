"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useCallback, useRef, useState, type FC } from "react";

import { HomeContent } from "@/app/components/HomeContent";
import { PageInViewContext } from "@/app/providers/PageInViewContext";
import { Willem, WILLEM_SELECTORS, createWillemTimeline } from "@/app/willem";
import { cn } from "@/lib/utils";

const disableAnimation = false;
const FRAME_OFFSET_EPSILON = 0.5;

gsap.registerPlugin(useGSAP);

const HomePage: FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLElement | null>(null);
  const frameOffsetLockedRef = useRef(false);
  const [frameOffset, setFrameOffset] = useState<number | null>(null);
  const [animationComplete, setAnimationComplete] = useState(disableAnimation);

  const handleFrameOffsetChange = useCallback((offset: number) => {
    if (frameOffsetLockedRef.current) return;

    setFrameOffset((prev) => {
      if (prev == null) {
        return offset;
      }

      if (Math.abs(prev - offset) < FRAME_OFFSET_EPSILON) {
        return prev;
      }

      return offset;
    });
  }, []);

  useGSAP(
    () => {
      if (disableAnimation) {
        setAnimationComplete(true);

        return;
      }

      if (frameOffset == null) {
        return;
      }

      const loader = loaderRef.current;

      if (!loader) return;

      frameOffsetLockedRef.current = true;

      const timeline = createWillemTimeline(loader, {
        unlockOnComplete: false,
        frameOffset,
      });

      const backgroundFrame = loader.querySelector(WILLEM_SELECTORS.frame);

      if (backgroundFrame) {
        timeline.to(backgroundFrame, {
          y: "-100vh",
          duration: 0.8,
          ease: "expo.inOut",
        });
      }

      timeline.call(() => {
        loader.classList.remove("is--loading");
        setAnimationComplete(true);
      });

      return () => {
        timeline.kill();
      };
    },
    { scope: rootRef, dependencies: [disableAnimation, frameOffset] },
  );

  return disableAnimation ? (
    <PageInViewContext.Provider value={true}>
      <HomeContent />
    </PageInViewContext.Provider>
  ) : (
    <PageInViewContext.Provider value={animationComplete}>
      <div ref={rootRef}>
        <div
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
        </div>

        <div
          aria-hidden="true"
          className={cn(
            "fixed inset-0 z-20 transition-opacity duration-700",
            animationComplete ? "pointer-events-none opacity-0" : "opacity-100",
          )}
        >
          <Willem
            ref={loaderRef}
            autoPlay={false}
            onFrameOffsetChange={handleFrameOffsetChange}
          />
        </div>
      </div>
    </PageInViewContext.Provider>
  );
};

export default HomePage;

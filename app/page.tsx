"use client";

import { useState, type FC } from "react";

import { HomeContent } from "@/app/components/HomeContent";
import { PageInViewContext } from "@/app/providers/PageInViewContext";
import { MarqueeLoader } from "@/components/MarqueeLoader";
import { cn } from "@/lib/utils";

const disableAnimation = false;

const HomePage: FC = () => {
  const [animationComplete, setAnimationComplete] = useState(disableAnimation);

  if (disableAnimation) {
    return (
      <PageInViewContext.Provider value={true}>
        <HomeContent />
      </PageInViewContext.Provider>
    );
  }

  return (
    <PageInViewContext.Provider value={animationComplete}>
      <div>
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
          {!animationComplete && (
            <MarqueeLoader onComplete={() => setAnimationComplete(true)} />
          )}
        </div>
      </div>
    </PageInViewContext.Provider>
  );
};

export default HomePage;

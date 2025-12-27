"use client";

import { useEffect, useState, type FC } from "react";

import { HomeContent } from "@/app/components/HomeContent";
import { PageInViewContext } from "@/app/providers/PageInViewContext";
import { MarqueeLoader } from "@/components/MarqueeLoader";
import { cn } from "@/lib/utils";

const disableAnimation =
  process.env.NEXT_PUBLIC_DISABLE_MARQUEE_LOADER === "true";

const HomePage: FC = () => {
  const [animationComplete, setAnimationComplete] = useState(disableAnimation);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_DISABLE_MARQUEE_LOADER !== "true") {
      return;
    }

    // Reminder so the loader isn't accidentally left disabled in commits.
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console -- Development-only warning.
      console.warn(
        "[MarqueeLoader] NEXT_PUBLIC_DISABLE_MARQUEE_LOADER is true. Remove or unset it before deploying.",
      );
    }
  }, []);

  if (disableAnimation) {
    return (
      <PageInViewContext.Provider value={true}>
        <HomeContent />
      </PageInViewContext.Provider>
    );
  }

  return (
    <>
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
              animationComplete
                ? "pointer-events-none opacity-0"
                : "opacity-100",
            )}
          >
            {!animationComplete && (
              <MarqueeLoader onComplete={() => setAnimationComplete(true)} />
            )}
          </div>
        </div>
      </PageInViewContext.Provider>
    </>
  );
};

export default HomePage;

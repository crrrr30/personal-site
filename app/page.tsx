"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef, useState, type FC } from "react";

import { HomeContent } from "@/app/components/HomeContent";
import { PageInViewContext } from "@/app/providers/PageInViewContext";
import flowy from "@/assets/flowy.png";
import { cn } from "@/lib/utils";

const disableAnimation = false;
const FRAME_SELECTOR = ".frame";
const LEFT_SELECTOR = ".left";
const RIGHT_SELECTOR = ".right";

gsap.registerPlugin(useGSAP);

const HomePage: FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [animationComplete, setAnimationComplete] = useState(disableAnimation);

  useGSAP(
    () => {
      if (disableAnimation) {
        setAnimationComplete(true);

        return;
      }

      gsap.set([LEFT_SELECTOR, RIGHT_SELECTOR], { x: 0 });

      const timeline = gsap.timeline({
        delay: 0.3,
        defaults: {
          duration: 1.1,
          ease: "expo.inOut",
        },
        onComplete: () => setAnimationComplete(true),
      });

      timeline
        // 0) unblur, restore y-offset, and show
        .to(
          FRAME_SELECTOR,
          {
            filter: "blur(0rem)",
            translate: "0 0",
            opacity: 1,
            duration: 0.8,
            ease: "expo",
          },
          0,
        )
        .add("shown", ">")
        // 1) zoom image frame outward and pull hero text apart
        .to(FRAME_SELECTOR, { scale: 1 }, "shown")
        .to(LEFT_SELECTOR, { x: "1rem" }, "shown")
        .to(RIGHT_SELECTOR, { x: "-1rem" }, "shown")
        // 2) dock image to the top by moving frame upward
        .to(FRAME_SELECTOR, { y: "-100vh", duration: 0.8 }, ">");

      return () => {
        timeline.kill();
      };
    },
    { scope: rootRef, dependencies: [disableAnimation] },
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
          className="fixed inset-0"
          style={{ pointerEvents: animationComplete ? "none" : "auto" }}
        >
          <div
            className="frame relative"
            style={{
              opacity: 0,
              scale: 0.5,
              filter: "blur(4rem)",
              translate: "0 48rem",

              width: "100vw",
              height: "100vh",
              transformOrigin: "center",
              willChange: animationComplete ? "auto" : "transform",
            }}
          >
            <Image
              fill
              priority
              alt=""
              className="h-full w-full object-cover"
              sizes="100vw"
              src={flowy}
            />

            <div
              className={cn(
                "absolute top-0 left-0 size-full",
                "flex flex-row justify-between items-center",
                "[&_p]:text-7xl [&_p]:text-white font-semibold",
              )}
            >
              <p
                className="left"
                style={{
                  willChange: animationComplete ? "auto" : "transform",
                }}
              >
                JONATHAN
              </p>
              <p
                className="right"
                style={{
                  willChange: animationComplete ? "auto" : "transform",
                }}
              >
                CUI
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageInViewContext.Provider>
  );
};

export default HomePage;

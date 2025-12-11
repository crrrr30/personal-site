import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Lenis from "lenis";
import { useEffect, useRef, type FC, type ReactNode } from "react";

import { BodyDivContext } from "@/app/providers/BodyDivContext";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

export type BodyDivProps = {
  className?: string;
  children: ReactNode;
};

export const BodyDiv: FC<BodyDivProps> = ({ className, children }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;

    if (!wrapper || !content) return;

    const lenis = new Lenis({
      // main div as scroll container
      wrapper,
      // child as scrollable content
      content,
      eventsTarget: wrapper, // listen for wheel/touch on that element
      smoothWheel: true,
      // syncTouch: true, -- ios support is so janky
      lerp: 0.1,
      autoRaf: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  useGSAP(() => {
    gsap.set(".cursor", { xPercent: -50, yPercent: -50 });

    let xTo = gsap.quickTo(".cursor", "x", { duration: 0.6, ease: "power3" });
    let yTo = gsap.quickTo(".cursor", "y", { duration: 0.6, ease: "power3" });

    window.addEventListener("mousemove", (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    });
  });

  return (
    <div
      ref={wrapperRef}
      className={cn("w-screeen h-screen overflow-x-hidden", className)}
      id="body-content"
    >
      <BodyDivContext.Provider value={wrapperRef}>
        <div ref={contentRef}>{children}</div>
      </BodyDivContext.Provider>
    </div>
  );
};

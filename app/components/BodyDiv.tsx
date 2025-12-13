"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { ReactLenis } from "lenis/react";
import { useEffect, useRef, useState, type FC, type ReactNode } from "react";

import { usePanels } from "@/app/hooks/usePanels";
import { BodyDivContext } from "@/app/providers/BodyDivContext";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export type BodyDivProps = {
  className?: string;
  children: ReactNode;
};

export const BodyDiv: FC<BodyDivProps> = ({ className, children }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [lenisReady, setLenisReady] = useState(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;

    if (!wrapper || !content) return;

    let currentScroll = 0;

    const lenis = new Lenis({
      // main div as scroll container
      wrapper,
      // child as scrollable content
      content,
      eventsTarget: wrapper, // listen for wheel/touch on that element
      smoothWheel: true,
      syncTouch: true,
      // -- disabled b/c of low performance for mobile devices
      // lerp: 0.1,
      autoRaf: true,
    });

    const handleLenisScroll = ({ scroll }: { scroll: number }) => {
      currentScroll = scroll;
      ScrollTrigger.update();
    };

    lenis.on("scroll", handleLenisScroll);

    ScrollTrigger.scrollerProxy(wrapper, {
      scrollTop(value) {
        if (typeof value === "number") {
          lenis.scrollTo(value, { immediate: true });
        }

        return currentScroll;
      },
      getBoundingClientRect: () => ({
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      }),
      pinType: wrapper.style.transform ? "transform" : "fixed",
    });

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => ScrollTrigger.refresh())
        : undefined;

    if (resizeObserver) {
      resizeObserver.observe(content);
    }

    setLenisReady(true);
    ScrollTrigger.refresh();

    return () => {
      setLenisReady(false);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      lenis.destroy();
    };
  }, []);

  useGSAP(() => {
    if (typeof window === "undefined") return;

    gsap.set(".cursor", { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(".cursor", "x", {
      duration: 0.6,
      ease: "power3",
    });
    const yTo = gsap.quickTo(".cursor", "y", {
      duration: 0.6,
      ease: "power3",
    });

    const handleMouseMove = (event: MouseEvent) => {
      xTo(event.clientX);
      yTo(event.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  });

  usePanels({
    scope: contentRef,
    scroller: wrapperRef,
    enabled: lenisReady,
    dependencies: [lenisReady],
  });

  return (
    <div
      ref={wrapperRef}
      className={cn("h-screen w-screen overflow-hidden", className)}
      id="body-content"
    >
      <ReactLenis />

      <div className="cursor">
        <div />
      </div>

      <BodyDivContext.Provider value={wrapperRef}>
        <div ref={contentRef}>{children}</div>
      </BodyDivContext.Provider>
    </div>
  );
};

// "use client";

// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
// import Lenis from "lenis";
// import { useEffect, useRef, useState, type FC, type ReactNode } from "react";

// import { usePanels } from "@/app/hooks/usePanels";
// import { BodyDivContext } from "@/app/providers/BodyDivContext";
// import { cn } from "@/lib/utils";

// gsap.registerPlugin(useGSAP, ScrollTrigger);

// export type BodyDivProps = {
//   className?: string;
//   children: ReactNode;
// };

// export const BodyDiv: FC<BodyDivProps> = ({ className, children }) => {
//   const wrapperRef = useRef<HTMLDivElement>(null);
//   const contentRef = useRef<HTMLDivElement>(null);
//   const [lenisReady, setLenisReady] = useState(false);
//   const [lenisActive, setLenisActive] = useState(false);

//   useEffect(() => {
//     if (typeof window === "undefined") return;

//     const mediaQuery = window.matchMedia("(pointer: coarse)");
//     const handleChange = (event?: MediaQueryListEvent) => {
//       const matches = event ? event.matches : mediaQuery.matches;

//       console.log(`setLenisActive: ${!matches}`);
//       setLenisActive(!matches);
//     };

//     handleChange();

//     if (mediaQuery.addEventListener) {
//       mediaQuery.addEventListener("change", handleChange);
//     } else {
//       mediaQuery.addListener(handleChange);
//     }

//     return () => {
//       if (mediaQuery.removeEventListener) {
//         mediaQuery.removeEventListener("change", handleChange);
//       } else {
//         mediaQuery.removeListener(handleChange);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     const wrapper = wrapperRef.current;
//     const content = contentRef.current;

//     if (!wrapper || !content || !lenisActive) return;

//     const lenis = new Lenis({
//       // main div as scroll container
//       wrapper,
//       // child as scrollable content
//       content,
//       eventsTarget: wrapper, // listen for wheel/touch on that element
//       smoothWheel: true,
//       // syncTouch: true, -- disabled b/c of low performance for mobile devices
//       lerp: 0.1,
//       autoRaf: false,
//     });

//     const handleLenisScroll = () => {
//       ScrollTrigger.update();
//     };

//     lenis.on("scroll", handleLenisScroll);

//     const ticker = (time: number) => {
//       lenis.raf(time * 1000);
//     };

//     gsap.ticker.add(ticker);
//     gsap.ticker.lagSmoothing(0);

//     ScrollTrigger.scrollerProxy(wrapper, {
//       scrollTop(value) {
//         if (typeof value === "number") {
//           lenis.scrollTo(value, { immediate: true });
//         }

//         return lenis.scroll;
//       },
//       getBoundingClientRect: () => ({
//         top: 0,
//         left: 0,
//         width: window.innerWidth,
//         height: window.innerHeight,
//       }),
//       pinType: wrapper.style.transform ? "transform" : "fixed",
//     });

//     const resizeObserver =
//       typeof ResizeObserver !== "undefined"
//         ? new ResizeObserver(() => {
//             lenis.resize();
//             ScrollTrigger.refresh();
//           })
//         : undefined;

//     if (resizeObserver) {
//       resizeObserver.observe(content);
//     }

//     setLenisReady(true);
//     ScrollTrigger.refresh();

//     return () => {
//       setLenisReady(false);
//       lenis.off("scroll", handleLenisScroll);
//       gsap.ticker.remove(ticker);
//       if (resizeObserver) {
//         resizeObserver.disconnect();
//       }
//       ScrollTrigger.scrollerProxy(
//         wrapper,
//         null as unknown as Record<string, never>,
//       );
//       lenis.destroy();
//     };
//   }, [lenisActive]);

//   useGSAP(() => {
//     if (typeof window === "undefined") return;

//     gsap.set(".cursor", { xPercent: -50, yPercent: -50 });

//     const xTo = gsap.quickTo(".cursor", "x", {
//       duration: 0.6,
//       ease: "power3",
//     });
//     const yTo = gsap.quickTo(".cursor", "y", {
//       duration: 0.6,
//       ease: "power3",
//     });

//     const handleMouseMove = (event: MouseEvent) => {
//       xTo(event.clientX);
//       yTo(event.clientY);
//     };

//     window.addEventListener("mousemove", handleMouseMove);

//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//     };
//   });

//   usePanels({
//     scope: contentRef,
//     scroller: lenisActive ? wrapperRef : undefined,
//     enabled: lenisActive ? lenisReady : true,
//     dependencies: [lenisReady, lenisActive],
//   });

//   const wrapperClasses = lenisActive
//     ? "h-screen w-screen overflow-hidden"
//     : "min-h-screen w-full overflow-x-hidden";

//   return (
//     <div
//       ref={wrapperRef}
//       className={cn(wrapperClasses, className)}
//       id="body-content"
//     >
//       <div className="cursor">
//         <div />
//       </div>

//       <BodyDivContext.Provider value={wrapperRef}>
//         <div ref={contentRef}>{children}</div>
//       </BodyDivContext.Provider>
//     </div>
//   );
// };

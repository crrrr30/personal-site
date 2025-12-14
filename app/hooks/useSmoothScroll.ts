import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect, useRef, type RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

export const useSmoothScroll = ({
  bodyDiv,
  contentRef,
  disable = false,
}: {
  bodyDiv: RefObject<HTMLElement | null>;
  contentRef: RefObject<HTMLElement | null>;
  disable?: boolean;
}) => {
  const lenisRef = useRef<Lenis>();

  useEffect(() => {
    if (disable) return;

    const wrapper = bodyDiv.current;
    const content = contentRef.current;

    if (!wrapper || !content) return;

    let currentScroll = 0;

    if (lenisRef.current != null) return;

    const lenis = new Lenis({
      // main div as scroll container
      wrapper,
      // child as scrollable content
      content,
      // listen for wheel/touch on that element
      eventsTarget: wrapper,

      smoothWheel: true,
      syncTouch: true,
      autoRaf: true,
    });

    lenisRef.current = lenis;

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

    ScrollTrigger.refresh();

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      lenis.destroy();
    };
  }, [bodyDiv, contentRef, disable]);
};

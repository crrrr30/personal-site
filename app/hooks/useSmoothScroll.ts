import Lenis from "lenis";
import { cancelFrame, frame } from "motion/react";
import {
  useEffect,
  useRef,
  type RefObject,
  type MutableRefObject,
} from "react";

interface UseSmoothScrollParams {
  bodyDiv: RefObject<HTMLElement | null>;
  contentRef: RefObject<HTMLElement | null>;
  disable?: boolean;
}

export const useSmoothScroll = ({
  bodyDiv,
  contentRef,
  disable = false,
}: UseSmoothScrollParams): MutableRefObject<Lenis | null> => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (disable) {
      lenisRef.current?.destroy();
      lenisRef.current = null;

      return;
    }

    const wrapper = bodyDiv.current;
    const content = contentRef.current;

    if (!wrapper || !content) return;
    if (lenisRef.current) return;

    const lenis = new Lenis({
      wrapper,
      content,
      eventsTarget: wrapper,
      smoothWheel: true,
      syncTouch: true,
      autoRaf: false,
    });

    lenisRef.current = lenis;

    // resize handling
    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => lenis.resize())
        : undefined;

    if (resizeObserver) {
      resizeObserver.observe(content);
    }

    // motion/react integration
    function update({ timestamp }: { timestamp: number }) {
      lenisRef.current?.raf(timestamp);
    }

    frame.update(update, true);

    return () => {
      resizeObserver?.disconnect();
      cancelFrame(update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [bodyDiv, contentRef, disable]);

  return lenisRef;
};

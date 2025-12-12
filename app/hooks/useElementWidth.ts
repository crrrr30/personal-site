import { type RefObject, useLayoutEffect, useRef, useState } from "react";

export function useElementWidth<T extends HTMLElement>(
  ref?: RefObject<T | null>,
) {
  const newRef = useRef<T | null>(null);
  const finalRef = ref ?? newRef;

  const [width, setWidth] = useState<number | null>(null);

  useLayoutEffect(() => {
    const elem = finalRef.current;

    if (!elem) return;

    // initial measure after first layout
    const measure = () => {
      const rect = elem.getBoundingClientRect();

      setWidth(rect.width);
    };

    measure();

    // update on resize
    let observer: ResizeObserver | null = null;

    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(() => {
        measure();
      });
      observer.observe(elem);
    } else {
      // fallback: window resize
      window.addEventListener("resize", measure);
    }

    return () => {
      if (observer) observer.disconnect();
      else window.removeEventListener("resize", measure);
    };
  }, []);

  return { finalRef, width };
}

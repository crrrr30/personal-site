import { useLayoutEffect, useRef, useState } from "react";

export function useElementWidth<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [width, setWidth] = useState<number | null>(null);

  useLayoutEffect(() => {
    const elem = ref.current;

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

  return { ref, width };
}

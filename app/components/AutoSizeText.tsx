import React, { useLayoutEffect, useState, useRef } from "react";

export function useElementSize<T extends HTMLElement>(ref: React.RefObject<T>) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const el = ref.current;

    if (!el) return;

    // initial size
    setSize({
      width: el.clientWidth,
      height: el.clientHeight,
    });

    if (typeof ResizeObserver === "undefined") {
      // fallback: no dynamic resize tracking
      return;
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === el) {
          const cr = entry.contentRect;

          setSize({ width: cr.width, height: cr.height });
        }
      }
    });

    observer.observe(el);

    return () => observer.disconnect();
  }, [ref]);

  return size;
}

type AutoFitTextProps = {
  text: string;
  minFontSize?: number; // px
  maxFontSize?: number; // px
  className?: string;
};

/**
 * AutoFitText
 *
 * - Stretches text to fill parent width (without overflowing) using binary search on font-size.
 * - Assumes parent is a block with a definite width.
 */
export const AutoFitText: React.FC<AutoFitTextProps> = ({
  text,
  minFontSize = 8,
  maxFontSize = 512,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);

  // track parent width; when it changes, we refit
  const { width: parentWidth } = useElementSize(containerRef);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const span = textRef.current;

    if (!container || !span) return;
    if (!parentWidth) return; // nothing to do until we know width

    // binary search over integer font sizes [lo, hi]
    let lo = minFontSize;
    let hi = maxFontSize;
    let best = minFontSize;

    // ensure measurement isn't affected by wrapping / weird white-space
    span.style.whiteSpace = "nowrap";

    // run ~log2(maxFontSize-minFontSize) steps, plus some margin
    for (let i = 0; i < 20 && lo <= hi; i++) {
      const mid = Math.floor((lo + hi) / 2);

      span.style.fontSize = `${mid}px`;

      // force layout read
      const textWidth = span.scrollWidth;

      if (textWidth <= parentWidth) {
        // fits; try bigger
        best = mid;
        lo = mid + 1;
      } else {
        // too big; go smaller
        hi = mid - 1;
      }
    }

    // apply the best size
    span.style.fontSize = `${best}px`;
  }, [text, parentWidth, minFontSize, maxFontSize]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* 
        span is visible; we just tweak its font-size imperatively.
        white-space is handled inside the effect. 
      */}
      <span ref={textRef} className="leading-none">
        {text}
      </span>
    </div>
  );
};

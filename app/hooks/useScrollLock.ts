"use client";

import { useEffect, type RefObject } from "react";

export const useScrollLock = ({
  active,
  scrollContainerRef,
}: {
  active: boolean;
  scrollContainerRef?: RefObject<HTMLElement>;
}) => {
  useEffect(() => {
    if (!active) {
      return;
    }

    if (typeof document === "undefined") {
      return;
    }

    const scrollContainer =
      scrollContainerRef?.current ?? document.documentElement;
    const previousOverflowY = scrollContainer.style.overflowY;
    const previousTouchAction = scrollContainer.style.touchAction;

    scrollContainer.style.overflowY = "hidden";
    scrollContainer.style.touchAction = "none";

    return () => {
      scrollContainer.style.overflowY = previousOverflowY;
      scrollContainer.style.touchAction = previousTouchAction;
    };
  }, [active, scrollContainerRef]);
};

"use client";

import { useCallback } from "react";

import { useBodyDivContext } from "@/app/providers/BodyDivContext";
import { useSmoothScrollContext } from "@/app/providers/SmoothScrollContext";

export function useScrollToSection() {
  const bodyDivRef = useBodyDivContext();
  const lenisRef = useSmoothScrollContext();

  return useCallback(
    (sectionId: string) => {
      if (typeof document === "undefined") return false;

      const target = document.getElementById(sectionId);

      if (!target) return false;

      const lenisInstance = lenisRef?.current;

      if (lenisInstance) {
        lenisInstance.scrollTo(target);

        return true;
      }

      const container = bodyDivRef?.current;

      if (container) {
        const containerRect = container.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();

        container.scrollTo({
          top: container.scrollTop + (targetRect.top - containerRect.top),
          behavior: "smooth",
        });

        return true;
      }

      target.scrollIntoView({ behavior: "smooth", block: "start" });

      return true;
    },
    [bodyDivRef, lenisRef],
  );
}

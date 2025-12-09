"use client";

import { useCallback } from "react";

import { useBodyDivContext } from "@/app/providers/BodyDivContext";

export function useScrollToSection() {
  const bodyDivRef = useBodyDivContext();

  return useCallback(
    (sectionId: string) => {
      if (typeof document === "undefined") return false;

      const target = document.getElementById(sectionId);

      if (!target) return false;

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
    [bodyDivRef],
  );
}

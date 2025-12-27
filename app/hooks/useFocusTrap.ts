"use client";

import { useEffect, type RefObject } from "react";

const DEFAULT_FOCUSABLE_SELECTORS = [
  "button:not([disabled])",
  "[href]",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(", ");

export const useFocusTrap = ({
  active,
  containerRef,
  focusableSelectors = DEFAULT_FOCUSABLE_SELECTORS,
}: {
  active: boolean;
  containerRef: RefObject<HTMLElement | null>;
  focusableSelectors?: string;
}) => {
  useEffect(() => {
    if (!active) {
      return;
    }

    if (typeof document === "undefined") {
      return;
    }

    const root = containerRef.current;

    if (!root) {
      return;
    }

    const previouslyFocusedElement =
      document.activeElement as HTMLElement | null;

    const getFocusableElements = () =>
      Array.from(root.querySelectorAll<HTMLElement>(focusableSelectors)).filter(
        (element) =>
          element.tabIndex !== -1 && !element.hasAttribute("disabled"),
      );

    const focusFirstElement = () => {
      const [firstElement] = getFocusableElements();

      firstElement?.focus();
    };

    focusFirstElement();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = getFocusableElements();

      if (focusableElements.length === 0) {
        event.preventDefault();

        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey) {
        if (activeElement === firstElement || !root.contains(activeElement)) {
          event.preventDefault();
          lastElement?.focus();
        }

        return;
      }

      if (activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    };

    const enforceFocus = (event: FocusEvent) => {
      if (!root.contains(event.target as Node)) {
        event.preventDefault();
        focusFirstElement();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("focusin", enforceFocus);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focusin", enforceFocus);
      previouslyFocusedElement?.focus();
    };
  }, [active, containerRef, focusableSelectors]);
};

"use client";

import type { DependencyList, RefObject } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type UsePanelsOptions = {
  /** Optional ref that scopes which DOM subtree we look in for panels */
  scope?: RefObject<HTMLElement | null>;
  /** Optional ref representing the scroll container (Lenis wrapper, etc.) */
  scroller?: RefObject<HTMLElement | null>;
  /** CSS selector used to find each panel */
  panelSelector?: string;
  /** CSS selector (relative to panel) used to find the content wrapper */
  innerSelector?: string;
  /** Skip animating the last panel (matches original example) */
  skipLast?: boolean;
  /** Target scale for the pinned panel */
  minScale?: number;
  /** Target opacity for the pinned panel */
  minOpacity?: number;
  /** Additional dependencies that should retrigger the hook */
  dependencies?: DependencyList;
  /** Allow consumers to delay initialization until external state is ready */
  enabled?: boolean;
};

export const usePanels = ({
  scope,
  scroller,
  panelSelector = "[data-panel]",
  innerSelector = "[data-panel-inner]",
  skipLast = true,
  minScale = 0.7,
  minOpacity = 0.5,
  dependencies = [],
  enabled = true,
}: UsePanelsOptions = {}) => {
  useGSAP(
    () => {
      if (!enabled || typeof window === "undefined") return;

      const getPanels = () => {
        if (scope?.current) {
          return Array.from(
            scope.current.querySelectorAll<HTMLElement>(panelSelector),
          );
        }

        return Array.from(
          document.querySelectorAll<HTMLElement>(panelSelector),
        );
      };

      const timelinesByPanel = new Map<HTMLElement, gsap.core.Timeline>();

      const cleanupPanel = (panel: HTMLElement) => {
        const timeline = timelinesByPanel.get(panel);

        if (timeline) {
          const trigger = timeline.scrollTrigger;

          if (trigger) {
            trigger.kill(true);
          }

          timeline.kill();
          timelinesByPanel.delete(panel);
        }
        panel.style.removeProperty("margin-bottom");
      };

      const buildTimelines = () => {
        timelinesByPanel.forEach((_, panel) => cleanupPanel(panel));

        const panels = getPanels();

        if (!panels.length) return;

        if (skipLast) {
          panels.pop();
        }

        const scrollerElement =
          scroller?.current ?? scope?.current ?? undefined;

        panels.forEach((panel) => {
          const inner = panel.querySelector<HTMLElement>(innerSelector);

          if (!inner) return;

          const panelHeight = inner.offsetHeight;
          const windowHeight = window.innerHeight;
          const fakeScrollDistance = Math.max(panelHeight - windowHeight, 0);
          const pinDistance = panelHeight || windowHeight;
          const fakeScrollRatio = pinDistance
            ? fakeScrollDistance / pinDistance
            : 0;

          if (fakeScrollDistance) {
            panel.style.marginBottom = `${fakeScrollDistance}px`;
          } else {
            panel.style.removeProperty("margin-bottom");
          }

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: panel,
              scroller: scrollerElement,
              start: "top top",
              end: `+=${pinDistance}`,
              pinSpacing: false,
              pin: true,
              scrub: true,
              invalidateOnRefresh: true,
            },
          });

          if (fakeScrollRatio) {
            timeline.to(inner, {
              yPercent: -100,
              y: windowHeight,
              duration: 1 / (1 - fakeScrollRatio) - 1,
              ease: "none",
            });
          }

          timeline
            .fromTo(
              panel,
              { scale: 1, opacity: 1 },
              { scale: minScale, opacity: minOpacity, duration: 0.6 },
            )
            .to(panel, { opacity: 0, duration: 0.4 });

          timelinesByPanel.set(panel, timeline);
        });
      };

      buildTimelines();

      const handleRefresh = () => {
        buildTimelines();
      };

      const handleResize = () => {
        ScrollTrigger.refresh();
      };

      ScrollTrigger.addEventListener("refreshInit", handleRefresh);
      window.addEventListener("resize", handleResize);
      ScrollTrigger.refresh();

      return () => {
        ScrollTrigger.removeEventListener("refreshInit", handleRefresh);
        window.removeEventListener("resize", handleResize);
        timelinesByPanel.forEach((_, panel) => cleanupPanel(panel));
      };
    },
    {
      scope,
      dependencies: [
        scope?.current,
        scroller?.current,
        panelSelector,
        innerSelector,
        skipLast,
        minScale,
        minOpacity,
        enabled,
        ...dependencies,
      ],
    },
  );
};

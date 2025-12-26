"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type HTMLAttributes,
} from "react";

import { useElementSize } from "@/app/hooks/useElementWidth";
import flowy from "@/assets/flowy.png";
import mainShot from "@/assets/main-shot.png";
import secondaryPortrait from "@/assets/secondary-portrait-alt.png";
import sideShot from "@/assets/side-shot.png";
import { SplitText, type SplitTextProps } from "@/components/SplitText";
import { portfolioLink } from "@/lib/links";
import { cn } from "@/lib/utils";

import "./willem.css";

gsap.registerPlugin(useGSAP);

const HERO_TEXT = {
  first: "JONATHAN",
  last: "CUI",
  footer: "Jonathan Cui — Portfolio",
};

const WILLEM_IMAGES = {
  base: flowy,
  extras: [mainShot, secondaryPortrait, sideShot],
};

const NAV_LINKS = [
  { href: "#projects", label: "Projects," },
  { href: portfolioLink, label: "Portfolio" },
  { href: "#notes", label: "Notes," },
];

const CTA_LINK = {
  href: "mailto:hello@jonathancui.com",
  label: "Get in touch",
};

const STATIC_TEXT_ANIMATION: Pick<
  SplitTextProps,
  "from" | "to" | "duration" | "splitDelay"
> = {
  duration: 0,
  splitDelay: 0,
  from: { opacity: 1, y: 0 },
  to: { opacity: 1, y: 0 },
};

export interface WillemTimelineOptions {
  onStart?: () => void;
  onComplete?: () => void;
  unlockOnComplete?: boolean;
  frameOffset?: number;
}

export const WILLEM_SELECTORS = {
  frame: ".willem__growing-image",
};

export const createWillemTimeline = (
  scope: HTMLElement | null,
  options?: WillemTimelineOptions,
) => {
  if (!scope) return gsap.timeline();

  const select = gsap.utils.selector(scope);
  const selectNodes = (target: string) =>
    (select(target) as HTMLElement[]) ?? [];

  const elements = {
    loadingLetters: selectNodes("[data-willem-loading] .split-char"),
    box: selectNodes(".willem-loader__box"),
    growingImage: selectNodes(WILLEM_SELECTORS.frame),
    headingStart: selectNodes(".willem__h1-start"),
    headingEnd: selectNodes(".willem__h1-end"),
    coverImageExtra: selectNodes(".willem__cover-image-extra"),
    headerLetter: selectNodes(".willem-header__title .split-char"),
    navLinks: selectNodes(".willem-nav__link"),
  };

  const runIfPresent = (
    nodes: HTMLElement[],
    tween: (targets: HTMLElement[]) => gsap.core.Timeline,
  ) => {
    if (!nodes.length) return;
    tween(nodes);
  };

  const frameOffset = options?.frameOffset ?? 0;

  const timeline = gsap.timeline({
    defaults: { ease: "expo.inOut" },
    onStart: () => {
      scope.classList.remove("is--hidden");
      options?.onStart?.();
    },
    onComplete: () => {
      if (options?.unlockOnComplete !== false) {
        scope.classList.remove("is--loading");
      }
      options?.onComplete?.();
    },
  });

  // show letters
  runIfPresent(elements.loadingLetters, (targets) =>
    timeline.to(targets, {
      opacity: 1,
      // stagger: 0,
      duration: 5,
    }),
  );
  runIfPresent(elements.loadingLetters, (targets) =>
    timeline.fromTo(
      targets,
      {
        y: "-8rem",
      },
      {
        y: 0,
        stagger: 0.025,
        duration: 1.25,
      },
    ),
  );

  // show img width
  runIfPresent(elements.box, (targets) =>
    timeline.fromTo(
      targets,
      {
        width: "0em",
      },
      {
        width: "1em",
        duration: 1000.25,
      },
      "< 1.25",
    ),
  );

  runIfPresent(elements.growingImage, (targets) =>
    timeline.fromTo(
      targets,
      {
        width: "0%",
      },
      {
        width: "100%",
        duration: 1.25,
      },
      "<",
    ),
  );

  runIfPresent(elements.headingStart, (targets) =>
    timeline.fromTo(
      targets,
      {
        x: "0em",
      },
      {
        x: "-0.05em",
        duration: 1.25,
      },
      "<",
    ),
  );

  runIfPresent(elements.headingEnd, (targets) =>
    timeline.fromTo(
      targets,
      {
        x: "0em",
      },
      {
        x: "0.05em",
        duration: 1.25,
      },
      "<",
    ),
  );

  runIfPresent(elements.coverImageExtra, (targets) =>
    timeline.fromTo(
      targets,
      {
        opacity: 1,
      },
      {
        opacity: 0,
        duration: 0.05,
        ease: "none",
        stagger: 0.5,
      },
      "-=0.05",
    ),
  );

  if (elements.growingImage.length) {
    timeline.addLabel("startGrowImage", "< 1.25");

    timeline.to(
      elements.growingImage,
      {
        width: "100vw",
        height: "100dvh",
        duration: 2,
      },
      "startGrowImage",
    );
    runIfPresent(elements.loadingLetters, (targets) =>
      timeline.to(
        targets,
        {
          opacity: 0,
          duration: 1.25,
        },
        "startGrowImage",
      ),
    );

    if (frameOffset) {
      timeline.to(
        elements.growingImage,
        {
          x: -frameOffset,
          duration: 2,
        },
        "<",
      );
    }
  }

  runIfPresent(elements.box, (targets) =>
    timeline.to(
      targets,
      {
        width: "100vw",
        duration: 2,
      },
      "<",
    ),
  );

  runIfPresent(elements.headerLetter, (targets) =>
    timeline.from(
      targets,
      {
        yPercent: 100,
        duration: 1.25,
        ease: "expo.out",
        stagger: 0.025,
      },
      "< 1.2",
    ),
  );

  runIfPresent(elements.navLinks, (targets) =>
    timeline.from(
      targets,
      {
        yPercent: 100,
        duration: 1.25,
        ease: "expo.out",
        stagger: 0.1,
      },
      "<",
    ),
  );

  return timeline;
};

interface WillemSplitTextProps extends Omit<SplitTextProps, "splitType"> {}

const WillemSplitText = memo(function WillemSplitTextComponent({
  className,
  ...rest
}: WillemSplitTextProps) {
  return (
    <SplitText
      {...STATIC_TEXT_ANIMATION}
      {...rest}
      className={cn("willem__split-text", className)}
      splitType="chars"
      tag={rest.tag ?? "span"}
    />
  );
});

export interface WillemProps extends HTMLAttributes<HTMLElement> {
  autoPlay?: boolean;
  onAnimationComplete?: () => void;
  onFrameOffsetChange?: (offset: number) => void;
}

export const Willem = forwardRef<HTMLElement | null, WillemProps>(
  function Willem(
    {
      className,
      autoPlay = true,
      onAnimationComplete,
      onFrameOffsetChange,
      ...rest
    },
    forwardedRef,
  ) {
    const localRef = useRef<HTMLElement | null>(null);
    const startMeasure = useElementSize<HTMLDivElement>();
    const endMeasure = useElementSize<HTMLDivElement>();
    const emittedOffsetRef = useRef<number | null>(null);

    const hasValidWidths = useMemo(() => {
      const startWidth = startMeasure.width ?? 0;
      const endWidth = endMeasure.width ?? 0;

      return startWidth > 0 && endWidth > 0;
    }, [endMeasure.width, startMeasure.width]);

    const frameOffset = useMemo(() => {
      if (
        !hasValidWidths ||
        startMeasure.width == null ||
        endMeasure.width == null
      ) {
        return null;
      }

      return (startMeasure.width - endMeasure.width) / 2;
    }, [endMeasure.width, hasValidWidths, startMeasure.width]);

    const assignRef = useCallback(
      (node: HTMLElement | null) => {
        localRef.current = node;

        if (typeof forwardedRef === "function") {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      },
      [forwardedRef],
    );

    useEffect(() => {
      if (frameOffset == null) return;
      if (emittedOffsetRef.current === frameOffset) return;

      emittedOffsetRef.current = frameOffset;
      onFrameOffsetChange?.(frameOffset);
    }, [frameOffset, onFrameOffsetChange]);

    useGSAP(
      () => {
        if (!autoPlay || frameOffset == null) return;

        const timeline = createWillemTimeline(localRef.current, {
          onComplete: onAnimationComplete,
          frameOffset,
        });

        return () => {
          timeline.kill();
        };
      },
      {
        scope: localRef,
        dependencies: [autoPlay, frameOffset, onAnimationComplete],
      },
    );

    return (
      <section
        ref={assignRef}
        className={cn("willem-header is--loading is--hidden", className)}
        {...rest}
      >
        <div data-willem-loading className="willem-loader">
          <div className="willem__h1">
            <div
              ref={startMeasure.ref}
              aria-hidden="true"
              className="willem__h1-start"
            >
              <WillemSplitText
                className="willem__heading-text"
                text={HERO_TEXT.first}
              />
            </div>
            <div className="willem-loader__box">
              <div className="willem-loader__box-inner">
                <div className="willem__growing-image">
                  <div className="willem__growing-image-wrap">
                    {WILLEM_IMAGES.extras.map((src, index) => (
                      <Image
                        key={index}
                        alt=""
                        className={cn(
                          "willem__cover-image-extra",
                          `is--${index + 1}`,
                        )}
                        loading="lazy"
                        src={src}
                      />
                    ))}
                    <Image
                      alt=""
                      className="willem__cover-image"
                      loading="lazy"
                      src={WILLEM_IMAGES.base}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              ref={endMeasure.ref}
              aria-hidden="true"
              className="willem__h1-end"
            >
              <WillemSplitText
                className="willem__heading-text"
                text={HERO_TEXT.last}
              />
            </div>
          </div>
        </div>
        <div className="willem-header__content">
          <div className="willem-header__top">
            <nav aria-label="Primary" className="willem-nav">
              <div className="willem-nav__start">
                <a className="willem-nav__link" href="#home">
                  Jonathan Cui ©
                </a>
              </div>
              <div className="willem-nav__end">
                <div className="willem-nav__links">
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link.href}
                      className="willem-nav__link"
                      href={link.href}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
                <div className="willem-nav__cta">
                  <a className="willem-nav__link" href={CTA_LINK.href}>
                    {CTA_LINK.label}
                  </a>
                </div>
              </div>
            </nav>
          </div>
          <div className="willem-header__bottom">
            <div aria-label={HERO_TEXT.footer} className="willem-header__title">
              <WillemSplitText
                className="willem-header__title-text"
                text={HERO_TEXT.footer}
              />
            </div>
          </div>
        </div>
      </section>
    );
  },
);

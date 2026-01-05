"use client";

import { motion, stagger, useAnimate } from "motion/react";
import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useRef } from "react";

import imgD from "@/assets/flowy.png";
import imgA from "@/assets/main-shot.png";
import imgB from "@/assets/secondary-portrait-alt.png";
import imgC from "@/assets/side-shot.png";
import { appEasing } from "@/lib/animations";
import { cn } from "@/lib/utils";

import "./MarqueeLoader.css";

interface MarqueeLoaderProps {
  className?: string;
  onComplete?: () => void;
}

type LoaderTextColumnConfig = {
  id: string;
  tokens: readonly string[];
};

type LoaderImageVariant = "base" | "overlay";

type LoaderImageConfig = {
  alt: string;
  id: string;
  src: StaticImageData;
  variant: LoaderImageVariant;
};

const TEXT_COLUMNS: readonly LoaderTextColumnConfig[] = [
  { id: "given-name", tokens: "Jonathan".split("") },
  { id: "family-name", tokens: "Cui".split("") },
] as const;

const [givenNameColumn, familyNameColumn] = TEXT_COLUMNS;

const IMAGE_LAYERS: readonly LoaderImageConfig[] = [
  {
    id: "primary",
    alt: "Primary portrait of Jonathan",
    src: imgA,
    variant: "base",
  },
  {
    id: "secondary",
    alt: "Secondary portrait",
    src: imgB,
    variant: "overlay",
  },
  {
    id: "profile",
    alt: "Side profile portrait",
    src: imgC,
    variant: "overlay",
  },
  {
    id: "flow",
    alt: "Flowing abstract illustration",
    src: imgD,
    variant: "overlay",
  },
] as const;

const overlayLayers = IMAGE_LAYERS.slice(1);
const viewportLayerId = IMAGE_LAYERS[IMAGE_LAYERS.length - 1]?.id ?? "flow";

const loadingEase = appEasing.ease;
const phaseOneTiming = { duration: 1.25, ease: loadingEase } as const;
const fadeInTiming = { delay: 0.25, duration: 0 } as const;
const exitTiming = { duration: 1.25, ease: loadingEase } as const;
const LOADER_IMAGE_SIZES = "(max-width: 768px) 80vw, 30vw";

export function MarqueeLoader({ className, onComplete }: MarqueeLoaderProps) {
  const [ref, animate] = useAnimate();
  const isCancelledRef = useRef(false);

  const handleSkip = useCallback(() => {
    if (isCancelledRef.current) {
      return;
    }

    isCancelledRef.current = true;
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    isCancelledRef.current = false;

    const animateLoader = async () => {
      await animate(
        "[data-loader-token]",
        { y: 0 },
        {
          duration: 1.25,
          delay: stagger(0.025),
          ease: loadingEase,
        },
      );

      await animate(
        "[data-loader-images]",
        { width: "fit-content" },
        phaseOneTiming,
      );
      await animate(
        "[data-loader-image='primary']",
        { width: "fit-content" },
        phaseOneTiming,
      );

      for (const layer of overlayLayers) {
        await animate(
          `[data-loader-image='${layer.id}']`,
          { opacity: 1 },
          fadeInTiming,
        );
      }

      await sleep(0.2);

      const rootElement = ref.current;

      if (!rootElement) {
        return;
      }

      await Promise.all([
        animate(
          `[data-loader-image='${viewportLayerId}']`,
          { width: "100vw", height: "100vh" },
          phaseOneTiming,
        ),
        animate(
          "[data-loader-images]",
          { width: "100vw", height: "100vh" },
          phaseOneTiming,
        ),
        animate(
          rootElement,
          {
            width: "300vw",
            x: "-100vw",
          },
          phaseOneTiming,
        ),
        ...TEXT_COLUMNS.map(({ id }) =>
          animate(
            `[data-loader-text='${id}']`,
            { width: "100vw" },
            phaseOneTiming,
          ),
        ),
      ]);

      await animate(rootElement, { y: "-100%" }, exitTiming);

      if (!isCancelledRef.current) {
        onComplete?.();
      }
    };

    void animateLoader();

    return () => {
      isCancelledRef.current = true;
    };
  }, [animate, onComplete, ref]);

  return (
    <motion.div
      ref={ref}
      data-loader-root
      layout
      className={cn("marquee-loader", className)}
    >
      <button
        className="marquee-loader__skip underlined-link"
        type="button"
        onClick={handleSkip}
      >
        Skip animation
      </button>
      <div className="marquee-loader__inner">
        <LoaderTextColumn column={givenNameColumn} />

        <motion.div
          data-loader-images
          layout
          className="marquee-loader__images"
        >
          {IMAGE_LAYERS.map((layer) => (
            <LoaderImage key={layer.id} layer={layer} />
          ))}
        </motion.div>

        <LoaderTextColumn column={familyNameColumn} />
      </div>
    </motion.div>
  );
}

const LoaderTextColumn = ({ column }: { column: LoaderTextColumnConfig }) => (
  <p className="marquee-loader__text" data-loader-text={column.id}>
    {column.tokens.map((token, index) => (
      <span
        key={`${column.id}-${token}-${index}`}
        data-loader-token
        className="marquee-loader__token"
      >
        {token}
      </span>
    ))}
  </p>
);

const LoaderImage = ({ layer }: { layer: LoaderImageConfig }) => (
  <div
    className={cn(
      "marquee-loader__image",
      layer.variant === "overlay"
        ? "marquee-loader__image--overlay"
        : "marquee-loader__image--base",
    )}
    data-loader-image={layer.id}
  >
    <div className="marquee-loader__image-inner">
      <Image
        fill
        alt={layer.alt}
        className="object-cover"
        sizes={LOADER_IMAGE_SIZES}
        src={layer.src}
      />
    </div>
  </div>
);

const sleep = (seconds: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};

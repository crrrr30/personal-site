"use client";

import { ReactLenis } from "lenis/react";
import { useRef, type FC, type ReactNode } from "react";

import { useCoarse } from "@/app/hooks/useCoarse";
import { useCursor } from "@/app/hooks/useCursor";
import { useSmoothScroll } from "@/app/hooks/useSmoothScroll";
import { BodyDivContext } from "@/app/providers/BodyDivContext";
import { cn } from "@/lib/utils";

export type BodyDivProps = {
  className?: string;
  children: ReactNode;
};

export const BodyDiv: FC<BodyDivProps> = ({ className, children }) => {
  const bodyDiv = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const disableSmoothScroll = useCoarse() ?? true;

  useSmoothScroll({
    bodyDiv,
    contentRef,
    disable: disableSmoothScroll,
  });

  const { Cursor } = useCursor();

  return (
    <div
      ref={bodyDiv}
      className={cn(
        "h-screen w-screen overflow-x-hidden",
        disableSmoothScroll ? "overflow-y-auto" : "overflow-y-hidden",
        className,
      )}
      id="body-content"
    >
      <ReactLenis />

      <Cursor />

      <BodyDivContext.Provider value={bodyDiv}>
        <div ref={contentRef}>{children}</div>
      </BodyDivContext.Provider>
    </div>
  );
};

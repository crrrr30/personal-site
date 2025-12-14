"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useMemo, useRef } from "react";

gsap.registerPlugin(useGSAP);

export const useCursor = () => {
  const cursorRef = useRef(null);

  const Cursor = useMemo(() => {
    const CursorComponent = () => (
      <div ref={cursorRef} className="cursor">
        <div />
      </div>
    );

    CursorComponent.displayName = "Cursor";

    return CursorComponent;
  }, [cursorRef]);

  useGSAP(
    () => {
      if (typeof window === "undefined") return;

      const cursor = cursorRef.current;

      if (!cursor) return;

      gsap.set(cursor, { xPercent: -50, yPercent: -50 });

      const xTo = gsap.quickTo(cursor, "x", {
        duration: 0.6,
        ease: "power3",
      });
      const yTo = gsap.quickTo(cursor, "y", {
        duration: 0.6,
        ease: "power3",
      });

      const handleMouseMove = (event: MouseEvent) => {
        xTo(event.clientX);
        yTo(event.clientY);
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    },
    { scope: cursorRef, dependencies: [] },
  );

  return { Cursor };
};

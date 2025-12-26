"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useMemo, useRef } from "react";

gsap.registerPlugin(useGSAP);

export const useCursor = () => {
  const cursorRef = useRef(null);

  const Cursor = useMemo(
    () =>
      function Cursor() {
        return (
          <div ref={cursorRef} className="cursor">
            <div />
          </div>
        );
      },
    [cursorRef],
  );

  useGSAP(
    () => {
      if (typeof window === "undefined") return;

      const cursor = cursorRef.current;

      if (!cursor) return;

      gsap.set(cursor, { xPercent: -50, yPercent: -50 });

      const opacityTo = gsap.quickTo(cursor, "opacity", {
        duration: 0.6,
        ease: "power3",
      });
      const xTo = gsap.quickTo(cursor, "x", {
        duration: 0.6,
        ease: "power3",
      });
      const yTo = gsap.quickTo(cursor, "y", {
        duration: 0.6,
        ease: "power3",
      });

      const firstMovement = false;

      const handleMouseMove = (event: MouseEvent) => {
        if (firstMovement) {
          opacityTo(1);
        }

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

import type { FC } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

export const HamburgerButton: FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const { contextSafe } = useGSAP(
    () => {
      const offset = 4;

      gsap.set(topRef.current, {
        y: -offset,
        transformOrigin: "50% 50%",
      });

      gsap.set(bottomRef.current, {
        y: offset,
        transformOrigin: "50% 50%",
      });

      tlRef.current = gsap
        .timeline({
          paused: true,
          defaults: {
            duration: 1,
            ease: "expo.inOut",
          },
        })
        .to(
          topRef.current,
          {
            y: 0,
            rotation: 45,
          },
          0, // start at time 0
        )
        .to(
          bottomRef.current,
          {
            y: 0,
            rotation: -45,
          },
          0, // same time
        )
        .reverse();
    },
    { scope: buttonRef },
  );

  const handleToggle = contextSafe(() => {
    if (!tlRef.current) return;
    const nextOpen = !isOpen;

    setIsOpen(nextOpen);
    tlRef.current.reversed(!nextOpen);
  });

  return (
    <button
      ref={buttonRef}
      aria-expanded={isOpen}
      aria-label="Toggle navigation"
      className="inline-flex h-8 w-8 items-center justify-center rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      type="button"
      onClick={handleToggle}
    >
      <div className="relative h-6 w-6">
        <div
          ref={topRef}
          className="absolute left-0 right-0 top-1/2 mt-[-1px] h-[2px] rounded-full bg-current"
        />
        <div
          ref={bottomRef}
          className="absolute left-0 right-0 top-1/2 mt-[-1px] h-[2px] rounded-full bg-current"
        />
      </div>
    </button>
  );
};

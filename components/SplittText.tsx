import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, SplitText);

export function SplitHeadline({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // split the h1 inside our container
      const split = SplitText.create(
        containerRef.current.querySelector(".split"),
        {
          type: "chars, words",
        },
      );

      gsap.from(split.chars, {
        opacity: 0,
        y: 80,
        ease: "back.out",
        duration: 0.8,
        stagger: 0.04,
      });
    },
    { scope: containerRef }, // ensures selectors are scoped & auto cleanup via context
  );

  return (
    <div ref={containerRef}>
      <h1 className={cn("split", className)}>hello splittext</h1>
    </div>
  );
}

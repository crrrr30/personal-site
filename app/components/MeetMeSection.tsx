import Image from "next/image";
import { useRef } from "react";

import { useBlurFade } from "@/app/hooks/useBlurFade";
import mainShot from "@/assets/main-shot.png";
import reading from "@/assets/reading.png";
import { Divider } from "@/components/Divider";
import { cn } from "@/lib/utils";

export const MeetMeSection = () => {
  const ref = useRef(null);
  const BlurFade = useBlurFade(ref);

  return (
    <section
      ref={ref}
      className={cn("relative overflow-hidden", "bg-gray-100")}
      data-panel="meet-me"
    >
      <Divider />

      <div className="flex flex-row" data-panel-inner="">
        <div className="w-full md:w-1/2">
          <BlurFade>
            <Image alt={""} src={mainShot} />
          </BlurFade>
        </div>

        <div className="absolute inset-0">
          <div className="mx-auto max-w-container h-full">
            <div
              className={cn(
                "ml-auto w-1/2 h-full",
                "px-page py-24",
                "flex flex-col justify-between",
              )}
            >
              <div className="flex justify-center ml-auto size-6">
                <BlurFade delay={0.4}>
                  <p>02</p>
                </BlurFade>
              </div>

              <div className="relative h-full">
                <span className="flex flex-col h-full">
                  {["MEET", "JONATHAN", "CUI"].map((word, i) => (
                    <BlurFade key={i} delay={0.6 + 0.2 * i}>
                      <p className="text-brand text-7xl font-medium">{word}</p>
                    </BlurFade>
                  ))}
                </span>

                <div className="absolute bottom-0 right-0 w-24 h-24">
                  <BlurFade delay={0.6}>
                    <Image
                      alt=""
                      className="h-full w-full object-cover"
                      src={reading}
                    />
                  </BlurFade>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

"use client";

import Image from "next/image";
import { useRef } from "react";

import { useBlurFade } from "@/app/hooks/useBlurFade";
import { useDivider } from "@/app/hooks/useDivider";
import mainShot from "@/assets/main-shot.png";
import reading from "@/assets/reading.png";
import { cn } from "@/lib/utils";

export const MeetMeSection = () => {
  const ref = useRef(null);
  const BlurFade = useBlurFade(ref);
  const Divider = useDivider(ref);

  return (
    <>
      <section
        ref={ref}
        className={cn("relative overflow-hidden", "bg-gray-100")}
        data-panel="meet-me"
      >
        <Divider className="hidden md:flex" />

        <div className="flex flex-col md:flex-row" data-panel-inner="">
          <div className="w-full flex flex-row justify-end md:justify-start">
            <div className="w-full md:w-1/2">
              <BlurFade className="w-[150vw] md:w-full">
                <Image alt="" src={mainShot} />
              </BlurFade>
            </div>
          </div>

          <div className="absolute inset-0">
            <div className="mx-auto max-w-container h-full">
              <div
                className={cn(
                  "relative",
                  "md:ml-auto md:w-1/2 h-full",
                  "px-page py-12 md:py-24",
                  "flex flex-col justify-between",
                )}
              >
                <div className="text-white md:text-black flex justify-center md:ml-auto size-6">
                  <BlurFade delay={0.4}>
                    <p>02</p>
                  </BlurFade>
                </div>

                <span className="flex flex-col">
                  {["MEET", "JONATHAN", "CUI"].map((word, i) => (
                    <BlurFade key={i} delay={0.6 + 0.2 * i}>
                      <p
                        className={cn(
                          "text-white md:text-brand",
                          "text-7xl",
                          "tracking-tighter font-light md:font-medium",
                        )}
                      >
                        {word}
                      </p>
                    </BlurFade>
                  ))}
                </span>

                <div className="hidden md:block absolute bottom-0 right-0 w-24 h-24">
                  <BlurFade delay={0.6}>
                    <Image
                      alt=""
                      className="h-full w-full object-cover"
                      src={reading}
                    />
                  </BlurFade>
                </div>
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

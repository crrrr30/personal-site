"use client";

import { IconServer } from "justd-icons";
import Image from "next/image";
import { useRef, type FC } from "react";

import { useBlurFade } from "@/app/hooks/useBlurFade";
import { useScrollToSection } from "@/app/hooks/useScrollToSection";
import barcode from "@/assets/barcode.png";
import flowy from "@/assets/flowy.png";
import sideShot from "@/assets/side-shot.png";
import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";
import { Spacer } from "@/components/Spacer";
import { cn } from "@/lib/utils";

const sectionHeight = "h-[54rem]";
const halfSectionHeight = "h-[27rem]";
const topHalfSectionHeight = "top-[27rem]";

export const HeroSection: FC = () => {
  const scrollToSection = useScrollToSection();

  const ref = useRef(null);
  const BlurFade = useBlurFade(ref);

  return (
    <section
      ref={ref}
      className={cn("relative overflow-hidden", sectionHeight)}
      data-panel="hero"
    >
      <div
        className="relative mx-auto max-w-container h-full flex flex-col"
        data-panel-inner=""
      >
        <Divider className="full-bleed" />

        <Divider
          vertical
          className={"absolute left-[50%] h-[200%]"}
          delay={0.5}
          from="start"
        />

        {/* bottom-right section */}
        <div
          className={cn(
            "absolute bottom-16 right-page w-[25rem] -z-0",
            "flex flex-col",
          )}
        >
          <BlurFade delay={0.6}>
            <Image alt="" src={flowy} />
          </BlurFade>

          <Spacer h={1.5} />

          <BlurFade delay={0.8}>
            <div className="flex flex-row justify-between items-start">
              <Image alt={""} height={32} src={barcode} />
              <p className="leading-none">
                <b>2025</b>
              </p>
            </div>
          </BlurFade>

          <Spacer h={1} />

          <BlurFade delay={1.0}>
            <p className="font-medium tracking-[0.24rem]">JONATHAN CUI</p>
            <p className="text-sm">San Diego, CA</p>

            <Spacer h={1.5} />

            <div className="flex flex-row gap-8">
              <Button onPress={() => scrollToSection("projects")}>
                PROJECTS
              </Button>
              <Button
                variant="outline"
                onPress={() => scrollToSection("notes")}
              >
                NOTES
              </Button>
            </div>
          </BlurFade>
        </div>

        {/* main hero text */}
        <BlurFade delay={0.6} direction="right">
          <div
            className={cn(
              halfSectionHeight,
              "px-page",
              "flex flex-col justify-center",
            )}
          >
            <h1
              className={cn(
                "hidden md:block",
                "text-brand text-[12rem] leading-none font-bold",
              )}
            >
              JONATHAN
            </h1>

            <div className={cn("flex md:hidden", "flex-col")}>
              <h1
                className={cn(
                  "block md:hidden",
                  "absolute top-16 left-16",
                  "text-brand text-9xl leading-none font-bold",
                )}
              >
                JONA
              </h1>
              <h1
                className={cn(
                  "block md:hidden",
                  "absolute top-16 left-16",
                  "text-brand text-9xl leading-none font-bold",
                )}
              >
                THAN
              </h1>
            </div>
          </div>
        </BlurFade>

        {/* bottom-left section */}
        <div
          className={cn(
            "absolute w-[50%]",
            topHalfSectionHeight,
            halfSectionHeight,
          )}
        >
          <Divider delay={1} from="end" />

          <div className="px-page py-16 h-full flex flex-col justify-between">
            <BlurFade delay={0.8}>
              <div className="flex justify-end">
                <p>01</p>
              </div>
            </BlurFade>

            <BlurFade delay={1.0}>
              <div className="bg-black w-12 h-12 flex justify-center items-center">
                <IconServer className="w-6 h-6" color="white" />
              </div>
            </BlurFade>

            <BlurFade delay={1.2}>
              <div className={cn("w-[20rem]", "flex flex-col gap-4")}>
                <p>SOFTWARE ENGINEER & RESEARCHER</p>
                <p className="text-gray-600">
                  BUILDING PRODUCTION-READY AI SYSTEMS, FROM MICRO-VMS TO
                  SUPPORT TOOLING AT STARLINK.
                </p>
              </div>
            </BlurFade>
          </div>
        </div>

        {/* portrait overlay on main hero text */}
        <div className="absolute top-[3.5rem] left-[24rem]">
          <BlurFade
            className="w-[7.5rem]"
            delay={1}
            direction="down"
            offset="6em"
          >
            <Image alt={""} src={sideShot} />
          </BlurFade>
        </div>
      </div>
    </section>
  );
};

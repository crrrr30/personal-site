"use client";

import { IconServer } from "justd-icons";
import Image from "next/image";
import { type FC } from "react";

import { useScrollToSection } from "@/app/hooks/useScrollToSection";
import barcode from "@/assets/barcode.png";
import flowy from "@/assets/flowy.png";
import sideShot from "@/assets/side-shot.png";
import { BlurFade } from "@/components/BlurFade";
import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";
import { Spacer } from "@/components/Spacer";
import { cn } from "@/lib/utils";

export const HeroSection: FC = () => {
  const scrollToSection = useScrollToSection();

  return (
    <section
      className={cn("relative overflow-hidden", "h-[45rem]")}
      data-panel="hero"
    >
      <div className="relative flex flex-col" data-panel-inner="">
        <Divider className="full-bleed" />

        <Divider
          vertical
          className={"absolute left-[50%]"}
          delay={0.5}
          from="start"
        />

        {/* bottom-right section */}
        <div
          className={cn(
            "absolute top-[12.5rem] right-0 w-[25rem] -z-0",
            "flex flex-col",
          )}
        >
          <Image alt={""} src={flowy} width={400} />

          <Spacer h={24} />

          <div className="flex flex-row justify-between items-start">
            <Image alt={""} height={32} src={barcode} />
            <p className="leading-none">
              <b>2025</b>
            </p>
          </div>

          <Spacer h={16} />

          <p className="font-medium tracking-[0.24rem]">JONATHAN CUI</p>
          <p className="text-sm">San Diego, CA</p>

          <Spacer h={24} />

          <div className="flex flex-row gap-8">
            <Button onPress={() => scrollToSection("projects")}>
              PROJECTS
            </Button>
            <Button variant="outline" onPress={() => scrollToSection("notes")}>
              NOTES
            </Button>
          </div>
        </div>

        {/* main hero text */}
        <div className="h-[22.5rem]">
          <BlurFade delay={0.6} direction="right" duration={1} offset="8em">
            <h1
              className={cn(
                "absolute top-16 left-16",
                "text-brand text-[12rem] leading-none font-bold",
              )}
            >
              JONATHAN
            </h1>
          </BlurFade>
        </div>

        {/* bottom-left section */}
        <div className="absolute w-[50%] top-[22.5rem]">
          <Divider delay={1} from="end" />

          <div className="ml-16 mr-8">
            <div className="flex justify-center ml-auto mt-8 mr-0 size-6">
              <p>01</p>
            </div>

            <div className="bg-black w-12 h-12 flex justify-center items-center">
              <IconServer className="w-6 h-6" color="white" />
            </div>

            <Spacer h={48} />

            <div className={cn("w-[20rem]", "flex flex-col gap-4")}>
              <p>SOFTWARE ENGINEER & RESEARCHER</p>
              <p className="text-gray-600">
                BUILDING PRODUCTION-READY AI SYSTEMS, FROM MICRO-VMS TO SUPPORT
                TOOLING AT STARLINK.
              </p>
            </div>
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

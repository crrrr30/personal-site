"use client";

import { IconServer } from "justd-icons";
import Image from "next/image";
import { useRef, type FC } from "react";

import { useBlurFade } from "@/app/hooks/useBlurFade";
import { useDivider } from "@/app/hooks/useDivider";
import { useScrollToSection } from "@/app/hooks/useScrollToSection";
import barcode from "@/assets/barcode.png";
import flowy from "@/assets/flowy.png";
import sideShot from "@/assets/side-shot.png";
import { type BlurFade as NativeBlurFade } from "@/components/BlurFade";
import { Button } from "@/components/Button";
import { type Divider as NativeDivider } from "@/components/Divider";
import { Spacer } from "@/components/Spacer";
import { cn } from "@/lib/utils";

const sectionHeight = "h-[54rem]";
const halfSectionHeight = "h-[27rem]";
const topHalfSectionHeight = "top-[27rem]";

export const HeroSection: FC = () => {
  const scrollToSection = useScrollToSection();

  const ref = useRef(null);
  const BlurFade = useBlurFade(ref);
  const Divider = useDivider(ref);

  return (
    <div ref={ref}>
      {/* desktop */}
      <section
        className={cn(
          "hidden md:block",
          "relative overflow-hidden",
          sectionHeight,
        )}
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

          {/* main hero text */}
          <BlurFade delay={0.6} direction="right">
            <div
              className={cn(
                "px-page",
                halfSectionHeight,
                "flex flex-col justify-center",
              )}
            >
              <h1
                className={cn("text-brand text-[12rem] leading-none font-bold")}
              >
                JONATHAN
              </h1>
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
            <MobileDescription BlurFade={BlurFade} Divider={Divider} />
          </div>

          {/* bottom-right section */}
          <div
            className={cn(
              "absolute bottom-16 right-page w-[25rem]",
              "flex flex-col",
            )}
          >
            <MobileFlowy BlurFade={BlurFade} />
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

      <MobileSections />
    </div>
  );
};

const MobileSections: FC = () => {
  return (
    <>
      <MobileHeroSection />
      <MobileDescriptionSection />
      <MobileFlowySection />
    </>
  );
};

const MobileHeroSection: FC = () => {
  const ref = useRef(null);
  const BlurFade = useBlurFade(ref);
  const Divider = useDivider(ref);

  return (
    <>
      <section
        ref={ref}
        className={cn("block md:hidden", "overflow-hidden")}
        data-panel="hero-1"
      >
        <Divider />

        <div
          className="mx-auto max-w-container h-full flex flex-col"
          data-panel-inner=""
        >
          <div
            className={cn(
              "flex flex-col",
              "py-24",
              "full-bleed",
              "relative",
              "text-brand [&_*]:text-9xl [&_*]:leading-none font-bold",
            )}
          >
            <Divider
              vertical
              className={"absolute top-0 bottom-0 left-[33%]"}
              delay={0.5}
              from="start"
            />
            <Divider
              vertical
              className={"absolute top-0 bottom-0 right-[33%]"}
              delay={0.8}
              from="start"
            />

            <BlurFade delay={0.4}>
              <h1 className="z-10">JONA-</h1>
            </BlurFade>
            <BlurFade delay={0.6}>
              <div className="flex flex-row justify-end z-10">
                <h1>THAN</h1>
              </div>
            </BlurFade>
          </div>

          {/* portrait overlay on main hero text */}
          <div className="absolute top-[2.5rem] left-[7rem]">
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
    </>
  );
};

const MobileDescription: FC<{
  BlurFade: typeof NativeBlurFade;
  Divider: typeof NativeDivider;
}> = ({ BlurFade, Divider }) => {
  return (
    <>
      <Divider delay={1} from="end" />

      <div
        className={cn(
          "px-page py-12 md:py-16 h-full",
          "flex flex-col justify-between gap-8 md:gap-0",
        )}
      >
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
              BUILDING PRODUCTION-READY AI SYSTEMS, FROM MICRO-VMS TO SUPPORT
              TOOLING AT STARLINK.
            </p>
          </div>
        </BlurFade>
      </div>
    </>
  );
};

const MobileDescriptionSection: FC = () => {
  const ref = useRef(null);
  const BlurFade = useBlurFade(ref);
  const Divider = useDivider(ref);

  return (
    <section
      ref={ref}
      className={cn("block md:hidden", "bg-gray-100")}
      data-panel="hero-2"
    >
      <div className="relative overflow-hidden" data-panel-inner="">
        <MobileDescription BlurFade={BlurFade} Divider={Divider} />
      </div>
    </section>
  );
};

const MobileFlowy: FC<{ BlurFade: typeof NativeBlurFade }> = ({ BlurFade }) => {
  const scrollToSection = useScrollToSection();

  return (
    <div className="pb-16 md:pb-0" data-panel-inner="">
      <BlurFade delay={0.6}>
        <Image alt="" src={flowy} />
      </BlurFade>

      <Spacer h={1.5} />

      <BlurFade className="px-page md:px-0" delay={0.8}>
        <div className="flex flex-row justify-between items-start">
          <Image alt={""} height={32} src={barcode} />
          <p className="leading-none">
            <b>2025</b>
          </p>
        </div>
      </BlurFade>

      <Spacer h={1} />

      <BlurFade className="px-page md:px-0" delay={1.0}>
        <p className="font-medium tracking-[0.24rem]">JONATHAN CUI</p>
        <p className="text-sm">San Diego, CA</p>

        <Spacer h={1.5} />

        <div className="flex flex-row gap-8">
          <Button onPress={() => scrollToSection("projects")}>PROJECTS</Button>
          <Button variant="outline" onPress={() => scrollToSection("notes")}>
            NOTES
          </Button>
        </div>
      </BlurFade>
    </div>
  );
};

const MobileFlowySection: FC = () => {
  const ref = useRef(null);
  const BlurFade = useBlurFade(ref);

  return (
    <section ref={ref} className="block md:hidden" data-panel="hero-3">
      <MobileFlowy BlurFade={BlurFade} />
    </section>
  );
};

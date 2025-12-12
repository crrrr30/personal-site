"use client";

import Image from "next/image";
import { type ReactNode, useRef } from "react";

import { useBlurFade } from "@/app/hooks/useBlurFade";
import { useDivider } from "@/app/hooks/useDivider";
import secondaryPortrait from "@/assets/secondary-portrait.png";
import { AnimatedList } from "@/components/AnimatedList";
import Link from "@/components/Link";
import { Spacer } from "@/components/Spacer";
import { cn } from "@/lib/utils";

export const AboutSection = () => {
  const ref = useRef(null);
  const BlurFade = useBlurFade(ref);
  const Divider = useDivider(ref);

  return (
    <section
      ref={ref}
      className={cn("relative overflow-hidden", "bg-gray-100")}
      data-panel="about"
    >
      <Divider />

      <div
        className={cn(
          "mx-auto max-w-container px-page py-12 md:py-24",
          "flex flex-row gap-16",
        )}
        data-panel-inner=""
      >
        <div>
          <BlurFade>
            <h3 className="text-4xl text-brand font-medium">ABOUT SECTION</h3>
          </BlurFade>

          <Spacer h={3} />

          <AnimatedList
            baseDelay={0.4}
            listData={aboutListData.map(({ header, content }) => ({
              header: <p className="font-medium">{header}</p>,
              content: <p>{content}</p>,
            }))}
          />
        </div>

        <div className="hidden md:block w-[32rem]">
          <BlurFade delay={0.6}>
            <Image alt="" src={secondaryPortrait} />
          </BlurFade>
        </div>
      </div>
    </section>
  );
};

const aboutListData: Array<{ header: string; content: ReactNode }> = [
  {
    header: "INTERNSHIP",
    content: (
      <>
        SHIPPING AI FEATURES IN LARGE MONOREPOS AT STARLINK WITH 50K+ DAILY
        CALLS.
      </>
    ),
  },
  {
    header: "RESEARCH",
    content: (
      <>
        4{" "}
        <Link href="https://scholar.google.com/citations?user=oRtbHw4AAAAJ&hl=en">
          PAPERS
        </Link>
        , 400+ CITATIONS, ICLR 2021 SPOTLIGHT PRESENTER.
      </>
    ),
  },
  {
    header: "PROJECTS",
    content: (
      <>
        CREATOR OF <Link href="https://tastemate.pro">TASTEMATE</Link>, AN AI
        RECIPE APP FOR MEDICAL DIETS, AND A RUST-BASED CURRY–HOWARD{" "}
        <Link href="https://math.joncui.sh">PROOF VERIFIER</Link>.
      </>
    ),
  },
  {
    header: "ACADEMICS",
    content: <>DOUBLE MAJOR IN CS & MATH (3.97 GPA, UCSD).</>,
  },
];

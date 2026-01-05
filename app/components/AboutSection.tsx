"use client";

import Image from "next/image";
import { type ReactNode, useRef } from "react";

import { PanelSection } from "@/app/components/PanelSection";
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
    <PanelSection
      ref={ref}
      className={cn("relative overflow-hidden", "bg-gray-100")}
    >
      <Divider />

      <div
        className={cn(
          "mx-auto max-w-container px-page py-12 md:py-24",
          "flex flex-row gap-16",
        )}
      >
        <div>
          <BlurFade>
            <h3 className="text-4xl text-brand font-medium uppercase">
              About section
            </h3>
          </BlurFade>

          <Spacer h={3} />

          <AnimatedList
            baseDelay={0.2}
            listData={aboutListData.map(({ header, content }) => ({
              header: <p className="font-medium uppercase">{header}</p>,
              content: <p className="uppercase">{content}</p>,
            }))}
          />
        </div>

        <div className="hidden md:block w-[32rem]">
          <BlurFade delay={0.4}>
            <Image alt="" src={secondaryPortrait} />
          </BlurFade>
        </div>
      </div>
    </PanelSection>
  );
};

const aboutListData: Array<{ header: string; content: ReactNode }> = [
  {
    header: "Internship",
    content: (
      <>
        Shipping AI features in large monorepo at Starlink with 50K+ daily
        calls.
      </>
    ),
  },
  {
    header: "Career",
    content: (
      <>
        Joining Anduril Industries in August 2026 as a Software Engineer in
        Costa Mesa, CA.
      </>
    ),
  },
  {
    header: "Research",
    content: (
      <>
        4{" "}
        <Link href="https://scholar.google.com/citations?user=oRtbHw4AAAAJ&hl=en">
          papers
        </Link>
        , 400+ citations, ICLR 2021 Spotlight presenter.
      </>
    ),
  },
  {
    header: "Projects",
    content: (
      <>
        Creator of <Link href="https://tastemate.pro">TasteMate</Link>, an AI
        recipe app for medical diets, and a Rust-based Curry–Howard{" "}
        <Link href="https://math.joncui.sh">Proof Verifier</Link>.
      </>
    ),
  },
  {
    header: "Academics",
    content: <>Double major in CS & Math (3.97 GPA, UCSD).</>,
  },
];

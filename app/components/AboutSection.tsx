"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { type ReactNode, type FC, Fragment } from "react";

import { useElementWidth } from "@/app/hooks/useElementWidth";
import secondaryPortrait from "@/assets/secondary-portrait.png";
import { Divider } from "@/components/Divider";
import Link from "@/components/Link";
import { appEasing } from "@/lib/animations";
import { cn } from "@/lib/utils";

export const AboutSection = () => {
  return (
    <section className="relative overflow-hidden" data-panel="about">
      <div
        className={cn(
          "relative mx-auto flex flex-col gap-12",
          "max-w-container py-24",
        )}
        data-panel-inner=""
      >
        <h3 className="text-4xl text-brand font-medium">ABOUT SECTION</h3>

        <AboutList />

        <div className={cn("w-[22.5rem]", "absolute bottom-0 right-0")}>
          <Image alt="" src={secondaryPortrait} />
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

const AboutList: FC = () => {
  const { ref, width } = useElementWidth<HTMLDivElement>();

  const transition = {
    duration: 1,
    ...appEasing,
  };

  return (
    <div
      ref={ref}
      className="grid auto-rows-fr grid-cols-[max-content,1fr] gap-x-8 gap-y-4"
    >
      {aboutListData.map(({ header, content }, idx) => (
        <Fragment key={idx}>
          <p className="font-medium">{header}</p>

          <motion.div
            animate="initial"
            className="flex flex-col justify-between"
            initial="initial"
            whileHover="hovered"
          >
            <motion.p
              className="pb-4 "
              transition={transition}
              variants={{
                initial: { color: "var(--color-gray-600)" },
                hovered: { color: "black" },
              }}
            >
              {content}
            </motion.p>

            <div className={cn("w-full h-[1px]", "relative")}>
              <Divider from="end" />

              <div className="absolute top-0 right-0 bottom-0">
                <motion.div
                  className="bg-black h-full"
                  transition={transition}
                  variants={{
                    initial: { width: 0 },
                    hovered: { width: width ?? 0 },
                  }}
                />
              </div>
            </div>
          </motion.div>
        </Fragment>
      ))}
    </div>
  );
};

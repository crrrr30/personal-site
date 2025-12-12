"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { type ReactNode, type FC, Fragment, useRef } from "react";

import { useBlurFade } from "@/app/hooks/useBlurFade";
import { useDivider } from "@/app/hooks/useDivider";
import { useElementWidth } from "@/app/hooks/useElementWidth";
import secondaryPortrait from "@/assets/secondary-portrait.png";
import { type BlurFade as NativeBlurFade } from "@/components/BlurFade";
import { type Divider as NativeDivider } from "@/components/Divider";
import Link from "@/components/Link";
import { Spacer } from "@/components/Spacer";
import { appEasing } from "@/lib/animations";
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
          "mx-auto max-w-container px-page py-24",
          "flex flex-row gap-16",
        )}
        data-panel-inner=""
      >
        <div>
          <BlurFade>
            <h3 className="text-4xl text-brand font-medium">ABOUT SECTION</h3>
          </BlurFade>

          <Spacer h={3} />

          <AboutList BlurFade={BlurFade} Divider={Divider} />
        </div>

        <div className="w-[32rem]">
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

const AboutList: FC<{
  className?: string;
  BlurFade: typeof NativeBlurFade;
  Divider: typeof NativeDivider;
}> = ({ className, BlurFade, Divider }) => {
  const { ref, width } = useElementWidth<HTMLDivElement>();

  const transition = {
    duration: 1,
    ...appEasing,
  };

  return (
    <div
      ref={ref}
      className={cn(
        "grid auto-rows-fr grid-cols-[max-content,1fr] gap-x-8 gap-y-6",
        className,
      )}
    >
      {aboutListData.map(({ header, content }, idx) => (
        <Fragment key={idx}>
          <BlurFade delay={0.4 + 0.3 * idx}>
            <p className="font-medium">{header}</p>
          </BlurFade>

          {/* TODO: disable hover effect until the blurfade has loaded */}
          <motion.div
            animate="initial"
            className="flex flex-col justify-between"
            initial="initial"
            whileHover="hovered"
          >
            <BlurFade delay={0.4 + 0.3 * idx + 0.1}>
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
            </BlurFade>

            <div className={cn("w-full h-[1px]", "relative")}>
              <Divider delay={0.4 + 0.3 * idx + 0.2} from="end" />

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

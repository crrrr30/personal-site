"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { type StaticImageData } from "next/image";
import { type ComponentProps, type ReactNode, type FC, useRef } from "react";

import { PanelSection } from "@/app/components/PanelSection";
import { ProjectCard } from "@/app/components/ProjectCard";
import { useBlurFade } from "@/app/hooks/useBlurFade";
import { useIsMd } from "@/app/hooks/useMediaQuery";
import { useBodyDivContext } from "@/app/providers/BodyDivContext";
import proj1 from "@/assets/proj1.png";
import proj2 from "@/assets/proj2.jpg";
import proj3 from "@/assets/proj3.png";
import { type BlurFade as NativeBlurFade } from "@/components/BlurFade";
import { Spacer } from "@/components/Spacer";
import { cn } from "@/lib/utils";

type ProjectCardProps = ComponentProps<typeof ProjectCard>;

interface ProjectCardConfig {
  id: string;
  animDelay: number;
  alt: string;
  data: ProjectCardProps["data"];
  src: StaticImageData;
  translateRange?: [number, number];
  className?: string;
}

const PROJECT_CARDS: readonly ProjectCardConfig[] = [
  {
    id: "tastemate",
    animDelay: 0.2,
    alt: "",
    data: {
      index: 1,
      title: "TASTEMATE",
      body: (
        <p>
          TasteMate is an AI-powered recipe app for people with medical
          conditions and dietary restrictions.
        </p>
      ),
      projectLink: "https://tastemate.pro",
      gitlabLink: "https://gitlab.ovh.joncui.sh/crrrr30/tastemate-monorepo",
    },
    src: proj1,
  },
  {
    id: "proof-verifier",
    animDelay: 0.4,
    alt: "",
    data: {
      index: 2,
      title: "PROOF VERIFIER",
      body: (
        <p>
          A dependently-typed proof verifier and toy language exploring
          Curry–Howard, written in Rust.
        </p>
      ),
      projectLink: "https://math.joncui.sh",
      gitlabLink: "https://gitlab.ovh.joncui.sh/crrrr30/math",
    },
    src: proj2,
    translateRange: [0, 96],
  },
  {
    id: "starlink-ai",
    animDelay: 0.6,
    alt: "",
    data: {
      index: 3,
      title: "STARLINK AI TOOLING",
      body: (
        <p>
          Summer 2025 software engineering intern on Starlink&apos;s support
          tooling team. Built AI features used daily by thousands of support
          agents.
        </p>
      ),
      projectLink: null,
      gitlabLink: null,
    },
    src: proj3,
    translateRange: [0, -96],
  },
] as const;

export const ProjectsSection: FC = () => {
  const bodyDiv = useBodyDivContext();
  const ref = useRef(null);
  const BlurFade = useBlurFade(ref);

  const isMd = useIsMd();

  const { scrollYProgress } = useScroll({
    container: bodyDiv,
    target: ref,
    offset: ["center end", "center start"],
  });
  const springProg = useSpring(scrollYProgress, {
    stiffness: 72,
    damping: 18,
    restDelta: 0.001,
  });
  const prog = useTransform(springProg, [0, 1], isMd ? [0, 1] : [0, 0]);

  return (
    <div className="bg-brand">
      <PanelSection
        ref={ref}
        className="relative overflow-hidden text-white"
        id="projects"
      >
        <div className="mx-auto max-w-container px-page py-12 md:py-24">
          <div className="flex flex-col">
            <TitleFadeIn BlurFade={BlurFade} />
          </div>

          <Spacer h={6} />

          <div className="flex flex-col md:flex-row justify-between items-start gap-16 md:gap-8 pb-24">
            {PROJECT_CARDS.map((card) => (
              <ProjectCards key={card.id} card={card} progress={prog} />
            ))}
          </div>
        </div>
      </PanelSection>
    </div>
  );
};

const ProjectCards: FC<{
  card: ProjectCardConfig;
  progress: MotionValue<number>;
}> = ({ card, progress }) => {
  const translateY = useTransform(
    progress,
    [0, 1],
    card.translateRange ?? [0, 0],
  );

  const cardElement = (
    <ProjectCard
      alt={card.alt}
      animDelay={card.animDelay}
      className={cn(card.className, !card.translateRange && "flex-1")}
      data={card.data}
      src={card.src}
    />
  );

  if (!card.translateRange) {
    return cardElement;
  }

  return (
    <motion.div className="flex-1" style={{ translateY }}>
      {cardElement}
    </motion.div>
  );
};

const TitleFadeIn: FC<{ BlurFade: typeof NativeBlurFade }> = ({ BlurFade }) => {
  const components: ReactNode[] = [
    <h2 key={0}>A CURATED SELECTION</h2>,
    <h2 key={1}>OF PERSONAL</h2>,
    <h2 key={2}>
      PROJECTS
      <span key={0} className="inline-block w-24 h-1 bg-white" />
    </h2>,
  ];

  return (
    <>
      {components.map((word, i) => (
        <BlurFade
          key={i}
          className="inline-block [&_h2]:text-6xl font-medium "
          delay={0.05 * (i + 1)}
          direction="right"
          inViewMargin="-50px 180px"
        >
          {word}
        </BlurFade>
      ))}
    </>
  );
};

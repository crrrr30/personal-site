"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { type ReactNode, type FC, useRef } from "react";

import { ProjectCard } from "@/app/components/ProjectCard";
import { useBodyDivContext } from "@/app/providers/BodyDivContext";
import proj1 from "@/assets/proj1.png";
import proj2 from "@/assets/proj2.jpg";
import proj3 from "@/assets/proj3.png";
import { BlurFade } from "@/components/BlurFade";
import { Spacer } from "@/components/Spacer";
import { cn } from "@/lib/utils";

export const ProjectsSection: FC = () => {
  const bodyDiv = useBodyDivContext();
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    container: bodyDiv,
    offset: ["center end", "center start"],
  });
  const prog = useSpring(scrollYProgress, {
    stiffness: 72,
    damping: 18,
    restDelta: 0.001,
  });

  return (
    <section
      className={cn("full-bleed px-6", "bg-brand text-white")}
      id="projects"
    >
      <div className={cn("mx-auto max-w-[1280px]", "p-16")}>
        <div className="flex flex-col">
          <TitleFadeIn />
        </div>

        <Spacer h={48} />

        <div
          ref={ref}
          className="flex flex-row justify-between items-start gap-8 pb-24"
        >
          <ProjectCard
            alt=""
            animDelay={0.2}
            className="flex-1"
            data={{
              index: 1,
              title: "TASTEMATE",
              body: (
                <p>
                  TasteMate is an AI-powered recipe app for people with medical
                  conditions and dietary restrictions.
                </p>
              ),
            }}
            src={proj1}
          />

          <motion.div
            className="flex-1"
            style={{
              translateY: useTransform(prog, [0, 1], [0, 96]),
            }}
          >
            <ProjectCard
              alt=""
              animDelay={0.4}
              data={{
                index: 2,
                title: "PROOF VERIFIER",
                body: (
                  <p>
                    A dependently-typed proof verifier and toy language
                    exploring Curry–Howard, written in Rust.
                  </p>
                ),
              }}
              src={proj2}
            />
          </motion.div>
          <motion.div
            className="flex-1"
            style={{
              translateY: useTransform(prog, [0, 1], [0, -96]),
            }}
          >
            <ProjectCard
              alt=""
              animDelay={0.6}
              data={{
                index: 3,
                title: "STARLINK AI TOOLING",
                body: (
                  <p>
                    Summer 2025 software engineering intern on Starlink&apos;s
                    support tooling team. Built AI features used daily by
                    thousands of support agents.
                  </p>
                ),
              }}
              src={proj3}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const TitleFadeIn: FC = () => {
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
          delay={0.2 * (i + 1)}
          direction="right"
          inViewMargin="-50px 180px"
          offset="8em"
        >
          {word}
        </BlurFade>
      ))}
    </>
  );
};

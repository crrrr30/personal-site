"use client";

import { motion } from "motion/react";
import { type ReactNode, type FC, Fragment, useRef } from "react";

import { useBlurFade } from "@/app/hooks/useBlurFade";
import { useDivider } from "@/app/hooks/useDivider";
import { useElementWidth } from "@/app/hooks/useElementWidth";
import { type BlurFade as NativeBlurFade } from "@/components/BlurFade";
import { type Divider as NativeDivider } from "@/components/Divider";
import Link from "@/components/Link";
import { appEasing } from "@/lib/animations";
import { cn } from "@/lib/utils";

export const NotesSection = () => {
  const ref = useRef(null);
  const BlurFade = useBlurFade(ref);
  const Divider = useDivider(ref);

  return (
    <section
      ref={ref}
      className={cn("relative overflow-hidden", "bg-gray-100")}
      data-panel="notes"
      id="notes"
    >
      <div
        className={cn(
          "mx-auto max-w-container",
          "px-page py-24",
          "flex flex-col gap-12",
        )}
        data-panel-inner=""
      >
        <BlurFade>
          <h3 className="text-4xl text-brand font-medium">NOTES SECTION</h3>
        </BlurFade>

        <NotesList BlurFade={BlurFade} Divider={Divider} />
      </div>
    </section>
  );
};

const notesData: Array<{ header: string; content: ReactNode; href: string }> = [
  {
    header: "REAL ANALYSIS",
    content: (
      <>
        A brief introduction to real analysis in one-variables, covering
        properties of real numbers, infinite series, uniform convergence, and
        power series.
      </>
    ),
    href: "/assets/files/401.pdf",
  },
  {
    header: "LINEAR ALGEBRA",
    content: (
      <>
        Elementary topics in abstract linear algebra, including vector spaces
        and linear transformations, canonical forms of matrices, elementary
        divisors, invariant factors, and applications.
      </>
    ),
    href: "/assets/files/436.pdf",
  },
  {
    header: "THEORY OF COMPUTATION",
    content: (
      <>
        An introduction to the formal Theory of Computation, covering
        computability, complexity, the Church–Turing Thesis, undecidability,
        reducibility, completeness, and time/space complexity.
      </>
    ),
    href: "/assets/files/464.pdf",
  },
  {
    header: "ABSTRACT ALGEBRA",
    content: (
      <>
        An introductory course to abstract algebra on the elementary theory of
        groups, rings, and fields. Content covers up to the construction of the
        algebraic closure.
      </>
    ),
    href: "/assets/files/435.pdf",
  },
  {
    header: "FOURIER ANALYSIS",
    content: (
      <>
        A rigorous course based in Riemann integration on the convergence of
        Fourier series, Hilbert spaces, the Fourier transform on the real line,
        the inversion, Plancherel, and Poisson summation formula, and
        applications.
      </>
    ),
    href: "/assets/files/144.pdf",
  },
];

const NotesList: FC<{
  BlurFade: typeof NativeBlurFade;
  Divider: typeof NativeDivider;
}> = ({ BlurFade, Divider }) => {
  const { ref, width } = useElementWidth<HTMLDivElement>();

  const transition = {
    duration: 1,
    ...appEasing,
  };

  return (
    <div
      ref={ref}
      className="grid auto-rows-fr grid-cols-[max-content,1fr] gap-x-8 gap-y-6"
    >
      {notesData.map(({ header, content, href }, idx) => (
        <Fragment key={idx}>
          <BlurFade delay={0.4 + 0.3 * idx}>
            <div>
              <Link className="font-medium" href={href}>
                {header}
              </Link>
            </div>
          </BlurFade>

          <motion.div
            animate="initial"
            className="flex flex-col justify-between"
            initial="initial"
            whileHover="hovered"
          >
            <BlurFade delay={0.4 + 0.3 * idx + 0.1}>
              <motion.p
                className="pb-4 "
                style={{
                  fontSize: "var(--size-font)",
                }}
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

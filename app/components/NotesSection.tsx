"use client";

import { type ReactNode, type FC, useRef } from "react";

import { PanelSection } from "@/app/components/PanelSection";
import { useBlurFade } from "@/app/hooks/useBlurFade";
import { AnimatedList } from "@/components/AnimatedList";
import Link from "@/components/Link";
import { cn } from "@/lib/utils";

export const NotesSection = () => {
  const ref = useRef(null);
  const BlurFade = useBlurFade(ref);

  return (
    <PanelSection
      ref={ref}
      className={cn("relative overflow-hidden", "bg-gray-100")}
      id="notes"
    >
      <div
        className={cn(
          "mx-auto max-w-container",
          "px-page py-12 md:py-24",
          "flex flex-col gap-12",
        )}
      >
        <BlurFade>
          <h3 className="text-4xl text-brand font-medium">NOTES SECTION</h3>
        </BlurFade>

        <NotesList />
      </div>
    </PanelSection>
  );
};

const notesData: Array<{ header: string; content: ReactNode; href: string }> = [
  {
    header: "REAL ANALYSIS",
    content: (
      <p>
        A brief introduction to real analysis in one-variables, covering
        properties of real numbers, infinite series, uniform convergence, and
        power series.
      </p>
    ),
    href: "/assets/files/401.pdf",
  },
  {
    header: "LINEAR ALGEBRA",
    content: (
      <p>
        Elementary topics in abstract linear algebra, including vector spaces
        and linear transformations, canonical forms of matrices, elementary
        divisors, invariant factors, and applications.
      </p>
    ),
    href: "/assets/files/436.pdf",
  },
  {
    header: "THEORY OF COMPUTATION",
    content: (
      <p>
        An introduction to the formal Theory of Computation, covering
        computability, complexity, the Church–Turing Thesis, undecidability,
        reducibility, completeness, and time/space complexity.
      </p>
    ),
    href: "/assets/files/464.pdf",
  },
  {
    header: "ABSTRACT ALGEBRA",
    content: (
      <p>
        An introductory course to abstract algebra on the elementary theory of
        groups, rings, and fields. Content covers up to the construction of the
        algebraic closure.
      </p>
    ),
    href: "/assets/files/435.pdf",
  },
  {
    header: "FOURIER ANALYSIS",
    content: (
      <p>
        A rigorous course based in Riemann integration on the convergence of
        Fourier series, Hilbert spaces, the Fourier transform on the real line,
        the inversion, Plancherel, and Poisson summation formula, and
        applications.
      </p>
    ),
    href: "/assets/files/144.pdf",
  },
];

const NotesList: FC = () => {
  return (
    <AnimatedList
      listData={notesData.map(({ header, content, href }) => ({
        header: (
          <Link className="font-medium" href={href}>
            {header}
          </Link>
        ),
        content: content,
      }))}
    />
  );
};

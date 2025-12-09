import { IconServer } from "justd-icons";
import { motion } from "motion/react";
import Image from "next/image";
import { type ReactNode, type FC, Fragment } from "react";

import { BodyDiv } from "@/app/components/BodyDiv";
import { Projects } from "@/app/components/Projects";
import { useElementWidth } from "@/app/hooks/useElementWidth";
import { useScrollToSection } from "@/app/hooks/useScrollToSection";
import { homePageEasing } from "@/app/page";
import barcode from "@/assets/barcode.png";
import flowy from "@/assets/flowy.png";
import mainShot from "@/assets/main-shot.png";
import reading from "@/assets/reading.png";
import secondaryPortrait from "@/assets/secondary-portrait.png";
import sideShot from "@/assets/side-shot.png";
import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";
import Link from "@/components/Link";
import { NavBar } from "@/components/NavBar";
import { Spacer } from "@/components/Spacer";
import { cn } from "@/lib/utils";

const heroHeightClass = "h-[720px]";

export const HomeContent: FC<{ className?: string }> = ({ className }) => {
  const scrollToSection = useScrollToSection();

  return (
    <BodyDiv className={cn("px-6", className)}>
      <div className="mx-auto max-w-[1280px]">
        <NavBar />

        <div className={cn("relative", heroHeightClass)}>
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
              "absolute top-[200px] right-16 w-[400px] -z-0",
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

            <p className="font-medium tracking-[0.24em]">JONATHAN CUI</p>
            <p className="text-sm">San Diego, CA</p>

            <Spacer h={24} />

            <div className="flex flex-row gap-8">
              <Button onPress={() => scrollToSection("projects")}>
                PROJECTS
              </Button>
              <Button
                variant="outline"
                onPress={() => scrollToSection("notes")}
              >
                NOTES
              </Button>
            </div>
          </div>

          {/* main hero text */}
          <h1
            className={cn(
              "absolute top-0 left-16",
              "text-brand text-[200px] leading-[1.8em] font-bold",
            )}
          >
            JONATHAN
          </h1>

          {/* portrait overlay on main hero text */}
          <div className="absolute top-[50px] left-[360px]">
            <Image alt={""} src={sideShot} width={120} />
          </div>

          {/* bottom-left section */}
          <div className="absolute w-[50%] top-[360px]">
            <Divider delay={1} from="end" />

            <div className="ml-16 mr-8">
              <div className="flex justify-center ml-auto mt-8 mr-0 size-6">
                <p>01</p>
              </div>

              <div className="bg-black w-12 h-12 flex justify-center items-center">
                <IconServer className="w-6 h-6" color="white" />
              </div>

              <Spacer h={48} />

              <div className={cn("w-[320px]", "flex flex-col gap-4")}>
                <p>SOFTWARE ENGINEER & RESEARCHER</p>
                <p className="text-gray-600">
                  BUILDING PRODUCTION-READY AI SYSTEMS, FROM MICRO-VMS TO
                  SUPPORT TOOLING AT STARLINK.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Divider />

        <div className="flex flex-row">
          <div className="w-[50%]">
            <Image alt={""} src={mainShot} />
          </div>

          <div className="w-[50%] p-16 flex flex-col justify-between">
            <div className="flex justify-center ml-auto size-6">
              <p>02</p>
            </div>

            <div className="relative">
              <span className="flex flex-col">
                {["MEET", "JONATHAN", "CUI"].map((word, i) => (
                  <p key={i} className="text-brand text-7xl font-medium">
                    {word}
                  </p>
                ))}
              </span>

              <div className="absolute bottom-0 right-0 w-12 h-12">
                <Image
                  alt=""
                  className="h-full w-full object-cover"
                  src={reading}
                />
              </div>
            </div>
          </div>
        </div>
        <Divider />

        <div className="flex flex-row">
          <div className={cn("px-16 py-24", "flex flex-col gap-12")}>
            <h3 className="text-4xl text-brand font-medium">ABOUT SECTION</h3>

            <AboutList />
          </div>
          <div className="w-[50%] relative">
            <Image
              alt=""
              className="absolute bottom-0 right-0"
              height={360}
              src={secondaryPortrait}
            />
          </div>
        </div>

        <Projects />

        <section
          className={cn("px-16 py-24", "flex flex-col gap-12")}
          id="notes"
        >
          <h3 className="text-4xl text-brand font-medium">ABOUT SECTION</h3>

          <NotesList />
        </section>

        <Spacer h={48} />
      </div>
    </BodyDiv>
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
    ...homePageEasing,
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

const NotesList: FC = () => {
  const { ref, width } = useElementWidth<HTMLDivElement>();

  const transition = {
    duration: 1,
    ...homePageEasing,
  };

  return (
    <div
      ref={ref}
      className="grid auto-rows-fr grid-cols-[max-content,1fr] gap-x-8 gap-y-4"
    >
      {notesData.map(({ header, content, href }, idx) => (
        <Fragment key={idx}>
          <div>
            <Link className="font-medium" href={href}>
              {header}
            </Link>
          </div>

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

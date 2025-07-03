"use client";

import { LargeNavBar, SmallNavBar } from "@/components/personal/navbar";
import { BlurFade } from "@/components/magicui/blur-fade";
import { IconArrowUpRight, IconChevronLgDown } from "justd-icons";
import Button from "@/components/personal/button";
import { Button as UnstyledButton } from "react-aria-components";
import Link from "@/components/personal/link";
// import Something from "@/some.mdx";

export default function Home() {
  return (
    <>
      <BlurFade inView>
        <SmallNavBar />
      </BlurFade>
      <div className="text-base md:text-lg">
        <BlurFade inView>
          <LargeNavBar />
        </BlurFade>

        <div className="flex flex-col justify-evenly pad-x bg-background h-fit min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-8rem)]">
          <div className="serif tracking-normal text-6xl md:text-8xl !leading-relaxed">
            <BlurFade delay={0.25} inView>
              Researcher,
            </BlurFade>
            <BlurFade delay={0.25 * 1.5} inView>
              Designer,
            </BlurFade>
            <BlurFade delay={0.25 * 2} inView>
              Musician.
            </BlurFade>
          </div>
          <div className="flex justify-center">
            <BlurFade delay={0.25 * 3} inView>
              <UnstyledButton
                className="w-min p-4 rounded-xl hover:bg-white/10 hover:bg-opacity-10 transition-colors"
                onPress={() =>
                  window.scrollTo({
                    top: document.getElementById("first-section")!.offsetTop,
                    behavior: "smooth",
                  })
                }
              >
                <IconChevronLgDown className="animate-bounce size-6" />
              </UnstyledButton>
            </BlurFade>
          </div>
        </div>

        {/* <Something /> */}

        <div
          id="first-section"
          className="pad-x bg-foreground text-background py-24"
        >
          <div className="flex flex-col md:flex-row justify-between gap-16 ">
            <BlurFade delay={0.25} inView className="w-full md:w-[50%]">
              <p className="section-title mb-8">Academic Work</p>

              <p className="mb-8">
                I am a third-year student of Computer Science at UC San Diego,
                minoring in Mathematics. I studied at Penn State previously for
                two years with a 4.0 GPA in Computer Science and Mathematics I
                am heavily involved in machine learning and mathematics
                research, accumulating over 300 citations. My prior work at Penn
                State was primarily with{" "}
                <Link
                  href="https://scholar.google.com/citations?user=hEZSgf0AAAAJ&hl=en&oi=ao"
                  // className="black-link"
                >
                  Dr. Md. Faisal Kabir
                </Link>{" "}
                and{" "}
                <Link href="https://scholar.google.com/citations?hl=en&user=xo-016kAAAAJ">
                  Dr. Suman Saha
                </Link>
                . I am also working with{" "}
                <Link href="https://scholar.google.com/citations?user=c0_JYoEAAAAJ&hl=en&oi=sra">
                  Dr. Andrew P. McHugh
                </Link>{" "}
                on solving Pennes&apos; bioheat equation using perturbation and
                other numerical methods.
              </p>

              <p className="text-2xl font-[400] mb-2">Publications:</p>
              <ul className="space-y-4 px-4">
                <li>
                  Zhao, S., Cui, J., Sheng, Y., Dong, Y., Liang, X., Chang, E.
                  I., & Xu, Y. (2021). Large scale image completion via
                  co-modulated generative adversarial networks.{" "}
                  <i>International Conference on Learning Representations</i>.{" "}
                  <Link
                    className="break-all"
                    href="https://openreview.net/forum?id=sSjqmfsk95O"
                  >
                    https://openreview.net/forum?id=sSjqmfsk95O
                  </Link>
                  .
                </li>
                <li>
                  Li, Y., Cui, J., Sheng, Y., Liang, X., Wang, J., Eric, I., ...
                  & Xu, Y. (2021). Whole brain segmentation with full volume
                  neural network.{" "}
                  <i>Computerized Medical Imaging and Graphics</i>, 93, 101991.
                </li>
                <li>
                  Cui, J., Araujo, D. A., Saha, S., & Kabir, M. F. (2024).
                  CS-Mixer: A Cross-Scale Vision Multi-Layer Perceptron with
                  Spatial–Channel Mixing.{" "}
                  <i>IEEE Transactions on Artificial Intelligence</i>, <i>1</i>
                  (01), 1-13.
                </li>
                <li>
                  Cui, J. & Araujo, D. A. (2024). Rethinking use-restricted
                  open-source licenses for regulating abuse of generative
                  models. <i>Big Data & Society 11</i>(1).{" "}
                  <Link
                    className="break-all"
                    href="https://doi.org/10.1177/20539517241229699"
                  >
                    https://doi.org/10.1177/20539517241229699
                  </Link>
                </li>
              </ul>
              <div className="pt-6">
                <Button href="/assets/files/Resume.pdf">Résumé</Button>
              </div>
            </BlurFade>

            <BlurFade
              delay={0.25 * 2}
              inView
              className="w-full md:w-[30%] space-y-16"
            >
              <div className="space-y-2">
                <p className="font-bold mb-4">Links</p>
                <p>
                  <Link href="https://orcid.org/0000-0002-5075-3524">
                    ORCID
                  </Link>
                </p>
                <p>
                  <Link href="https://scholar.google.com/citations?user=oRtbHw4AAAAJ&hl=en">
                    Google Scholar
                  </Link>
                </p>
                <p>
                  <Link href="https://www.linkedin.com/in/jonathan-cui-110b211a6">
                    LinkedIn
                  </Link>
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-bold mb-4">Notes from Penn State</p>
                <p>
                  <Link href="/assets/files/401.pdf">Real Analysis</Link>
                </p>
                <p>
                  <Link href="/assets/files/436.pdf">Linear Algebra</Link>
                </p>
                <p>
                  <Link href="/assets/files/464.pdf">
                    Theory of Computation
                  </Link>
                </p>
                <p>
                  <Link href="/assets/files/435.pdf">Abstract Algebra</Link>
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-bold mb-4">Notes from UC San Diego</p>
                <p>
                  <Link href="/assets/files/144.pdf">Fourier Analysis</Link>
                </p>
              </div>
            </BlurFade>
          </div>
        </div>

        <div className="w-full md:w-[80%] space-y-12 pad-x bg-background py-24">
          <BlurFade delay={0.25} inView>
            <p className="section-title">Exploration of the Arts</p>
            <div className="flex flex-col md:flex-row justify-between border-t-1 py-12 gap-6">
              <p className="serif tracking-normal text-xl md:text-2xl">Music</p>
              <p className="max-w-full md:max-w-[80%]">
                I am a keyboardist primarily focused on worship music,
                previously active at{" "}
                <Link
                  variant="white"
                  href="https://www.reallifechurchfamily.org/"
                >
                  <i>Real Life Church, Vacaville</i>
                </Link>{" "}
                and{" "}
                <Link variant="white" href="https://impactpsh.com/">
                  <i>Impact Fellowship</i>
                </Link>
                . I have also engaged myself with the{" "}
                <Link variant="white" href="https://thegffo.com/">
                  <i>Grand Feature Film Orchestra</i>
                </Link>{" "}
                and the{" "}
                <Link
                  variant="white"
                  href="https://open.spotify.com/artist/3MLMJiC9PqGb1f3ysSrrYX"
                >
                  <i>Kineo Chapel Band</i>
                </Link>
                .
              </p>
            </div>
            <div className="flex flex-col md:flex-row justify-between border-t-1 py-12 gap-6">
              <p className="serif tracking-normal text-xl md:text-2xl">
                Graphics Design
              </p>
              <p className="max-w-full md:max-w-[80%]">
                Currently employed at the Pennsylvania State University,
                Harrisburg, I create professional posters, banners, and other
                promotional material for the School of Humanities.
              </p>
            </div>

            <Button
              variant="light"
              href="https://sway.office.com/qHuaPGQEKeIjePnJ"
            >
              Portfolio
            </Button>
          </BlurFade>
        </div>

        <div className="pad-x bg-foreground text-background py-24">
          <BlurFade delay={0.25 * 2} inView>
            <p className="w-full md:w-[80%] serif tracking-normal text-4xl md:text-6xl !leading-normal text-balance">
              “Entities must not be multiplied beyond necessity.”
            </p>
            <p className="pt-8">— William of Ockham</p>
          </BlurFade>
        </div>
        <div className="pad-x bg-background py-12 text-sm">
          <BlurFade inView>
            Copyright © Jonathan Cui {new Date().getFullYear()}
          </BlurFade>
        </div>
      </div>
    </>
  );
}

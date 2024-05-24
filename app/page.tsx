"use client";

import "@/app/globals.css";
import { FaChevronDown } from "react-icons/fa6";
import SmallNavbar from "@/app/components/small-navbar";
import LargeNavbar from "@/app/components/large-navbar";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <SmallNavbar />
      <LargeNavbar />
      <div className="flex flex-col justify-evenly pad bg-dark h-fit min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-8rem)]">
        <div className="orpheus text-6xl md:text-8xl !leading-relaxed">
          Researcher,
          <br />
          Designer,
          <br />
          Musician.
          <br />
        </div>
        <div>
          <FaChevronDown
            className="animate-bounce size-6 mx-auto"
            onClick={() =>
              window.scrollTo({
                top: document.getElementById("first-section")!.offsetTop,
                behavior: "smooth",
              })
            }
          />
        </div>
      </div>
      <div
        id="first-section"
        className="flex flex-col md:flex-row justify-between gap-16 pad bg-light py-24"
      >
        <div className="w-full md:w-[50%] space-y-8">
          <p className="section-title">A Proud Penn-Stater</p>
          <p>
            Although a second-year student at Penn State, I am in senior-level
            standing in terms of credit with a 4.0 GPA, whereby I have been
            awarded the President Walker Award. I am heavily involved in machine
            learning and mathematics research. Working with{" "}
            <Link
              href="https://scholar.google.com/citations?user=hEZSgf0AAAAJ&hl=en&oi=ao"
              className="black-link"
            >
              Dr. Md. Faisal Kabir
            </Link>{" "}
            and{" "}
            <Link
              href="https://scholar.google.com/citations?hl=en&user=xo-016kAAAAJ"
              className="black-link"
            >
              Dr. Suman Saha
            </Link>
            , I have won the Top Overall Poster Award at the 2023 MC REU
            Symposium, and the paper is in review under minor revision at IEEE
            Transaction on Artificial Intelligence. I am also working with{" "}
            <Link
              href="https://scholar.google.com/citations?user=c0_JYoEAAAAJ&hl=en&oi=sra"
              className="black-link"
            >
              Dr. Andrew P. McHugh
            </Link>{" "}
            on solving Pennes&apos; bioheat equation using perturbation and
            other numerical methods.
          </p>

          <p className="text-xl font-[400]">Publications:</p>
          <ul className="space-y-4 px-4">
            <li>
              Zhao, S., Cui, J., Sheng, Y., Dong, Y., Liang, X., Chang, E. I., &
              Xu, Y. (2021). Large scale image completion via co-modulated
              generative adversarial networks.{" "}
              <i>International Conference on Learning Representations</i>.{" "}
              <Link
                className="black-link break-all"
                href="https://openreview.net/forum?id=sSjqmfsk95O"
              >
                https://openreview.net/forum?id=sSjqmfsk95O
              </Link>
              .
            </li>
            <li>
              Li, Y., Cui, J., Sheng, Y., Liang, X., Wang, J., Eric, I., ... &
              Xu, Y. (2021). Whole brain segmentation with full volume neural
              network. <i>Computerized Medical Imaging and Graphics</i>, 93,
              101991.
            </li>
            <li>
              Cui, J., Araujo, D. A., Saha, S., & Kabir, M. F. (2023). CS-Mixer:
              A cross-scale vision MLP model with spatial-channel mixing.{" "}
              <i>arXiv preprint arXiv:2308.13363</i>.
            </li>
            <li>
              Cui, J. & Araujo, D. A. (2024). Rethinking use-restricted
              open-source licenses for regulating abuse of generative models.{" "}
              <i>Big Data & Society 11</i>(1).{" "}
              <Link
                className="black-link break-all"
                href="https://doi.org/10.1177/20539517241229699"
              >
                https://doi.org/10.1177/20539517241229699
              </Link>
            </li>
          </ul>
          <div className="pt-6">
            <Link className="dark-button" href="/assets/files/Resume.pdf">
              Résumé
            </Link>
          </div>
        </div>
        <div className="w-full md:w-[30%] space-y-16">
          <div className="space-y-2">
            <p className="font-bold mb-4">Links</p>
            <p>
              <Link
                className="black-link"
                href="https://orcid.org/0000-0002-5075-3524"
              >
                ORCID
              </Link>
            </p>
            <p>
              <Link
                className="black-link"
                href="https://scholar.google.com/citations?user=oRtbHw4AAAAJ&hl=en"
              >
                Google Scholar
              </Link>
            </p>
            <p>
              <Link
                className="black-link"
                href="https://www.linkedin.com/in/jonathan-cui-110b211a6"
              >
                LinkedIn
              </Link>
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-bold mb-4">Notes from Penn State</p>
            <p>
              <Link className="black-link" href="/assets/files/401.pdf">
                MATH 401
              </Link>
            </p>
            <p>
              <Link className="black-link" href="/assets/files/436.pdf">
                MATH 436
              </Link>
            </p>
            <p>
              <Link className="black-link" href="/assets/files/464.pdf">
                CMPSC 464
              </Link>
            </p>
            <p>
              <Link className="black-link" href="/assets/files/435.pdf">
                MATH 435
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-[80%] space-y-12 pad bg-dark py-24">
        <p className="section-title">Exploration of the Arts</p>
        <div className="flex flex-col md:flex-row justify-between border-t-1 py-12 gap-6">
          <p className="orpheus text-xl md:text-2xl">Music</p>
          <p className="max-w-full md:max-w-[80%]">
            I am a keyboardist primarily focused on worship music, previously
            active at{" "}
            <Link
              className="white-link"
              href="https://www.reallifechurchfamily.org/"
            >
              <i>Real Life Church, Vacaville</i>
            </Link>{" "}
            and{" "}
            <Link className="white-link" href="https://impactpsh.com/">
              <i>Impact Fellowship</i>
            </Link>
            . I have also engaged myself with the{" "}
            <Link className="white-link" href="https://thegffo.com/">
              <i>Grand Feature Film Orchestra</i>
            </Link>{" "}
            and the{" "}
            <Link
              className="white-link"
              href="https://open.spotify.com/artist/3MLMJiC9PqGb1f3ysSrrYX"
            >
              <i>Kineo Chapel Band</i>
            </Link>
            .
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-between border-t-1 py-12 gap-6">
          <p className="orpheus text-xl md:text-2xl">Graphics Design</p>
          <p className="max-w-full md:max-w-[80%]">
            Currently employed at the Pennsylvania State University, Harrisburg,
            I create professional posters, banners, and other promotional
            material for the School of Humanities.
          </p>
        </div>
        <Link
          className="light-button"
          href="https://sway.office.com/qHuaPGQEKeIjePnJ"
        >
          Portfolio
        </Link>
      </div>
      <div className="pad bg-light py-24">
        <p className="w-full md:w-[80%] orpheus text-4xl md:text-6xl !leading-normal text-balance">
          “Entities must not be multiplied beyond necessity.”
        </p>
        <p className="pt-8">— William of Ockham</p>
      </div>
      <div className="pad bg-dark py-12 text-sm">
        Copyright © Jonathan Cui 2024
      </div>
    </>
  );
}

import { IconBrandGitlab, IconLink } from "justd-icons";
import Image, { type StaticImageData } from "next/image";
import { type FC } from "react";

import { type BlurFade as NativeBlurFade } from "@/components/BlurFade";
import { Button } from "@/components/Button";
import { Spacer } from "@/components/Spacer";

type CardData = {
  index: number;
  title: string;
  body: React.ReactNode;
  projectLink: string | null;
  gitlabLink: string | null;
};

export const ProjectCard: FC<{
  animDelay: number;
  src: StaticImageData;
  alt: string;
  data: CardData;
  className?: string;
  BlurFade: typeof NativeBlurFade;
}> = ({
  animDelay,
  src,
  alt,
  data: { index, title, body, projectLink, gitlabLink },
  className,
  BlurFade,
}) => (
  <BlurFade className={className} delay={animDelay}>
    <div className="w-full">
      <div className="w-full h-[200px] flex justify-center items-center overflow-hidden">
        <Image alt={alt || `${title} preview`} src={src} />
      </div>

      <Spacer h={1.5} />

      <div className="flex flex-row gap-4">
        <p className="whitespace-nowrap">
          [ {String(index).padStart(2, "0")} ]
        </p>
        <div className="grow">
          <div className="flex flex-row gap-4 items-center">
            <h3 className="font-medium uppercase">{title}</h3>
            <div className="flex flex-row gap-2">
              {projectLink != null ? (
                <Button
                  aria-label={`Open ${title} project`}
                  href={projectLink}
                  variant="plain"
                >
                  <IconLink aria-hidden="true" />
                  <span className="sr-only">{`Open ${title}`}</span>
                </Button>
              ) : null}
              {gitlabLink != null ? (
                <Button
                  aria-label={`View ${title} source on GitLab`}
                  href={gitlabLink}
                  variant="plain"
                >
                  <IconBrandGitlab aria-hidden="true" />
                  <span className="sr-only">{`View ${title} source on GitLab`}</span>
                </Button>
              ) : null}
            </div>
          </div>

          <Spacer h={1} />

          {body}
        </div>
      </div>
    </div>
  </BlurFade>
);

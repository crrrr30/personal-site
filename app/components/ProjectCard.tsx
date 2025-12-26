import { IconBrandGitlab, IconLink } from "justd-icons";
import Image, { type StaticImageData } from "next/image";
import { type FC } from "react";

import { BlurFade } from "@/components/BlurFade";
import { Button } from "@/components/Button";
import { Spacer } from "@/components/Spacer";

type CardData = {
  index: number;
  title: string;
  body: React.ReactNode;
};

export const ProjectCard: FC<{
  animDelay: number;
  src: StaticImageData;
  alt: string;
  data: CardData;
  className?: string;
}> = ({ animDelay, src, alt, data, className }) => (
  <BlurFade className={className} delay={animDelay}>
    <div className="w-full">
      <div className="w-full h-[200px] flex justify-center items-center overflow-hidden">
        <Image alt={alt} src={src} />
      </div>

      <Spacer h={1.5} />

      <div className="flex flex-row gap-4">
        <p className="whitespace-nowrap">
          [ {String(data.index).padStart(2, "0")} ]
        </p>
        <div className="grow">
          <div className="flex flex-row gap-4 items-center">
            <h3 className="font-medium">{data.title}</h3>
            <div className="flex flex-row gap-2">
              <Button variant="plain">
                <IconLink />
              </Button>
              <Button variant="plain">
                <IconBrandGitlab />
              </Button>
            </div>
          </div>

          <Spacer h={1} />

          {data.body}
        </div>
      </div>
    </div>
  </BlurFade>
);

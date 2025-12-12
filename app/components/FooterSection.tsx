import { useRef, type FC } from "react";

import { useBlurFade } from "@/app/hooks/useBlurFade";
import { Spacer } from "@/components/Spacer";
import { SplitText } from "@/components/SplitText";
import { SVGName } from "@/components/SVGName";
import { cn } from "@/lib/utils";

export const FooterSection: FC = () => {
  const ref = useRef(null);
  const BlurFade = useBlurFade(ref);

  return (
    <section
      ref={ref}
      className="bg-[#232323] text-[#f6f6f6] relative overflow-hidden"
      data-panel="footer"
    >
      <div
        className={cn(
          "mx-auto max-w-container",
          "px-page",
          "flex flex-col justify-between h-screen",
        )}
        data-panel-inner=""
      >
        <div className="pt-32">
          <SplitText
            className="[&_*]:text-6xl md:[&_*]:text-9xl [&_*]:font-light [&_*]:tracking-tighter"
            inViewRef={ref}
            splitType="words"
            text="“Entities must not be multiplied beyond necessity.”"
            textAlign="left"
          />

          <Spacer h={6} />

          <BlurFade delay={0.5}>
            <p className="text-2xl">— William of Ockham</p>
          </BlurFade>
        </div>

        <BlurFade delay={1.0}>
          <SVGName color="#f6f6f620" />
        </BlurFade>
      </div>
    </section>
  );
};

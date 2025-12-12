import { type RefObject } from "react";

import { BlurFade } from "@/components/BlurFade";

export const useBlurFade = (
  ref: RefObject<HTMLElement | null>,
): typeof BlurFade => {
  const BlurFadeWithRef: typeof BlurFade = ({ ...props }) => (
    <BlurFade {...props} inViewRef={ref} />
  );

  return BlurFadeWithRef;
};

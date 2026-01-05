import { useMemo, type RefObject } from "react";

import { BlurFade } from "@/components/BlurFade";

export const useBlurFade = (
  ref: RefObject<HTMLElement | null>,
  options?: { once: boolean },
): typeof BlurFade => {
  const once = options?.once ?? false;
  const BlurFadeWithRef = useMemo(() => {
    const WithRef: typeof BlurFade = ({ ...props }) => (
      <BlurFade {...props} inViewRef={ref} once={once} />
    );

    return WithRef;
  }, [once, ref]);

  return BlurFadeWithRef;
};

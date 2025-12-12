import { type RefObject } from "react";

import { Divider } from "@/components/Divider";

export const useDivider = (
  ref: RefObject<HTMLElement | null>,
): typeof Divider => {
  const DividerWithRef: typeof Divider = ({ ...props }) => (
    <Divider {...props} inViewRef={ref} />
  );

  return DividerWithRef;
};

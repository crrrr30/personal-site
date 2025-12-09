import { useRef, type FC, type ReactNode } from "react";

import { BodyDivContext } from "@/app/providers/BodyDivContext";
import { cn } from "@/lib/utils";

export type BodyDivProps = {
  className?: string;
  children: ReactNode;
};

export const BodyDiv: FC<BodyDivProps> = ({ className, children }) => {
  const ref = useRef(null);

  return (
    <div
      ref={ref}
      className={cn("w-screeen h-screen overflow-x-hidden", className)}
    >
      <BodyDivContext.Provider value={ref}>{children}</BodyDivContext.Provider>
    </div>
  );
};

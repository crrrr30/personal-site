"use client";

import { useEffect } from "react";

import { PageInViewContext } from "@/app/providers/PageInViewContext";
import { TextButton } from "@/components/Button";
import { NavBar } from "@/components/NavBar";
import { SplitText } from "@/components/SplitText";
import { cn } from "@/lib/utils";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    /* eslint-disable no-console */
    console.error(error);
  }, [error]);

  return (
    <PageInViewContext.Provider value={true}>
      <div className={cn("w-screen h-screen", "flex flex-col")}>
        <NavBar />

        <div
          className={cn(
            "px-page pb-48",
            "grow",
            "flex flex-col justify-end items-start gap-16 md:gap-32",
          )}
        >
          <div
            className={cn(
              "[&_*]:text-[4rem] md:[&_*]:text-[9rem] [&_*]:font-thin",
              "[&_*]:tracking-[-0.075em] [&_*]:leading-[0.75em]",
              "flex flex-col items-start",
            )}
          >
            <SplitText delay={0} splitDelay={25} text="Something" />
            <SplitText delay={0.15} splitDelay={25} text="went" />
            <SplitText delay={0.3} splitDelay={25} text="wrong" />
          </div>

          <TextButton text="Try again" onPress={() => reset()} />
        </div>
      </div>
    </PageInViewContext.Provider>
  );
}

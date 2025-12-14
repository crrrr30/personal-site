import { useEffect, useState } from "react";

export const useCoarse = () => {
  const [coarse, setCoarse] = useState<boolean | null>(null);

  useEffect(() => {
    const coarsePointer = window.matchMedia("(pointer: coarse)");

    setCoarse(coarsePointer.matches);

    const listener = (e: MediaQueryListEvent) => {
      setCoarse(e.matches);
    };

    coarsePointer.addEventListener("change", listener);

    return () => {
      coarsePointer.removeEventListener("change", listener);
    };
  }, [setCoarse]);

  return coarse;
};

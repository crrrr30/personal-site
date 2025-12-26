import type Lenis from "lenis";

import { createContext, type MutableRefObject, useContext } from "react";

export const SmoothScrollContext =
  createContext<MutableRefObject<Lenis | null> | null>(null);

export const useSmoothScrollContext = () => useContext(SmoothScrollContext);

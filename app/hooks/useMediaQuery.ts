import { useEffect, useState } from "react";

type MediaQueryListLegacy = MediaQueryList & {
  addListener?: (listener: (event: MediaQueryListEvent) => void) => void;
  removeListener?: (listener: (event: MediaQueryListEvent) => void) => void;
};

const MD_QUERY = "(min-width: 768px)";

const getMatches = (query: string) => {
  if (typeof window === "undefined") return false;

  return window.matchMedia(query).matches;
};

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(() => getMatches(query));

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query);
    const legacyMediaQuery = mediaQuery as MediaQueryListLegacy;
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);

    // ensure we sync with the current value when the effect runs
    setMatches(mediaQuery.matches);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handler);

      return () => {
        mediaQuery.removeEventListener("change", handler);
      };
    }

    legacyMediaQuery.addListener?.(handler);

    return () => {
      legacyMediaQuery.removeListener?.(handler);
    };
  }, [query]);

  return matches;
};

export const useIsMd = () => useMediaQuery(MD_QUERY);

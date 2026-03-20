import { useEffect, useState } from "react";
import { BREAKPOINTS } from "../config.js";

export function useMediaQuery(minWidth) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${minWidth}px)`);
    setMatches(mediaQuery.matches);

    const handler = (e) => setMatches(e.matches);
    mediaQuery.addListener(handler);
    return () => mediaQuery.removeListener(handler);
  }, [minWidth]);

  return matches;
}

export function useResponsive() {
  const isMobile = useMediaQuery(0);
  const isTablet = useMediaQuery(BREAKPOINTS.tablet);
  const isDesktop = useMediaQuery(BREAKPOINTS.desktop);
  const isWide = useMediaQuery(BREAKPOINTS.wide);

  return {
    isMobile: !isTablet,
    isTablet: isTablet && !isDesktop,
    isDesktop: isDesktop && !isWide,
    isWide,
  };
}

import { useMediaQuery } from "react-responsive";

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery({
    query: "(prefers-reduced-motion: reduce)",
  });
}

import { useMediaQuery } from "react-responsive";

export function useIsDesktop() {
  return useMediaQuery({
    query: "(min-width: 751px)",
  });
}

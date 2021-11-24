import { useEffect, useState } from "react";

const reducedMotionQuery = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

export function usePrefersReducedMotion(): boolean {
  const [state, setState] = useState(reducedMotionQuery.matches);

  useEffect(() => {
    const listener = () => {
      setState(reducedMotionQuery.matches);
    };

    if ("addEventListener" in reducedMotionQuery) {
      reducedMotionQuery.addEventListener("change", listener);
      return () => reducedMotionQuery.removeEventListener("change", listener);
    } else if ("addListener" in reducedMotionQuery) {
      reducedMotionQuery.addListener(listener);
      return () => reducedMotionQuery.removeListener(listener);
    }
  }, []);

  return state;
}

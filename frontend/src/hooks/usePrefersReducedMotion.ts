import { useEffect, useState } from "react";

const reducedMotionQuery = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);
const addListener =
  reducedMotionQuery.addEventListener ?? reducedMotionQuery.addListener;
const removeListener =
  reducedMotionQuery.removeEventListener ??
  reducedMotionQuery.removeEventListener;

export function usePrefersReducedMotion(): boolean {
  const [state, setState] = useState(reducedMotionQuery.matches);

  useEffect(() => {
    const listener = () => {
      setState(reducedMotionQuery.matches);
    };
    addListener("change", listener);
    return () => removeListener("change", listener);
  }, []);

  return state;
}

import { MutableRefObject, useEffect, useState } from "react";

const isSupported = "IntersectionObserver" in window;

/**
 * @see https://usehooks.com/useOnScreen/
 */
export function useOnScreen(ref: MutableRefObject<HTMLElement | null>) {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    if (isSupported) {
      const current = ref.current;

      const observer = new window.IntersectionObserver(([entry]) => {
        setIntersecting(entry.isIntersecting);
      });
      if (current) {
        observer.observe(current);
      }
      return () => {
        if (current) {
          observer.unobserve(current);
        }
      };
    } else {
      // always return true if browser doesn't support IntersectionObserver
      setIntersecting(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return isIntersecting;
}

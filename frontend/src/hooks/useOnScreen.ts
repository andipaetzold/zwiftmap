import { MutableRefObject, useEffect, useState } from "react";

/**
 * @see https://usehooks.com/useOnScreen/
 */
export function useOnScreen(ref: MutableRefObject<HTMLElement | null>) {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const current = ref.current;

    const observer = new IntersectionObserver(([entry]) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return isIntersecting;
}

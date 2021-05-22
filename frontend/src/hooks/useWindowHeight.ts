import { useEffect, useState } from "react";

export function useWindowHeight(): number {
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    function handleResize() {
      setHeight(window.innerHeight);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return height;
}

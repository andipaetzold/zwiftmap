import { useEffect, useState } from "react";

export function usePath(): string {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const listener = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener("popstate", listener);
    return () => window.removeEventListener("popstate", listener);
  }, []);

  return path;
}

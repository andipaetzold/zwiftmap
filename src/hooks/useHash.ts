import { useEffect, useState } from "react";

export function useHash(): [string, (hash: string) => void] {
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const listener = () => {
      setHash(window.location.hash);
    };

    window.addEventListener("popstate", listener);
    return () => window.removeEventListener("popstate", listener);
  }, []);

  return [hash.slice(1), updateHash];
}

function updateHash(hash: string) {
  window.location.hash = `#${hash}`;
}

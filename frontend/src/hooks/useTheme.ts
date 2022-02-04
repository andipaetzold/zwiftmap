import { useEffect, useRef } from "react";
import { useSettings } from "./useSettings";

export function useTheme(): void {
  const theme = useSettings((state) => state.theme);
  const prevClassName = useRef<string>("theme-system");

  useEffect(() => {
    const root = document.documentElement as HTMLElement;
    root.classList.remove(prevClassName.current);

    const newClassName = `theme-${theme}`;
    root.classList.add(newClassName);
    prevClassName.current = newClassName;
  }, [theme]);
}

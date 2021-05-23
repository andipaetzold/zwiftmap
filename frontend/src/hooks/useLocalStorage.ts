import { useCallback, useEffect, useState } from "react";

type Listener = () => void;
const listeners: Listener[] = [];

export function useLocalStorage(
  key: string
): [string | null, (newValue: string | null) => void] {
  const getValue = useCallback(() => {
    return localStorage.getItem(key);
  }, [key]);

  const [value, setValueInternal] = useState<string | null>(getValue);

  useEffect(() => {
    setValueInternal(getValue());
  }, [getValue]);

  useEffect(() => {
    const listener: Listener = () => {
      setValueInternal(getValue());
    };

    listeners.push(listener);
    return () => {
      listeners.splice(
        listeners.findIndex((l) => l === listener),
        1
      );
    };
  }, [getValue]);

  const setValue = useCallback(
    (value: string | null) => {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }
      setValueInternal(value);

      listeners.forEach((listener) => listener());
    },
    [key]
  );

  useEffect(() => {
    const eventListener = () => {
      setValueInternal(getValue());
    };
    window.addEventListener("storage", eventListener);

    return window.removeEventListener("storage", eventListener);
  }, [getValue]);

  return [value, setValue];
}

import { useCallback, useEffect, useState } from "react";
import {
  addLocalStorageListener,
  getLocalStorageItem,
  setLocalStorageItem,
} from "../services/local-storage";

export function useLocalStorage(
  key: string,
): [string | null, (newValue: string | null) => void] {
  const [value, setValueInternal] = useState<string | null>(() =>
    getLocalStorageItem(key),
  );

  useEffect(() => {
    setValueInternal(getLocalStorageItem(key));
  }, [key]);

  useEffect(() => {
    return addLocalStorageListener(key, setValueInternal);
  }, [key]);

  const setValue = useCallback(
    (value: string | null) => {
      setLocalStorageItem(key, value);
    },
    [key],
  );

  return [value, setValue];
}

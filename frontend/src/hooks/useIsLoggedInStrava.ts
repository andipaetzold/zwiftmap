import { useEffect, useState } from "react";
import {
  addLocalStorageListener,
  getLocalStorageItem,
  STRAVA_AUTH_KEY,
} from "../services/local-storage";

export function useIsLoggedInStrava() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => getLocalStorageItem(STRAVA_AUTH_KEY) !== null
  );

  useEffect(() => {
    addLocalStorageListener(STRAVA_AUTH_KEY, (v) => setIsLoggedIn(v !== null));
  }, []);

  return isLoggedIn;
}

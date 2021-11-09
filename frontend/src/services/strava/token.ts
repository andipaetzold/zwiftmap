import { RefreshTokenResponse } from "strava/dist/types";
import {
  getLocalStorageItem,
  setLocalStorageItem,
  STRAVA_AUTH_KEY,
} from "../local-storage";

export function getStravaToken(): RefreshTokenResponse | null {
  const tokenString = getLocalStorageItem(STRAVA_AUTH_KEY);
  if (tokenString === null) {
    return null;
  }
  return JSON.parse(tokenString);
}

export function writeStravaToken(token: RefreshTokenResponse): void {
  setLocalStorageItem(STRAVA_AUTH_KEY, JSON.stringify(token));
}

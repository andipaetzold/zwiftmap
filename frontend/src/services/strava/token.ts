import {
  getLocalStorageItem,
  setLocalStorageItem,
  STRAVA_AUTH_KEY,
} from "../local-storage";
import { Token } from "./types";

export function getStravaToken(): Token | null {
  const tokenString = getLocalStorageItem(STRAVA_AUTH_KEY);
  if (tokenString === null) {
    return null;
  }
  return JSON.parse(tokenString);
}

export function writeStravaToken(token: Token): void {
  setLocalStorageItem(STRAVA_AUTH_KEY, JSON.stringify(token));
}

export async function removeStravaToken(): Promise<void> {
  const token = getStravaToken();
  if (!token) {
    return;
  }

  const params = new URLSearchParams();
  params.set("access_token", token.access_token);

  await fetch(`https://www.strava.com/oauth/deauthorize?${params.toString()}`, {
    method: "post",
  });

  setLocalStorageItem(STRAVA_AUTH_KEY, null);
}

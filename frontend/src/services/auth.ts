import { setLocalStorageItem, STRAVA_AUTH_KEY } from "./local-storage";
import { getStravaToken } from "./strava/token";
import { zwiftMapApi } from "./zwiftMapApi";

export async function logout(): Promise<void> {
  const token = getStravaToken();
  if (!token) {
    return;
  }

  setLocalStorageItem(STRAVA_AUTH_KEY, null);

  try {
    await zwiftMapApi.post("/auth/logout", {
      stravaToken: token.access_token,
    });
  } catch {}
}

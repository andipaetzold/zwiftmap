import { getStravaToken, writeStravaToken } from "./strava/token";
import { zwiftMapApi } from "./zwiftMapApi";

export async function logout(): Promise<void> {
  const token = getStravaToken();
  if (!token) {
    return;
  }

  writeStravaToken(null);
  await zwiftMapApi.post("/auth/logout");
}

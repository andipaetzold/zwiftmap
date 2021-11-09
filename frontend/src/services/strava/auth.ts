import { RefreshTokenResponse } from "strava/dist/types";
import { BACKEND_HOST } from "../../config";
import { zwiftMapApi } from "../zwiftMapApi";

function getStravaAuthUrl() {
  const params = new URLSearchParams();
  params.set(
    "state",
    JSON.stringify({
      path: window.location.pathname,
      search: Object.fromEntries(
        new URLSearchParams(window.location.search).entries()
      ),
    })
  );

  return `${BACKEND_HOST}/strava/authorize?${params.toString()}`;
}

export function openStravaAuthUrl() {
  window.location.href = getStravaAuthUrl();
}

export async function getRefreshedToken(
  refreshToken: string
): Promise<RefreshTokenResponse> {
  const response = await zwiftMapApi.post<RefreshTokenResponse>(
    "/strava/refresh",
    {
      refresh_token: refreshToken,
    }
  );

  return response.data;
}

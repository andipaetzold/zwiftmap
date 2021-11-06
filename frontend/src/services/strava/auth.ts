import { BACKEND_HOST } from "../../config";
import { zwiftMapApi } from "../zwiftMapApi";
import { Token } from "./types";

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

export async function getRefreshedToken(refreshToken: string): Promise<Token> {
  const response = await zwiftMapApi.post<Token>("/strava/refresh", {
    refresh_token: refreshToken,
  });

  return response.data;
}

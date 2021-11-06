import axios from "axios";
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

  return `${
    process.env.NODE_ENV === "production"
      ? "https://api.zwiftmap.com"
      : "http://localhost:3001"
  }/strava/authorize?${params.toString()}`;
}

export function openStravaAuthUrl() {
  window.location.href = getStravaAuthUrl();
}

export async function getRefreshedToken(refreshToken: string): Promise<Token> {
  const url = `${
    process.env.NODE_ENV === "production"
      ? "https://api.zwiftmap.com"
      : "http://localhost:3001"
  }/strava/refresh`;

  const response = await axios.post<Token>(url, {
    refresh_token: refreshToken,
  });

  return response.data;
}

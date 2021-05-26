import axios from "axios";
import { Token } from "./types";

export function getStravaAuthUrl(state: Record<string, string>) {
  const params = new URLSearchParams();
  params.set("state", JSON.stringify(state));

  return `${
    process.env.NODE_ENV === "production"
      ? "https://api.zwiftmap.com"
      : "http://localhost:3001"
  }/strava/authorize?${params.toString()}`;
}

export async function getRefreshedToken(refreshToken: string): Promise<Token> {
  const url = `${
    process.env.NODE_ENV === "production"
      ? "https://api.zwiftmap.com"
      : "http://localhost:3001"
  }/strava/refresh`;

  const response = await axios.post(url, {
    refresh_token: refreshToken,
  });

  return response.data;
}

import { useEffect, useState } from "react";
import { RefreshTokenResponse } from "strava/dist/types";
import { BACKEND_HOST } from "../../config";
import { zwiftMapApi } from "../zwiftMapApi";
import { writeStravaToken } from "./token";

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

export function useStravaAuthUrl(): string {
  const [url, setUrl] = useState(getStravaAuthUrl);

  useEffect(() => {
    const listener = () => setUrl(getStravaAuthUrl());
    window.addEventListener("popstate", listener);
    return () => window.removeEventListener("popstate", listener);
  }, []);
  return url;
}

export async function getRefreshedToken(): Promise<RefreshTokenResponse> {
  const response = await zwiftMapApi.post<RefreshTokenResponse>(
    "/strava/refresh"
  );

  writeStravaToken(response.data);

  return response.data;
}

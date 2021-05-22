const LOCAL_STORAGE_KEY = "strava_token";

export function getStravaToken(): StravaToken | null {
  const tokenString = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (tokenString === null) {
    return null;
  }

  return JSON.parse(tokenString);
}

export function writeStravaToken(token: StravaToken): void {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(token));
}

export function clearStravaToken(): void {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}

export function getStravaAuthUrl(state: string) {
  return `${
    process.env.NODE_ENV === "production"
      ? "https://zwiftmap.heroku.com"
      : "http://localhost:3001"
  }/strava/authorize?state=${state}`;
}

interface StravaToken {
  token_type: "Bearer";
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  access_token: string;
  athlete: any;
}

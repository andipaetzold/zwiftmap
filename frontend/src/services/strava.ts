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

const CLIENT_ID = "66426";
const REDIRECT_URI =
  process.env.NODE_ENV === "production"
    ? "https://zwiftmap.heroku.com"
    : "http://localhost:3000";

export const STRAVA_AUTH_URL = `https://www.strava.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=activity:read_all`;

interface StravaToken {
  token_type: "Bearer";
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  access_token: string;
  athlete: any;
}

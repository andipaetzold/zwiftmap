const LOCAL_STORAGE_KEY = "strava_token";

export function getStravaToken(): string | null {
  const tokenString = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (tokenString === null) {
    return null;
  }

  return JSON.parse(tokenString);
}

export function writeStravaToken(token: string): void {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(token));
}

export function clearStravaToken(): void {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}

export function getStravaAuthUrl(state: Record<string, string>) {
  const params = new URLSearchParams();
  params.set("state", JSON.stringify(state));

  return `${
    process.env.NODE_ENV === "production"
      ? "https://zwiftmap.herokuapp.com"
      : "http://localhost:3001"
  }/strava/authorize?${params.toString()}`;
}

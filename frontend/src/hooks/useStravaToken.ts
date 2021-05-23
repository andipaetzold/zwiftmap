import { useLocalStorage } from "./useLocalStorage";

export function useStravaToken(): [
  string | null,
  (token: string | null) => void
] {
  return useLocalStorage("strava-token");
}

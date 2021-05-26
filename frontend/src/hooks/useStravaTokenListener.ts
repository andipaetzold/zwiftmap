import { useCallback, useEffect } from "react";
import { writeStravaToken } from "../services/strava/token";

export function useStravaTokenListener(): void {
  const updateStravaToken = useCallback(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.has("strava-auth")) {
      writeStravaToken(JSON.parse(params.get("strava-auth")!));

      params.delete("strava-auth");
      window.history.replaceState(
        undefined,
        "",
        `${window.location.origin}${
          window.location.pathname
        }?${params.toString()}`
      );
    }
  }, []);

  useEffect(() => {
    updateStravaToken();
  }, [updateStravaToken]);

  useEffect(() => {
    window.addEventListener("popstate", updateStravaToken);
    return () => window.removeEventListener("popstate", updateStravaToken);
  }, [updateStravaToken]);
}

import { useCallback, useEffect } from "react";
import { useStravaToken } from "./useStravaToken";

export function useStravaTokenListener(): void {
  const [, setStravaToken] = useStravaToken();

  const updateStravaToken = useCallback(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.has("strava-access-token")) {
      setStravaToken(params.get("strava-access-token")!);

      params.delete("strava-access-token");
      window.history.pushState(
        undefined,
        "",
        `${window.location.origin}${
          window.location.pathname
        }?${params.toString()}`
      );
    }
  }, [setStravaToken]);

  useEffect(() => {
    updateStravaToken();
  }, [updateStravaToken]);

  useEffect(() => {
    window.addEventListener("popstate", updateStravaToken);
    return () => window.removeEventListener("popstate", updateStravaToken);
  }, [updateStravaToken]);
}

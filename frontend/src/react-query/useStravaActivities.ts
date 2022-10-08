import { useQuery } from "@tanstack/react-query";
import { useIsLoggedInStrava } from "../hooks/useIsLoggedInStrava";
import { getStravaActivities } from "../services/zwiftMapApi";

export function useStravaActivities() {
  const isLoggedIn = useIsLoggedInStrava();
  return useQuery(["strava-activities"], () => getStravaActivities(), {
    staleTime: Infinity,
    enabled: isLoggedIn === true,
  });
}

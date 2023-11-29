import { useQuery } from "@tanstack/react-query";
import { useIsLoggedInStrava } from "../hooks/useIsLoggedInStrava";
import { getStravaActivities } from "../services/zwiftMapApi";

export function useStravaActivities() {
  const isLoggedIn = useIsLoggedInStrava();
  return useQuery({
    queryKey: ["strava-activities"],
    queryFn: () => getStravaActivities(),
    staleTime: Infinity,
    enabled: isLoggedIn === true,
  });
}

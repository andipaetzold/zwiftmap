import { useQuery } from "@tanstack/react-query";
import { useIsLoggedInStrava } from "../hooks/useIsLoggedInStrava";
import { getStravaSegmentById } from "../services/zwiftMapApi";

export function useStravaSegment(segmentId: number | undefined) {
  const isLoggedIn = useIsLoggedInStrava();
  return useQuery({
    queryKey: ["strava-segment", segmentId],
    queryFn: () => getStravaSegmentById(segmentId!),
    staleTime: Infinity,
    enabled: isLoggedIn === true && !!segmentId,
  });
}

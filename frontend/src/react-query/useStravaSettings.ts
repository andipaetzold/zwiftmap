import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useIsLoggedInStrava } from "../hooks/useIsLoggedInStrava";
import {
  getStravaSettings,
  updateStravaSettings,
} from "../services/zwiftMapApi";
import { StravaSettings } from "../types";

const queryKey = ["auth", "strava-settings"];

export function useStravaSettings(): [
  StravaSettings | null,
  (settings: StravaSettings) => void
] {
  const isLoggedInStrava = useIsLoggedInStrava();

  const queryClient = useQueryClient();
  const { data: stravaSettings } = useQuery(
    ["auth", "strava-settings"],
    async () => {
      return await getStravaSettings();
    },
    { enabled: isLoggedInStrava === true }
  );
  const { mutate } = useMutation(updateStravaSettings, {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
  });

  return [stravaSettings ?? null, mutate];
}

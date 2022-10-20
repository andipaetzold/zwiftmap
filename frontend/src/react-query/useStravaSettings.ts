import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useIsLoggedInStrava } from "../hooks/useIsLoggedInStrava";
import {
  getStravaSettings,
  updateStravaSettings,
} from "../services/zwiftMapApi";
import { StravaSettings } from "../types";
import { queries } from "./queryKeys";

export function useStravaSettings(): [
  StravaSettings | null,
  (settings: StravaSettings) => void
] {
  const isLoggedInStrava = useIsLoggedInStrava();

  const queryClient = useQueryClient();
  const { data: stravaSettings } = useQuery(
    queries.authStravaSettings,
    async () => {
      if (isLoggedInStrava) {
        return await getStravaSettings();
      } else {
        return null;
      }
    }
  );
  const { mutate } = useMutation(updateStravaSettings, {
    onSuccess: () => queryClient.invalidateQueries(queries.authStravaSettings),
  });
  console.log(stravaSettings);

  return [stravaSettings ?? null, mutate];
}

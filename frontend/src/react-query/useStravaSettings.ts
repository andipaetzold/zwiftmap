import { useQuery } from "@tanstack/react-query";
import { useIsLoggedInStrava } from "../hooks/useIsLoggedInStrava";
import { getStravaSettings } from "../services/zwiftMapApi";
import { StravaSettings } from "../types";
import { queries } from "./queryKeys";
import { useUpdateStravaSettings } from "./useUpdateStravaSettings";

export function useStravaSettings(): [
  StravaSettings | null,
  (settings: StravaSettings) => void,
] {
  const isLoggedInStrava = useIsLoggedInStrava();
  const { data: stravaSettings } = useQuery({
    queryKey: queries.authStravaSettings,
    queryFn: async () => {
      if (isLoggedInStrava) {
        return await getStravaSettings();
      } else {
        return null;
      }
    },
  });
  const { mutate } = useUpdateStravaSettings();

  return [stravaSettings ?? null, mutate];
}

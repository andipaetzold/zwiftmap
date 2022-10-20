import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStravaSettings } from "../services/zwiftMapApi";
import { queries } from "./queryKeys";

export function useUpdateStravaSettings() {
  const queryClient = useQueryClient();
  return useMutation(updateStravaSettings, {
    onSuccess: () => queryClient.invalidateQueries(queries.authStravaSettings),
  });
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authLogout } from "../services/zwiftMapApi";
import { queries } from "./queryKeys";

export function useAuthLogout() {
  const queryClient = useQueryClient();
  return useMutation(
    async () => {
      await authLogout();
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(queries.authStatus);
        await queryClient.invalidateQueries(["strava"]);
      },
    },
  );
}

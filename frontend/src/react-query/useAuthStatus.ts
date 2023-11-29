import { useQuery } from "@tanstack/react-query";
import { getAuthStatus } from "../services/zwiftMapApi";
import { queries } from "./queryKeys";

export function useAuthStatus() {
  return useQuery({
    queryKey: queries.authStatus,
    queryFn: () => getAuthStatus(),
    staleTime: Infinity,
  });
}

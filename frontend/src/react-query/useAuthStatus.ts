import { useQuery } from "@tanstack/react-query";
import { getAuthStatus } from "../services/zwiftMapApi";
import { queries } from "./queryKeys";

export function useAuthStatus() {
  return useQuery(queries.authStatus, () => getAuthStatus(), {
    staleTime: Infinity,
  });
}

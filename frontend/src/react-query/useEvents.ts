import { useQuery } from "@tanstack/react-query";
import { getEvents } from "../services/zwiftMapApi";

export function useEvents() {
  return useQuery(["events"], () => getEvents(), {
    staleTime: 5 * 60,
  });
}

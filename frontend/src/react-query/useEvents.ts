import { useQuery } from "@tanstack/react-query";
import { getEvents } from "../services/zwiftMapApi";
import { queries } from "./queryKeys";

const STALE_TIME = 5 * 60;

export function useEvents() {
  return useQuery(queries.events, () => getEvents(), {
    staleTime: STALE_TIME,
  });
}

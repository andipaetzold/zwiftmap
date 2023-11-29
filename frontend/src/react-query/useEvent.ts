import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getEvent } from "../services/zwiftMapApi";
import { ZwiftEvent } from "../types";
import { queries } from "./queryKeys";

const STALE_TIME = 60 * 60;

export function useEvent<TData = ZwiftEvent>(
  eventId: number | undefined,
  options?: Omit<
    UseQueryOptions<ZwiftEvent, Error, TData, QueryKey>,
    "queryKey" | "queryFn" | "staleTime"
  >
) {
  return useQuery<ZwiftEvent, Error, TData, QueryKey>({
    queryKey: queries.event(eventId),
    queryFn: () => getEvent(eventId!),
    staleTime: STALE_TIME,
    ...options,
    enabled: (options?.enabled ?? true) && eventId !== undefined,
  });
}

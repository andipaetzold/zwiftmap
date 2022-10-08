import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getEvent } from "../services/zwiftMapApi";
import { ZwiftEvent } from "../types";

export const eventQueryKey = (eventId: number | undefined) => [
  "events",
  eventId,
];

export function useEvent<TData = ZwiftEvent>(
  eventId: number | undefined,
  options?: Omit<
    UseQueryOptions<ZwiftEvent, Error, TData, QueryKey>,
    "queryKey" | "queryFn" | "staleTime"
  >
) {
  return useQuery<ZwiftEvent, Error, TData, QueryKey>(
    eventQueryKey(eventId),
    () => getEvent(eventId!),
    {
      staleTime: 60 * 60,
      ...options,
      enabled: (options?.enabled ?? true) && eventId !== undefined,
    }
  );
}

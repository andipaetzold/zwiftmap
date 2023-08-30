import { useQueries, UseQueryResult } from "@tanstack/react-query";
import { StravaSegment } from "../types";
import { getStravaSegmentStreamQueryOptions } from "./useStravaSegmentStream";

type Stream = "altitude" | "distance" | "latlng";

interface Params<T extends readonly Stream[]> {
  stravaSegmentId: number | undefined;
  streams: T;
}

export function useStravaSegmentStreams<T extends readonly Stream[]>(
  params: Params<T>,
): { [K in keyof T]: UseQueryResult<StravaSegment[T[K]], unknown> } {
  // @ts-expect-error Nobody got time for that
  return useQueries({
    queries: params.streams.map((stream) =>
      getStravaSegmentStreamQueryOptions({
        stravaSegmentId: params.stravaSegmentId,
        stream,
      }),
    ),
  });
}

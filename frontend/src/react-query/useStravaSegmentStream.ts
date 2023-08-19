import {
  QueryFunctionContext,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { getStravaSegmentStream } from "../services/StravaSegmentRepository";
import { StravaSegment } from "../types";

type Stream = "altitude" | "distance" | "latlng";

interface Params<S extends Stream> {
  stravaSegmentId: number | undefined;
  stream: S;
}

type QueryKey<S = Stream> = [
  "strava-segments",
  number | undefined,
  "streams",
  S,
];

const createQueryKey = <S extends Stream>(params: Params<S>): QueryKey<S> => [
  "strava-segments",
  params.stravaSegmentId,
  "streams",
  params.stream,
];

const queryFn = <S extends Stream>({
  queryKey: [, stravaSegmentId, , stream],
}: QueryFunctionContext<QueryKey<S>>) =>
  getStravaSegmentStream<S>(stravaSegmentId!, stream as S);

export function useStravaSegmentStream<
  S extends Stream,
  TData = StravaSegment[S],
>(
  params: Params<S>,
  options?: Omit<
    UseQueryOptions<StravaSegment[S], unknown, TData, QueryKey<S>>,
    "queryFn" | "queryKey" | "staleTime"
  >,
) {
  return useQuery(
    getStravaSegmentStreamQueryOptions<S, TData>(params, options),
  );
}

export function getStravaSegmentStreamQueryOptions<
  S extends Stream,
  TData = StravaSegment[S],
>(
  params: Params<S>,
  options?: Omit<
    UseQueryOptions<StravaSegment[S], unknown, TData, QueryKey<S>>,
    "queryFn" | "queryKey" | "staleTime"
  >,
): UseQueryOptions<StravaSegment[S], unknown, TData, QueryKey<S>> {
  return {
    queryKey: createQueryKey(params),
    queryFn: queryFn,
    ...options,
    staleTime: Infinity,
    enabled: (options?.enabled ?? true) && params.stravaSegmentId !== undefined,
  };
}

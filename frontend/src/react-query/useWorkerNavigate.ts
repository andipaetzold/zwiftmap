import {
  QueryFunctionContext,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { LatLngTuple } from "leaflet";
import range from "lodash-es/range";
import { WorldSlug } from "zwift-data";
import { worker } from "../services/worker-client";
import { LatLngAlt } from "../types";

interface Params {
  world: WorldSlug;
  points: LatLngTuple[];
}

const createQueryKey = (params: Params | undefined) =>
  ["worker", "navigate", params] as const;
type QueryKey = ReturnType<typeof createQueryKey>;

async function queryFn({
  queryKey: [, , params],
}: QueryFunctionContext<QueryKey>) {
  const noNullPoints = params!.points.filter(
    (p): p is LatLngTuple => p !== null
  );

  if (noNullPoints.length < 2) {
    return null;
  }

  const routes = await Promise.all(
    range(0, noNullPoints.length - 1).map((index) =>
      worker.navigate(
        noNullPoints[index],
        noNullPoints[index + 1],
        params!.world
      )
    )
  );

  return ([] as LatLngAlt[]).concat.apply([], routes);
}

export function useWorkerNavigate<TData = LatLngAlt[] | null>(
  params: Params | undefined,
  options?: Omit<
    UseQueryOptions<LatLngAlt[] | null, unknown, TData, QueryKey>,
    "queryKey" | "queryFn" | "staleTime" | "cacheTime"
  >
) {
  return useQuery(getWorkerNavigateQueryOptions<TData>(params, options));
}

export function getWorkerNavigateQueryOptions<TData = LatLngAlt[] | null>(
  params: Params | undefined,
  options?: Omit<
    UseQueryOptions<LatLngAlt[] | null, unknown, TData, QueryKey>,
    "queryFn" | "queryKey" | "staleTime" | "cacheTime"
  >
): UseQueryOptions<LatLngAlt[] | null, unknown, TData, QueryKey> {
  return {
    queryKey: createQueryKey(params),
    queryFn,
    staleTime: 0,
    gcTime: 0,
    ...options,
    enabled: (options?.enabled ?? true) && params !== undefined,
  };
}

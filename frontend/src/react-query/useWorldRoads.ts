import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { WorldSlug } from "zwift-data";
import { WORLD_ROADS } from "../services/roads";

const queryKey = (world: WorldSlug) => ["worlds", world, "roads"] as const;

export type WorldRoadsQueryKey = ReturnType<typeof queryKey>;
export type WorldRoadsQueryFnContext = QueryFunctionContext<WorldRoadsQueryKey>;

const queryFn = ({ queryKey: [, world] }: WorldRoadsQueryFnContext) =>
  WORLD_ROADS[world]();

export function useWorldRoads(world: WorldSlug) {
  return useQuery(queryKey(world), queryFn, {
    staleTime: Infinity,
  });
}

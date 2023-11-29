import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { WorldSlug } from "zwift-data";
import { WORLD_ROADS } from "../shared/roads";
import { queries } from "./queryKeys";

type QueryKey = ReturnType<(typeof queries)["worldRoads"]>;
type Context = QueryFunctionContext<QueryKey>;

const queryFn = ({ queryKey: [, world] }: Context) => WORLD_ROADS[world]();

export function useWorldRoads(world: WorldSlug) {
  return useQuery({
    queryKey: queries.worldRoads(world),
    queryFn,
    staleTime: Infinity,
  });
}

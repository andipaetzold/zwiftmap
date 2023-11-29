import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { Position, polygon } from "@turf/helpers";
import { WorldSlug } from "zwift-data";
import { request } from "../services/request";
import { queries } from "./queryKeys";

type QueryKey = ReturnType<(typeof queries)["worldRoadsBuffered"]>;
type Context = QueryFunctionContext<QueryKey>;

const queryFn = async ({ queryKey: [, world] }: Context) => {
  try {
    return await request<Position[][]>(`/worlds/${world}/roads-buffered.json`);
  } catch {
    throw new Error(`Error fetching buffered world roads for ${world}`);
  }
};

export function useWorldRoadsBuffered(world: WorldSlug) {
  return useQuery({
    queryKey: queries.worldRoadsBuffered(world),
    queryFn,
    staleTime: Infinity,
    select: (data) => polygon(data),
  });
}

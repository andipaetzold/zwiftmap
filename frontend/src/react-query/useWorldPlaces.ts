import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { WorldSlug } from "zwift-data";
import { getPlaces } from "../services/zwiftMapApi";
import { queries } from "./queryKeys";

type QueryKey = ReturnType<typeof queries["worldPlaces"]>;
type Context = QueryFunctionContext<QueryKey>;

const queryFn = ({ queryKey: [, world] }: Context) => getPlaces(world);

export function useWorldPlaces(world: WorldSlug) {
  return useQuery(queries.worldPlaces(world), queryFn, {
    staleTime: Infinity,
  });
}

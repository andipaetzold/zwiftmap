import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { WorldSlug } from "zwift-data";
import { getPlace } from "../services/zwiftMapApi";
import { queries } from "./queryKeys";

type QueryKey = ReturnType<(typeof queries)["worldPlace"]>;
type Context = QueryFunctionContext<QueryKey>;

const queryFn = ({ queryKey: [, world, , placeId] }: Context) =>
  getPlace(world, placeId);

export function useWorldPlace(world?: WorldSlug, placeId?: string) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return useQuery({
    queryKey: queries.worldPlace(world!, placeId!),
    queryFn,
    staleTime: Infinity,
    enabled: !!world && !!placeId,
  });
}

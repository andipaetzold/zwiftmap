import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { WorldSlug } from "zwift-data";
import { useIsLoggedInStrava } from "../hooks/useIsLoggedInStrava";
import { getStravaPersonalHeatmap } from "../services/zwiftMapApi";
import { queries } from "./queryKeys";

type QueryKey = ReturnType<typeof queries["stravaPersonalHeatmap"]>;
type Context = QueryFunctionContext<QueryKey>;

const queryFn = async ({ queryKey: [, , world] }: Context) =>
  getStravaPersonalHeatmap(world);

export function useStravaPersonalHeatmap(world: WorldSlug) {
  const isLoggedIn = useIsLoggedInStrava();
  return useQuery(queries.stravaPersonalHeatmap(world), queryFn, {
    staleTime: Infinity,
    enabled: isLoggedIn === true,
  });
}

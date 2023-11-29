import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { WorldSlug } from "zwift-data";
import { useIsLoggedInStrava } from "../hooks/useIsLoggedInStrava";
import { getStravaFogGeoJSON } from "../services/zwiftMapApi";
import { queries } from "./queryKeys";

type QueryKey = ReturnType<(typeof queries)["stravaFogGeoJSON"]>;
type Context = QueryFunctionContext<QueryKey>;

const queryFn = async ({ queryKey: [, , world] }: Context) =>
  getStravaFogGeoJSON(world);

export function useStravaFogGeoJSON(world: WorldSlug) {
  const isLoggedIn = useIsLoggedInStrava();
  return useQuery({
    queryKey: queries.stravaFogGeoJSON(world),
    queryFn,
    staleTime: Infinity,
    enabled: isLoggedIn === true,
  });
}

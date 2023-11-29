import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { WorldSlug } from "zwift-data";
import { useIsLoggedInStrava } from "../hooks/useIsLoggedInStrava";
import { getStravaFogStats } from "../services/zwiftMapApi";
import { queries } from "./queryKeys";

type QueryKey = ReturnType<(typeof queries)["stravaFogStats"]>;
type Context = QueryFunctionContext<QueryKey>;

const queryFn = async ({ queryKey: [, , world] }: Context) =>
  getStravaFogStats(world);

export function useStravaFogStats(world: WorldSlug) {
  const isLoggedIn = useIsLoggedInStrava();
  return useQuery({
    queryKey: queries.stravaFogStats(world),
    queryFn,
    staleTime: Infinity,
    enabled: isLoggedIn === true,
  });
}

import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { WorldSlug } from "zwift-data";
import { useIsLoggedInStrava } from "../hooks/useIsLoggedInStrava";
import { getWorldUserFog } from "../services/zwiftMapApi";
import { queries } from "./queryKeys";

type QueryKey = ReturnType<typeof queries["worldUserFog"]>;
type Context = QueryFunctionContext<QueryKey>;

const queryFn = async ({ queryKey: [, world] }: Context) =>
  getWorldUserFog(world);

export function useWorldUserFog(world: WorldSlug) {
  const isLoggedIn = useIsLoggedInStrava();
  return useQuery(queries.worldUserFog(world), queryFn, {
    staleTime: Infinity,
    enabled: isLoggedIn === true,
  });
}

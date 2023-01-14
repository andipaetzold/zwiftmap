import { useQuery } from "@tanstack/react-query";
import { WorldSlug } from "zwift-data";
import { getWorldPlaces } from "../services/zwiftMapApi";
import { queries } from "./queryKeys";

export function useWorldPlaces(
  world: WorldSlug,
  verified: boolean | undefined
) {
  return useQuery(
    queries.worldPlaces(world),
    ({ queryKey: [, world] }) => getWorldPlaces(world, verified),
    {
      staleTime: Infinity,
    }
  );
}

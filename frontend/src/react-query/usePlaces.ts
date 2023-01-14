import { useQuery } from "@tanstack/react-query";
import { getPlaces } from "../services/zwiftMapApi";
import { queries } from "./queryKeys";

export function usePlaces(verified: boolean | undefined) {
  return useQuery(queries.places, () => getPlaces(verified), {
    staleTime: Infinity,
  });
}

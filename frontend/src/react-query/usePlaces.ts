import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { getPlaces } from "../services/zwiftMapApi";
import { queries } from "./queryKeys";

type QueryKey = typeof queries["places"];
type Context = QueryFunctionContext<QueryKey>;

const queryFn = ({ queryKey: [] }: Context) => getPlaces();

export function usePlaces() {
  return useQuery(queries.places, queryFn, {
    staleTime: Infinity,
  });
}

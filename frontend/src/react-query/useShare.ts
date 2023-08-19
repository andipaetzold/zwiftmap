import {
  QueryFunctionContext,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { getShare } from "../services/zwiftMapApi";
import { Share } from "../types";

const createQueryKey = (shareId: string | undefined) =>
  ["shares", shareId] as const;
type QueryKey = ReturnType<typeof createQueryKey>;

const queryFn = ({ queryKey: [, shareId] }: QueryFunctionContext<QueryKey>) =>
  getShare(shareId!);

export function useShare<TData = Share>(
  shareId: string | undefined,
  options?: Omit<
    UseQueryOptions<Share, unknown, TData, QueryKey>,
    "queryKey" | "queryFn" | "staleTime"
  >,
) {
  return useQuery(getShareQueryOptions(shareId, options));
}

export function getShareQueryOptions<TData = Share>(
  shareId: string | undefined,
  options?: Omit<
    UseQueryOptions<Share, unknown, TData, QueryKey>,
    "queryKey" | "queryFn" | "staleTime"
  >,
): UseQueryOptions<Share, unknown, TData, QueryKey> {
  return {
    queryKey: createQueryKey(shareId),
    queryFn: queryFn,
    staleTime: Infinity,
    ...options,
    enabled: (options?.enabled ?? true) && shareId !== undefined,
  };
}

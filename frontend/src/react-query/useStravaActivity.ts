import {
  QueryFunctionContext,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { useIsLoggedInStrava } from "../hooks/useIsLoggedInStrava";
import {
  getStravaActivity,
  StravaActivity,
} from "../services/StravaActivityRepository";

const createQueryKey = (activityId: number | undefined) =>
  ["strava-activities", activityId] as const;
type QueryKey = ReturnType<typeof createQueryKey>;

const queryFn = ({
  queryKey: [, activityId],
}: QueryFunctionContext<QueryKey>) => getStravaActivity(activityId!);

export function useStravaActivity<TData = StravaActivity>(
  activityId: number | undefined,
  options?: Omit<
    UseQueryOptions<StravaActivity, unknown, TData, QueryKey>,
    "queryKey" | "queryFn" | "staleTime" | "enabled"
  >,
) {
  const isLoggedIn = useIsLoggedInStrava();
  return useQuery(
    getStravaActivityQueryOptions(activityId, {
      enabled: isLoggedIn === true,
      ...options,
    }),
  );
}

export function getStravaActivityQueryOptions<TData = StravaActivity>(
  activityId: number | undefined,
  options?: Omit<
    UseQueryOptions<StravaActivity, unknown, TData, QueryKey>,
    "queryKey" | "queryFn" | "staleTime"
  >,
): UseQueryOptions<StravaActivity, unknown, TData, QueryKey> {
  return {
    queryKey: createQueryKey(activityId),
    queryFn: queryFn,
    staleTime: Infinity,
    ...options,
    enabled: (options?.enabled ?? true) && activityId !== undefined,
  };
}

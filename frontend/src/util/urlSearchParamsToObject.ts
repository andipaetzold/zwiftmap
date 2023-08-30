import fromPairs from "lodash-es/fromPairs";

export function urlSearchParamsToObject(searchParams: URLSearchParams): unknown {
  return fromPairs([...searchParams]);
}

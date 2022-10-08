import fromPairs from "lodash-es/fromPairs";

export function urlSearchParamsToObject(searchParams: URLSearchParams): any {
  return fromPairs([...searchParams]);
}

import fromPairs from "lodash/fromPairs";

export function urlSearchParamsToObject(searchParams: URLSearchParams): any {
  // @ts-ignore
  return fromPairs([...searchParams]);
}

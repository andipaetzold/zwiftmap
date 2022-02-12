import fromPairs from "lodash-es/fromPairs";

export function urlSearchParamsToObject(searchParams: URLSearchParams): any {
  // @ts-ignore
  return fromPairs([...searchParams]);
}

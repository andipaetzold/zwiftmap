import { nodeCache } from "./node-cache.js";

export function createCachedFn<Args extends any[], R>(
  fn: (...args: Args) => Promise<R>,
  getKey: ((...args: Args) => string) | string,
  ttl: number
): (...args: Args) => Promise<{ result: R; ttl: number }> {
  return async (...args: Args): Promise<{ result: R; ttl: number }> => {
    const key = typeof getKey === "string" ? getKey : getKey(...args);

    const cachedResult = nodeCache.get<R>(key);
    if (cachedResult) {
      return {
        result: cachedResult,
        ttl: nodeCache.getTtl(key) ?? 0,
      };
    }

    const result = await fn(...args);
    nodeCache.set(key, result, ttl);
    return {
      result,
      ttl,
    };
  };
}

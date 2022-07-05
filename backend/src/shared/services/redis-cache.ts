import { redisClient } from "../persistence/redis";

export function createRedisCachedFn<Args extends any[], R>(
  fn: (...args: Args) => Promise<R>,
  getKey: ((...args: Args) => string) | string,
  ttl: number
): (...args: Args) => Promise<{ result: R; ttl: number }> {
  return async (...args: Args): Promise<{ result: R; ttl: number }> => {
    const key = typeof getKey === "string" ? getKey : getKey(...args);

    const cachedResult = await redisClient.get<R>(key);
    if (cachedResult) {
      return {
        result: cachedResult,
        ttl: (await redisClient.ttl(key)) ?? 0,
      };
    }

    const result = await fn(...args);
    redisClient.setex(key, result, ttl);
    return {
      result,
      ttl,
    };
  };
}

import { redisClient } from "../persistence/redis";

export function createRedisCachedFn<Args extends any[], R>(
  fn: (...args: Args) => Promise<R>,
  getKey: ((...args: Args) => string) | string,
  ttl: number
): (...args: Args) => Promise<R> {
  return async (...args: Args): Promise<R> => {
    const key = typeof getKey === "string" ? getKey : getKey(...args);

    const cachedResult = await redisClient.get<R>(key);
    if (cachedResult) {
      return cachedResult;
    }

    const result = await fn(...args);
    redisClient.setex(key, result, ttl);
    return result;
  };
}

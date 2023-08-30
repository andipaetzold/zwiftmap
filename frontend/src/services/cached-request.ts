import { request } from "./request";

function getCacheKey(request: Request): string {
  return JSON.stringify({
    method: request.method,
    url: request.url,
  });
}

const store = new Map<string, Promise<unknown>>();
export async function cachedRequest<T = unknown>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<T> {
  const requestObj = new Request(input, init);

  if (requestObj.method.toLowerCase() !== "get") {
    return await request(requestObj);
  }

  const cacheKey = getCacheKey(requestObj);
  if (!store.has(cacheKey)) {
    store.set(cacheKey, request(requestObj));
  }

  try {
    return await store.get(cacheKey) as T;
  } catch (e) {
    store.delete(cacheKey);
    throw e;
  }
}

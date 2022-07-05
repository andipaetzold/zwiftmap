import { request } from "./request";

function getCacheKey(request: Request): string {
  return JSON.stringify({
    method: request.method,
    url: request.url,
  });
}

const store = new Map<string, Promise<any>>();
export async function dedupedRequest<T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const requestObj = new Request(input, init);

  if (requestObj.method.toLowerCase() !== "get") {
    return await request(requestObj);
  }

  const cacheKey = getCacheKey(requestObj);
  if (!store.has(cacheKey)) {
    const requestPromise = request(requestObj);

    requestPromise.then(
      () => store.delete(cacheKey),
      () => store.delete(cacheKey)
    );

    store.set(cacheKey, requestPromise);
  }

  return await store.get(cacheKey);
}

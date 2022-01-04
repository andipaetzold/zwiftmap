import { request, RequestFn } from "./request";

function getCacheKey(request: Request): string {
  return JSON.stringify({
    method: request.method,
    url: request.url,
  });
}

interface Options {
  filter?: (request: Request) => boolean;
}

export function createCachedRequest({
  filter = () => true,
}: Options = {}): RequestFn {
  const store = new Map<string, Promise<any>>();

  return async <T>(input: RequestInfo, init?: RequestInit): Promise<T> => {
    const requestObj = new Request(input, init);
    if (!filter(requestObj)) {
      return await request(requestObj);
    }

    if (requestObj.method.toLowerCase() !== "get") {
      return await request(requestObj);
    }

    const cacheKey = getCacheKey(requestObj);

    if (!store.has(cacheKey)) {
      const data = await request(requestObj);
      store.set(cacheKey, data);
    }

    try {
      return store.get(cacheKey);
    } catch (e) {
      store.delete(cacheKey);
      throw e;
    }
  };
}

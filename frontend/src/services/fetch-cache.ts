import { RequestFn } from "./request";

function getCacheKey(request: Request): string {
  return JSON.stringify({
    method: request.method,
    url: request.url,
  });
}

interface Options {
  filter?: (request: Request) => boolean;
}

export function createFetchCache(
  orgFetch: Window["fetch"],
  { filter = () => true }: Options = {}
): RequestFn {
  const store = new Map<string, Promise<any>>();

  return async <T>(input: RequestInfo, init?: RequestInit): Promise<T> => {
    const request = new Request(input, init);
    if (!filter(request)) {
      const response = await orgFetch(request);
      return response.json();
    }

    if (request.method.toLowerCase() !== "get") {
      const response = await orgFetch(request);
      return response.json();
    }

    const cacheKey = getCacheKey(request);

    if (!store.has(cacheKey)) {
      const response = await orgFetch(request);
      const data = await response.json();
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

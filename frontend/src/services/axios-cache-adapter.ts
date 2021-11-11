import axios, { AxiosAdapter, AxiosPromise, AxiosRequestConfig } from "axios";

function getCacheKey(config: AxiosRequestConfig): string {
  return JSON.stringify({
    method: config.method,
    url: config.url,
    params: config.params,
  });
}

export function createAxiosCacheAdapter(): AxiosAdapter {
  const store = new Map<string, AxiosPromise>();

  return (config: AxiosRequestConfig): AxiosPromise => {
    if (config.method?.toLowerCase() !== "get") {
      return axios.defaults.adapter!(config);
    }

    const cacheKey = getCacheKey(config);

    if (!store.has(cacheKey)) {
      store.set(cacheKey, axios.defaults.adapter!(config));
    }

    return store.get(cacheKey)!;
  };
}

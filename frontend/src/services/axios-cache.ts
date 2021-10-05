import { AxiosRequestConfig, AxiosResponse } from "axios";
import mitt from "mitt";

function getCacheKey(config: AxiosRequestConfig): string {
  return JSON.stringify({
    url: config.url,
    params: config.params,
  });
}

export function axiosCache(): {
  request: (config: AxiosRequestConfig) => Promise<AxiosRequestConfig>;
  response: [(value: AxiosResponse) => AxiosResponse, (error: any) => void];
} {
  const cache = new Cache();

  const requestHandler = async (
    request: AxiosRequestConfig
  ): Promise<AxiosRequestConfig> => {
    const cacheKey = getCacheKey(request);
    if (request.method === "get") {
      if (cache.hasResponse(cacheKey)) {
        request.headers.cached = "true";
        request.data = await cache.getResponse(cacheKey);
        throw request;
      } else {
        cache.prepareResponse(cacheKey);
      }
    }
    return request;
  };

  const responseHandler = (response: AxiosResponse): AxiosResponse => {
    if (response.config.method?.toLocaleLowerCase() === "get") {
      cache.storeResponse(getCacheKey(response.config), response.data);
    }
    return response;
  };
  const responseErrorHandler = (errorOrData: any) => {
    if (errorOrData.headers.cached === "true") {
      return Promise.resolve(errorOrData);
    }
    return Promise.reject(errorOrData);
  };

  return {
    request: requestHandler,
    response: [responseHandler, responseErrorHandler],
  };
}

class Cache {
  private store: Record<string, Promise<any>> = {};

  private emitter = mitt<Record<string, any>>();

  public prepareResponse(url: string) {
    this.store[url] = new Promise((resolve) => {
      const handler = (response: any) => {
        this.emitter.off(url, handler);

        resolve(response);
      };

      this.emitter.on(url, handler);
    });
  }

  public storeResponse(url: string, response: any) {
    this.emitter.emit(url, response);
  }

  public hasResponse(url: string): boolean {
    return this.store[url] !== undefined;
  }

  public getResponse(url: string): Promise<any> {
    if (this.hasResponse(url)) {
      return this.store[url];
    }

    return Promise.reject();
  }
}

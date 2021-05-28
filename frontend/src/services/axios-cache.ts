import { AxiosRequestConfig, AxiosResponse } from "axios";
import mitt from "mitt";

export function axiosCache(ttl: number): {
  request: (config: AxiosRequestConfig) => Promise<AxiosRequestConfig>;
  response: [(value: AxiosResponse) => AxiosResponse, (error: any) => void];
} {
  const cache = new Cache(ttl);

  const requestHandler = async (
    request: AxiosRequestConfig
  ): Promise<AxiosRequestConfig> => {
    if (request.method === "get") {
      if (cache.hasResponse(request.url!)) {
        request.headers.cached = true;
        request.data = await cache.getResponse(request.url!);
        throw request;
      } else {
        cache.prepareResponse(request.url!);
      }
    }
    return request;
  };

  const responseHandler = (response: AxiosResponse): AxiosResponse => {
    if (response.config.method?.toLocaleLowerCase() === "get") {
      cache.storeResponse(response.config.url!, response.data);
    }
    return response;
  };
  const responseErrorHandler = (errorOrData: any) => {
    if (errorOrData.headers.cached === true) {
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
  private store: Record<
    string,
    {
      time: number;
      value: Promise<any>;
    }
  > = {};

  private emitter = mitt();

  constructor(private readonly ttl: number) {}

  public prepareResponse(url: string) {
    this.store[url] = {
      time: new Date().getTime(),
      value: new Promise((resolve) => {
        const handler = (response: any) => {
          // @ts-ignore
          this.emitter.off(url, handler);

          resolve(response);
        };

        // @ts-ignore
        this.emitter.on(url, handler);
      }),
    };
  }

  public storeResponse(url: string, response: any) {
    this.emitter.emit(url, response);
  }

  public hasResponse(url: string): boolean {
    return (
      this.store[url] !== undefined ||
      this.store[url].time < new Date().getTime() - this.ttl
    );
  }

  public getResponse(url: string): Promise<any> {
    if (this.hasResponse(url)) {
      return this.store[url].value;
    }

    return Promise.reject();
  }
}

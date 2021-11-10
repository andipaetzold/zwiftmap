declare module "urlpattern-polyfill" {
  export class URLPattern {
    constructor(init: URLPatternInit);
    constructor(shortPattern: string, baseURL: string = "");

    test(input: URLPattern | string): boolean;
    exec(input: URLPattern | string): URLPatternResult;
  }

  export interface URLPatternInit {
    baseURL?: string;
    username?: string;
    password?: string;
    protocol?: string;
    hostname?: string;
    port?: string;
    pathname?: string;
    search?: string;
    hash?: string;
  }

  export interface URLPatternComponentResult {
    input: string;
    groups: { [key: string]: string };
  }

  export interface URLPatternResult {
    input: URLPatternInit | string;

    protocol: URLPatternComponentResult;
    username: URLPatternComponentResult;
    password: URLPatternComponentResult;
    hostname: URLPatternComponentResult;
    port: URLPatternComponentResult;
    pathname: URLPatternComponentResult;
    search: URLPatternComponentResult;
    hash: URLPatternComponentResult;
  }
}

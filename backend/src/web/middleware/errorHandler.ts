import { default as axios } from "axios";
import { NextFunction, Request, Response } from "express";
import { config } from "../../shared/config.js";
import { ErrorWithStatusCode } from "../../shared/ErrorWithStatusCode.js";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ErrorWithStatusCode) {
    res.statusCode = err.statusCode;

    if (config.environment === "development") {
      req.log.error(err.message);
    }
    // @ts-expect-error Type issue fixed in https://github.com/axios/axios/pull/4884
  } else if (axios.isAxiosError(err)) {
    // @ts-expect-error Type issue fixed in https://github.com/axios/axios/pull/4884
    res.statusCode = err.response?.status ?? 500;

    if (config.environment === "development") {
      // @ts-expect-error Type issue fixed in https://github.com/axios/axios/pull/4884
      req.log.error(err.message);
      // @ts-expect-error Type issue fixed in https://github.com/axios/axios/pull/4884
      req.log.error(err.response.data);
    }
  } else {
    res.statusCode = 500;

    if (config.environment === "development") {
      req.log.error(err);
    }
  }

  // @ts-expect-error TODO: add `sentry` to `Response`
  if (res.sentry) {
    // @ts-expect-error TODO: add `sentry` to `Response`
    res.end(`${res.sentry}\n`);
  } else {
    res.end();
  }
}

import axios from "axios";
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
  } else if (axios.isAxiosError(err)) {
    res.statusCode = err.response?.status ?? 500;

    if (config.environment === "development") {
      req.log.error(err.message);
      if (err.response) {
        req.log.error(err.response.data);
      }
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

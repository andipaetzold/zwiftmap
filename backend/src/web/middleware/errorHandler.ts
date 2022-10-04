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
  if (config.environment === "development") {
    req.log.error(err);
  }

  if (err instanceof ErrorWithStatusCode) {
    res.statusCode = err.statusCode;
  // @ts-expect-error Type issue fixed in https://github.com/axios/axios/pull/4884
  } else if (axios.isAxiosError(err)) {
    // @ts-expect-error Type issue fixed in https://github.com/axios/axios/pull/4884
    res.statusCode = err.response?.status ?? 500;
  } else {
    res.statusCode = 500;
  }

  // @ts-expect-error
  res.end(`${res.sentry}\n`);
}

import axios from "axios";
import { NextFunction, Request, Response } from "express";
import { ENVIRONMENT } from "../../shared/config";
import { ErrorWithStatusCode } from "../../shared/ErrorWithStatusCode";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (ENVIRONMENT === "development") {
    req.logger.error(err);
  }

  if (err instanceof ErrorWithStatusCode) {
    res.statusCode = err.statusCode;
  } else if (axios.isAxiosError(err)) {
    res.statusCode = err.response?.status ?? 500;
  } else {
    res.statusCode = 500;
  }

  // @ts-expect-error
  res.end(`${res.sentry}\n`);
}

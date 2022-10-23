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
    if (config.environment === "development") {
      req.log.error(err.message);
    }
    res.sendStatus(err.statusCode);
    return;
  }

  if (axios.isAxiosError(err)) {
    if (config.environment === "development") {
      req.log.error(err.message);
      if (err.response) {
        req.log.error(err.response.data);
      }
    }

    res.sendStatus(err.response?.status ?? 500);
    return;
  }

  if (config.environment === "development") {
    req.log.error(err);
  }
  res.sendStatus(500);
}

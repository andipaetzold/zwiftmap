import { NextFunction } from "express";
import { IncomingMessage, OutgoingMessage } from "http";

type LogFn = (...data: any) => void;

export interface Logger {
  debug: LogFn;
  info: LogFn;
  log: LogFn;
  error: LogFn;
  trace: LogFn;
  warn: LogFn;
}

declare module "http" {
  interface IncomingMessage {
    logger: Logger;
  }
}

export function logger(
  req: IncomingMessage,
  res: OutgoingMessage,
  next: NextFunction
) {
  const createLogFnWithId =
    (logFn: LogFn): LogFn =>
    (...data) =>
      logFn(`[${req.id}]`, ...data);
  req.logger = {
    debug: createLogFnWithId(console.debug),
    info: createLogFnWithId(console.info),
    log: createLogFnWithId(console.log),
    error: createLogFnWithId(console.error),
    trace: createLogFnWithId(console.trace),
    warn: createLogFnWithId(console.warn),
  };
  next();
}

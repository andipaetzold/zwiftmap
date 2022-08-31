import { LogFn, Logger } from "../../shared/types";

export function createLogger(jobId: number | string): Logger {
  const createLogFnWithId =
    (logFn: LogFn): LogFn =>
    (...data) =>
      logFn(`[${jobId}]`, ...data);

  return {
    debug: createLogFnWithId(console.debug),
    info: createLogFnWithId(console.info),
    log: createLogFnWithId(console.log),
    error: createLogFnWithId(console.error),
    trace: createLogFnWithId(console.trace),
    warn: createLogFnWithId(console.warn),
  };
}

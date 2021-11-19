type LogFn = (...data: any) => void;

export interface Logger {
  debug: LogFn;
  info: LogFn;
  log: LogFn;
  error: LogFn;
  trace: LogFn;
  warn: LogFn;
}

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

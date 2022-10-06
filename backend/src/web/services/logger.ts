import { LoggingWinston } from "@google-cloud/logging-winston";
import { createLogger, transports, format } from "winston";
import { config } from "../../shared/config.js";

const loggingWinston = new LoggingWinston({
  serviceContext: {
    service: "default",
    version: config.sentry.version,
  },
});

export const logger = createLogger({
  level: "info",
  transports:
    config.environment === "production"
      ? [loggingWinston]
      : [
          new transports.Console({
            format: format.combine(
              format.colorize(),
              format.printf(({ level, message }) => `${level}: ${message}`)
            ),
          }),
        ],
});

import { express } from "@google-cloud/logging-winston";
import { Logger } from "../../shared/types.js";
import { logger } from "../services/logger.js";

declare module "http" {
  interface IncomingMessage {
    log: Logger;
  }
}

export const loggerMiddleware = await express.makeMiddleware(logger);

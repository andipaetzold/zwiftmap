import { NextFunction } from "express";
import { IncomingMessage, OutgoingMessage } from "http";
import short from "short-uuid";

declare module "http" {
  interface IncomingMessage {
    id: string;
  }
}

export function requestId(
  req: IncomingMessage,
  res: OutgoingMessage,
  next: NextFunction
) {
  req.id = (req.headers["x-request-id"] as string) ?? short.generate();
  next();
}

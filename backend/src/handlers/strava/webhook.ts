import { Request, Response } from "express";

export function handleWebhook(_req: Request, res: Response) {
  res.sendStatus(204);
}

import { Request, Response } from "express";

export function handlePing(_req: Request, res: Response) {
  return res.sendStatus(204);
}

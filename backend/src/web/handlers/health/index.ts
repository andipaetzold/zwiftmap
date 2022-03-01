import { Request, Response } from "express";

export async function handleHealth(_req: Request, res: Response) {
  res.sendStatus(200);
}

import { Request, Response } from "express";

export async function handleAHWarmup(_req: Request, res: Response) {
  res.sendStatus(200);
}

import { Request, Response } from "express";
import { FRONTEND_URL } from "../../shared/config";

export function handleDefault(_req: Request, res: Response) {
  return res.redirect(FRONTEND_URL);
}

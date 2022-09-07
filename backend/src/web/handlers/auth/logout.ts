import { Request, Response } from "express";
import { config } from "../../../shared/config.js";

export async function handleLogout(req: Request, res: Response) {
  await new Promise<void>((resolve, reject) => {
    req.session.destroy((err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });

  res.clearCookie(config.auth.cookieName);
  res.sendStatus(204);
}

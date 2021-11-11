import { Request, Response } from "express";
import { AUTH_COOKIE_NAME } from "../../../shared/config";

export async function handleLogout(req: Request, res: Response) {
  await new Promise<void>((resolve, reject) => {
    req.session.destroy((err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });

  res.clearCookie(AUTH_COOKIE_NAME);
  res.sendStatus(204);
}

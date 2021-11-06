import { Request, Response } from "express";
import { AUTH_COOKIE_NAME } from "../../shared/config";

export function handleLogout(req: Request, res: Response) {
  req.session.destroy((err) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.clearCookie(AUTH_COOKIE_NAME).sendStatus(204);
    }
  });
}

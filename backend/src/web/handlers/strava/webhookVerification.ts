import { config } from "../../../shared/config.js";
import { Request, Response } from "express";

export function handleWebhookVerification(req: Request, res: Response) {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === config.strava.verifyToken) {
      res.json({ "hub.challenge": challenge });
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(400);
  }
}

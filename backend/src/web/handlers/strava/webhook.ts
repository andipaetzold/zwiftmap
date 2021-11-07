import { Request, Response } from "express";
import { removeStravaToken } from "../../../shared/persistence/stravaToken";
import { uploadStravaMapQueue } from "../../../shared/queue";
import { WebhookEvent } from "../../../shared/types";

export async function handleWebhook(req: Request, res: Response) {
  const event = req.body;
  if (!WebhookEvent.guard(event)) {
    res.sendStatus(400);
    return;
  }

  if (
    event.object_type === "athlete" &&
    event.aspect_type === "update" &&
    event.updates["authorized"] === false
  ) {
    await removeStravaToken(event.object_id);
    res.sendStatus(204);
    return;
  }

  if (event.object_type !== "activity" || event.aspect_type !== "create") {
    res.sendStatus(204);
    return;
  }

  await uploadStravaMapQueue.add({
    activityId: event.object_id,
    athleteId: event.owner_id,
  });
  res.sendStatus(204);
}

import Queue from "bull";
import { REDIS_URL } from "./config";
import { WebhookEventType } from "./types";

export const stravaWebhookEventQueue = new Queue<WebhookEventType>(
  "strava-webhook-event",
  REDIS_URL
);

export const imageQueue = new Queue<{ path: string }>("image", REDIS_URL);

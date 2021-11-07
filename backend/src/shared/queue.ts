import Queue from "bull";
import { REDIS_URL } from "./config";
import { WebhookEventType } from "./types";

export const stravaWebhookEventQueue = new Queue<WebhookEventType>(
  "strava-webhook-event",
  REDIS_URL
);

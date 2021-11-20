import Queue from "bull";
import { REDIS_URL } from "./config";
import { Share } from "@zwiftmap/shared";
import { WebhookEventType } from "./types";

export const stravaWebhookEventQueue = new Queue<WebhookEventType>(
  "strava-webhook-event",
  REDIS_URL
);

export const shareImageQueue = new Queue<Share>("share-image", REDIS_URL);

import Queue from "bull";
import { REDIS_URL } from "./config";
import { WebhookEventType } from "./types";

export const activityCreateQueue = new Queue<WebhookEventType>(
  "activity-create",
  REDIS_URL
);

import * as Sentry from "@sentry/node";
import { SENTRY_WORKER_DSN } from "../shared/config";
import { imageQueue, stravaWebhookEventQueue } from "../shared/queue";
import { createLogger } from "./services/logger";
import { handleImage } from "./image";
import { handleStravaWebhookEvent } from "./stravaWebhookEvent";

Sentry.init({
  enabled: SENTRY_WORKER_DSN.length > 0,
  dsn: SENTRY_WORKER_DSN,
});

stravaWebhookEventQueue.process((job) =>
  handleStravaWebhookEvent(job, createLogger(job.id))
);
imageQueue.process((job) => handleImage(job, createLogger(job.id)));

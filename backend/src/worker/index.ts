import * as Sentry from "@sentry/node";
import { SENTRY_WORKER_DSN } from "../shared/config";
import { shareImageQueue, stravaWebhookEventQueue } from "../shared/queue";
import { createLogger } from "./services/logger";
import { handleShareImage } from "./shareImage";
import { handleStravaWebhookEvent } from "./stravaWebhookEvent";

Sentry.init({
  enabled: SENTRY_WORKER_DSN.length > 0,
  dsn: SENTRY_WORKER_DSN,
});

stravaWebhookEventQueue.process((job) =>
  handleStravaWebhookEvent(job, createLogger(job.id))
);
shareImageQueue.process((job) => handleShareImage(job, createLogger(job.id)));

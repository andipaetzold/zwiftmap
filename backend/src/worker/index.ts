import * as Sentry from "@sentry/node";
import { SENTRY_WORKER_DSN } from "../shared/config";
import { shareImageQueue, stravaWebhookEventQueue } from "../shared/queue";
import { handleShareImage } from "./shareImage";
import { handleStravaWebhookEvent } from "./stravaWebhookEvent";

Sentry.init({
  enabled: SENTRY_WORKER_DSN.length > 0,
  dsn: SENTRY_WORKER_DSN,
});

stravaWebhookEventQueue.process(handleStravaWebhookEvent);
shareImageQueue.process(handleShareImage);

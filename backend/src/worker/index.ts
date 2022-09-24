import * as Sentry from "@sentry/node";
import "@sentry/tracing";
import { SENTRY_WORKER_DSN } from "../shared/config";
import { stravaWebhookEventQueue } from "../shared/queue";
import { handleStravaWebhookEvent } from "./stravaWebhookEvent";
import { wrap } from "./util";

Sentry.init({
  enabled: SENTRY_WORKER_DSN.length > 0,
  dsn: SENTRY_WORKER_DSN,
  environment: "production",
  tracesSampleRate: 0.01,
});

stravaWebhookEventQueue.process(wrap(handleStravaWebhookEvent));

console.log("Worker started");

import * as Sentry from "@sentry/node";
import { SENTRY_WORKER_DSN } from "../shared/config";
import { imageQueue, stravaWebhookEventQueue } from "../shared/queue";
import { handleImage } from "./image";
import { handleStravaWebhookEvent } from "./stravaWebhookEvent";
import { wrap } from "./util";

Sentry.init({
  enabled: SENTRY_WORKER_DSN.length > 0,
  dsn: SENTRY_WORKER_DSN,
  environment: "production",
  tracesSampleRate: 0.25,
});

stravaWebhookEventQueue.process(wrap(handleStravaWebhookEvent));
imageQueue.process(wrap(handleImage));

import * as Sentry from "@sentry/node";
import { Job } from "bull";
import { SENTRY_WORKER_DSN } from "../shared/config";
import { createLogger, Logger } from "./services/logger";

Sentry.init({
  enabled: SENTRY_WORKER_DSN.length > 0,
  dsn: SENTRY_WORKER_DSN,
  environment: "production",
  tracesSampleRate: 0.25,
});

// stravaWebhookEventQueue.process(wrap(handleStravaWebhookEvent));
// imageQueue.process(wrap(handleImage));

function wrap<T>(
  handler: (job: Job<T>, logger: Logger) => Promise<void>
): (job: Job<T>) => Promise<void> {
  return async (job) => {
    const logger = createLogger(job.id);
    const transaction = Sentry.startTransaction({
      op: "job",
      name: job.queue.name,
    });
    transaction.setTag("queue", job.queue.name);

    try {
      logger.info("Processing Job", { queue: job.queue.name, jobId: job.id });

      await handler(job, logger);
      logger.info("Job done");
    } catch (e) {
      const sentryEventId = Sentry.captureException(e, {
        contexts: { job: { id: job.id, queue: job.queue.name } },
      });
      logger.error("Job failed", { sentryEventId });
      throw e;
    } finally {
      transaction.finish();
    }
  };
}

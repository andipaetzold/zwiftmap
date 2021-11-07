import * as Sentry from "@sentry/node";
import { SENTRY_DSN } from "../shared/config";
import { stravaWebhookEventQueue } from "../shared/queue";
import { handleActivityCreate } from "./handler/activity-create";
import { handleAthleteUpdate } from "./handler/athlete-update";

Sentry.init({
  enabled: SENTRY_DSN.length > 0,
  dsn: SENTRY_DSN,
});

stravaWebhookEventQueue.process(async (job, jobDone) => {
  const webhookEvent = job.data;
  console.log(`Processing Strava WebhookEvent`, {
    jobId: job.id,
    webhookEvent,
  });

  switch (webhookEvent.object_type) {
    case "athlete": {
      switch (webhookEvent.aspect_type) {
        case "update":
          await handleAthleteUpdate(webhookEvent);
          break;
      }
      break;
    }
    case "activity": {
      switch (webhookEvent.aspect_type) {
        case "create":
          await handleActivityCreate(webhookEvent);
          break;
      }

      break;
    }
  }

  jobDone();
});

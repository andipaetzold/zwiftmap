import { Job } from "bull";
import { WebhookEventType } from "../../shared/types";
import { Logger } from "../services/logger";
import { handleActivityCreate } from "./handler/activity-create";
import { handleAthleteUpdate } from "./handler/athlete-update";

export async function handleStravaWebhookEvent(
  job: Job<WebhookEventType>,
  logger: Logger
) {
  const webhookEvent = job.data;
  logger.log(`Processing Strava WebhookEvent`, { jobId: job.id });

  switch (webhookEvent.object_type) {
    case "athlete": {
      switch (webhookEvent.aspect_type) {
        case "update":
          await handleAthleteUpdate(webhookEvent, logger);
          break;
      }
      break;
    }
    case "activity": {
      switch (webhookEvent.aspect_type) {
        case "create":
          await handleActivityCreate(webhookEvent, logger);
          break;
      }

      break;
    }
  }
}

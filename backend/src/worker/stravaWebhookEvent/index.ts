import { DoneCallback, Job } from "bull";
import { WebhookEventType } from "../../shared/types";
import { handleActivityCreate } from "./handler/activity-create";
import { handleAthleteUpdate } from "./handler/athlete-update";

export async function handleStravaWebhookEvent(
  job: Job<WebhookEventType>,
  jobDone: DoneCallback
) {
  const webhookEvent = job.data;
  console.log(`Processing Strava WebhookEvent`, { jobId: job.id });

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
}

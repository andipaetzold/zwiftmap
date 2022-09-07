import { CloudTasksClient } from "@google-cloud/tasks";
import { ImageQueueData, Logger, WebhookEventType } from "../types.js";

const client = new CloudTasksClient();

export async function enqueueStravaWebhookEvent(
  data: WebhookEventType,
  logger: Logger
) {
  await enqueue("strava-webhook", "handleStravaWebhook", data, logger);
}

export async function enqueueImageTask(data: ImageQueueData, logger: Logger) {
  await enqueue("image", "createImage", data, logger);
}

async function enqueue(
  queue: string,
  cloudFunction: string,
  data: any,
  logger: Logger
) {
  const convertedPayload = JSON.stringify(data);
  const body = Buffer.from(convertedPayload).toString("base64");
  const url = new URL(cloudFunction, process.env.GCP_FUNCTIONS_URL!).toString();

  const [response] = await client.createTask({
    parent: client.queuePath(
      process.env.GOOGLE_CLOUD_PROJECT!,
      process.env.GCP_TASKS_LOCATION!,
      queue
    ),
    task: {
      httpRequest: {
        httpMethod: "POST",
        url,
        oidcToken: {
          serviceAccountEmail: process.env.GCP_SERVICE_ACCOUNT!,
        },
        headers: {
          "Content-Type": "application/json",
        },
        body,
      },
    },
  });

  logger.info(`Enqueued task ${response.name}`);
}

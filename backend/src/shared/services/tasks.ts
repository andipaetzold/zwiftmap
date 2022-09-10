import { CloudTasksClient } from "@google-cloud/tasks";
import { config } from "../config.js";
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
  const url = new URL(cloudFunction, config.functions.baseUrl).toString();

  const [response] = await client.createTask({
    parent: client.queuePath(config.project, config.tasks.location, queue),
    task: {
      httpRequest: {
        httpMethod: "POST",
        url,
        oidcToken: {
          serviceAccountEmail: config.serviceAccount,
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

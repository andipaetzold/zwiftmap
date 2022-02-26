import Queue from "bull";
import { REDIS_URL } from "./config";
import { WebhookEventType } from "./types";

const DEFAULT_JOB_OPTIONS: Queue.JobOptions = {
  removeOnComplete: true,
  removeOnFail: true,
  attempts: 3,
  backoff: 5_000,
};

export const stravaWebhookEventQueue = new Queue<WebhookEventType>(
  "strava-webhook-event",
  REDIS_URL,
  { defaultJobOptions: DEFAULT_JOB_OPTIONS }
);

export interface ImageQueueJobData {
  path: string;

  resolution: { width: number; height: number };
  cloudinary?: {
    folder: string;
    publicId: string;
  };
  googleCloudStorage?: {
    filename: string;
  };
}

export const imageQueue = new Queue<ImageQueueJobData>("image", REDIS_URL, {
  defaultJobOptions: DEFAULT_JOB_OPTIONS,
});

import "dotenv/config";
import { randomString } from "./util";

export const PORT = Number.parseInt(process.env.PORT!);

export const FRONTEND_URL = process.env.FRONTEND_URL!;
export const BACKEND_URL = process.env.BACKEND_URL!;

export const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID!;
export const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET!;
export const STRAVA_WEBHOOK_HOST =
  process.env.STRAVA_WEBHOOK_HOST ?? BACKEND_URL;
export const STRAVA_VERIFY_TOKEN = randomString();

export const SENTRY_DSN = process.env.SENTRY_DSN ?? "";

export const REDIS_URL = process.env.REDIS_URL!;

export const STRAVA_DEV_ACCOUNTS = (process.env.STRAVA_DEV_ACCOUNTS ?? "")
  .split(",")
  .filter((id: string) => id !== "")
  .map((id) => +id);

export const AUTH_SECRET = process.env.AUTH_SECRET!;

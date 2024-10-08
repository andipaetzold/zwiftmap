import { init } from "@sentry/react";
import { GIT_SHA } from "./config";

export function initSentry() {
  init({
    enabled: ((import.meta.env.VITE_SENTRY_DSN as string) ?? "").length > 0,
    dsn: import.meta.env.VITE_SENTRY_DSN as string,
    environment: "production",
    release: GIT_SHA,
    tracesSampleRate: 0,
  });
}

import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { BACKEND_HOST, GIT_SHA } from "./config";
import "./index.scss";
import {
  PATTERN_CUSTOM_ROUTE,
  PATTERN_EVENT,
  PATTERN_ROUTE_OR_SEGMENT,
  PATTERN_SHARED_ITEM,
  PATTERN_STRAVA_ACTIVITY,
  PATTERN_WORLD,
} from "./services/routing";

export function initSentry() {
  Sentry.init({
    enabled: ((import.meta.env.VITE_SENTRY_DSN as string) ?? "").length > 0,
    dsn: import.meta.env.VITE_SENTRY_DSN as string,
    environment: "production",
    release: GIT_SHA,
    integrations: [
      new Integrations.BrowserTracing({
        tracingOrigins: [BACKEND_HOST],
        beforeNavigate: (context) => {
          const resultEvent = PATTERN_EVENT.exec(context.name);
          if (resultEvent) {
            return {
              ...context,
              name: "/events/:eventId",
            };
          }

          const resultShare = PATTERN_SHARED_ITEM.exec(context.name);
          if (resultShare) {
            return {
              ...context,
              name: "/s/:shareId",
            };
          }

          const resultStravaActivity = PATTERN_STRAVA_ACTIVITY.exec(
            context.name
          );
          if (resultStravaActivity) {
            return {
              ...context,
              name: "/strava-activities/:stravaActivityId",
            };
          }
          const resultCustomRoute = PATTERN_CUSTOM_ROUTE.exec(context.name);
          if (resultCustomRoute) {
            return {
              ...context,
              name: "/:worldSlug/custom-route",
            };
          }

          const resultRoute = PATTERN_ROUTE_OR_SEGMENT.exec(context.name);
          if (resultRoute) {
            return {
              ...context,
              name: "/:worldSlug/:routeSlug",
            };
          }

          const resultWorld = PATTERN_WORLD.exec(context.name);
          if (resultWorld) {
            return {
              ...context,
              name: "/:worldSlug",
            };
          }

          return context;
        },
      }),
    ],
    tracesSampleRate: 0.01,
  });
}

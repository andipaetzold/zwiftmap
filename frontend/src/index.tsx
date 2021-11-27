import { MessageQueue } from "@react-md/alert";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BACKEND_HOST, GIT_SHA } from "./config";
import "./index.scss";
import { fetchAuthStatus } from "./services/auth";
import {
  PATTERN_EVENT,
  PATTERN_ROUTE_OR_SEGMENT,
  PATTERN_SHARED_ITEM,
  PATTERN_STRAVA_ACTIVITY,
  PATTERN_WORLD,
} from "./services/routing";

Sentry.init({
  enabled: (process.env.REACT_APP_SENTRY_DSN ?? "").length > 0,
  dsn: process.env.REACT_APP_SENTRY_DSN,
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

        const resultStravaActivity = PATTERN_STRAVA_ACTIVITY.exec(context.name);
        if (resultStravaActivity) {
          return {
            ...context,
            name: "/strava-activities/:stravaActivityId",
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
  tracesSampleRate: 0.25,
});

fetchAuthStatus();

ReactDOM.render(
  <React.StrictMode>
    <MessageQueue id="message-queue" timeout={3_000}>
      <App />
    </MessageQueue>
  </React.StrictMode>,
  document.getElementById("app")
);

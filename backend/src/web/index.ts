import "source-map-support/register.js";
import * as Sentry from "@sentry/node";
import "@sentry/tracing";
import * as Tracing from "@sentry/tracing";
import nocache from "nocache";
import { config } from "../shared/config.js";
import * as handlers from "./handlers/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { app } from "./server.js";

Sentry.init({
  enabled: config.sentry.dsn.length > 0,
  dsn: config.sentry.dsn,
  release: config.sentry.version,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 0.01,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.get("/_ah/warmup", nocache(), handlers.handleAHWarmup);
app.get("/health", nocache(), handlers.handleHealth);

app.get("/auth/status", nocache(), handlers.handleGETAuthStatus);
app.post("/auth/logout", nocache(), handlers.handleLogout);

app.get("/strava/authorize", nocache(), handlers.handleStravaAuthorize);
app.get("/strava/activities", nocache(), handlers.handleGETActivities);
app.get("/strava/activities/:activityId", handlers.handleGETActivity);
app.put(
  "/strava/activities/:activityId",
  nocache(),
  handlers.handlePUTActivity
);
app.get(
  "/strava/activities/:activityId/streams",
  handlers.handleGETActivityStreams
);
app.get("/strava/callback", nocache(), handlers.handleStravaAuthorizeCallback);
app.get("/strava/segments/:segmentId", nocache(), handlers.handleGETSegment);
app.get("/strava/settings", nocache(), handlers.handleGETStravaSettings);
app.put("/strava/settings", nocache(), handlers.handlePUTStravaSettings);
app.post("/strava/webhook", nocache(), handlers.handleWebhook);
app.get("/strava/webhook", nocache(), handlers.handleWebhookVerification);

app.get("/events", handlers.handleGETEvents);
app.get("/events/:eventId", handlers.handleGETEvent);
app.get("/events/:eventId/workout", handlers.handleGetEventWorkout);

app.post("/share", nocache(), handlers.handleCreateShare);
app.get("/share/:shareId", handlers.handleGetShare);
app.get("/share/:shareId/image", handlers.handleGETShareImage);

app.use(Sentry.Handlers.errorHandler());
app.use(errorHandler);

app.listen(config.port, async () => {
  console.log(`Listening at port ${config.port}`);
});

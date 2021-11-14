import "source-map-support/register";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import { PORT, SENTRY_WEB_DSN } from "../shared/config";
import * as handlers from "./handlers";
import { app } from "./server";
import { setupWebhook } from "./services/webhook";

Sentry.init({
  enabled: SENTRY_WEB_DSN.length > 0,
  dsn: SENTRY_WEB_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.get("/auth/status", handlers.handleGETAuthStatus);
app.post("/auth/logout", handlers.handleLogout);

app.get("/strava/authorize", handlers.handleStravaAuthorize);
app.get("/strava/activities", handlers.handleGETActivities);
app.get("/strava/activities/:activityId", handlers.handleGETActivity);
app.put("/strava/activities/:activityId", handlers.handlePUTActivity);
app.get(
  "/strava/activities/:activityId/streams",
  handlers.handleGETActivityStreams
);
app.get("/strava/callback", handlers.handleStravaAuthorizeCallback);
app.post("/strava/refresh", handlers.handleStravaTokenRefresh);
app.get("/strava/segments/:segmentId", handlers.handleGETSegment);
app.get("/strava/settings", handlers.handleGETStravaSettings);
app.put("/strava/settings", handlers.handlePUTStravaSettings);
app.post("/strava/webhook", handlers.handleWebhook);
app.get("/strava/webhook", handlers.handleWebhookVerification);

app.post("/share", handlers.handleCreateShare);
app.get("/share/:shareId", handlers.handleGetShare);

app.use(Sentry.Handlers.errorHandler());

app.listen(PORT, async () => {
  console.log(`Listening at port ${PORT}`);

  await setupWebhook();
});

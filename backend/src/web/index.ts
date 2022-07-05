import * as Sentry from "@sentry/node";
import "@sentry/tracing";
import * as Tracing from "@sentry/tracing";
import nocache from "nocache";
import runner from "node-pg-migrate";
import "source-map-support/register";
import { PORT, SENTRY_WEB_DSN } from "../shared/config";
import { pool } from "../shared/persistence/pg";
import * as handlers from "./handlers";
import { errorHandler } from "./middleware/errorHandler";
import { app } from "./server";
import { setupWebhook } from "./services/webhook";

Sentry.init({
  enabled: SENTRY_WEB_DSN.length > 0,
  dsn: SENTRY_WEB_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 0.01,
});

async function pgMigrate() {
  const client = await pool.connect();
  await runner({
    dbClient: client,
    migrationsTable: "pgmigrations",
    dir: "migrations",
    direction: "up",
    count: Infinity,
  });
  client.release();
}

function startServer() {
  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());

  app.get("/health", nocache(), handlers.handleHealth);

  app.get("/auth/status", nocache(), handlers.handleGETAuthStatus);
  app.post("/auth/logout", nocache(), handlers.handleLogout);

  app.get("/strava/authorize", nocache(), handlers.handleStravaAuthorize);
  app.get("/strava/activities", nocache(), handlers.handleGETActivities);
  app.get(
    "/strava/activities/:activityId",
    nocache(),
    handlers.handleGETActivity
  );
  app.put(
    "/strava/activities/:activityId",
    nocache(),
    handlers.handlePUTActivity
  );
  app.get(
    "/strava/activities/:activityId/streams",
    nocache(),
    handlers.handleGETActivityStreams
  );
  app.get("/strava/callback", handlers.handleStravaAuthorizeCallback);
  app.get("/events", handlers.handleGETEvents);
  app.get("/events/:eventId", handlers.handleGETEvent);
  app.get("/events/:eventId/workout", handlers.handleGetEventWorkout);
  app.get("/strava/segments/:segmentId", nocache(), handlers.handleGETSegment);
  app.get("/strava/settings", nocache(), handlers.handleGETStravaSettings);
  app.put("/strava/settings", nocache(), handlers.handlePUTStravaSettings);
  app.post("/strava/webhook", nocache(), handlers.handleWebhook);
  app.get("/strava/webhook", nocache(), handlers.handleWebhookVerification);

  app.post("/share", handlers.handleCreateShare);
  app.get("/share/:shareId", handlers.handleGetShare);
  app.get("/share/:shareId/image", handlers.handleGETShareImage);

  app.use(Sentry.Handlers.errorHandler());
  app.use(errorHandler);

  app.listen(PORT, async () => {
    console.log(`Listening at port ${PORT}`);

    await setupWebhook();
  });
}

async function main() {
  await pgMigrate();
  startServer();
}
main();

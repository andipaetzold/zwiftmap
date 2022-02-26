import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
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
  tracesSampleRate: 0.1,
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
  app.get("/events", handlers.handleGETEvents);
  app.get("/events/:eventId", handlers.handleGETEvent);
  app.get("/events/:eventId/workout", handlers.handleGetEventWorkout);
  app.get("/strava/segments/:segmentId", handlers.handleGETSegment);
  app.get("/strava/settings", handlers.handleGETStravaSettings);
  app.put("/strava/settings", handlers.handlePUTStravaSettings);
  app.post("/strava/webhook", handlers.handleWebhook);
  app.get("/strava/webhook", handlers.handleWebhookVerification);

  app.post("/share", handlers.handleCreateShare);
  app.get("/share/:shareId", handlers.handleGetShare);

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

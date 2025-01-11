import "./instrument.js";
import "source-map-support/register.js";
import { setupExpressErrorHandler } from "@sentry/node";
import nocache from "nocache";
import { config } from "../shared/config.js";
import * as handlers from "./handlers/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { app } from "./server.js";
import { logger } from "./services/logger.js";
import "express-async-errors";
import sharp from "sharp";

sharp.cache(false);

app.get("/health", nocache(), handlers.handleHealth);

app.get("/auth/status", nocache(), handlers.handleGETAuthStatus);
app.post("/auth/logout", nocache(), handlers.handleLogout);

app.get("/custom-route/image", handlers.handleGETCustomRouteImage);

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
app.get(
  "/strava/fog/:worldSlug/geojson",
  nocache(),
  handlers.handleGETStravaFogGeoJSON
);
app.get(
  "/strava/fog/:worldSlug/image",
  nocache(),
  handlers.handleGETStravaFogImage
);
app.get(
  "/strava/fog/:worldSlug/stats",
  nocache(),
  handlers.handleGETStravaFogStats
);
app.get("/strava/segments/:segmentId", nocache(), handlers.handleGETSegment);
app.get("/strava/settings", nocache(), handlers.handleGETStravaSettings);
app.put("/strava/settings", nocache(), handlers.handlePUTStravaSettings);
app.post("/strava/webhook", nocache(), handlers.handleWebhook);
app.get("/strava/webhook", nocache(), handlers.handleWebhookVerification);

app.get("/events", handlers.handleGETEvents);
app.get("/events/:eventId", handlers.handleGETEvent);
app.get("/events/:eventId/:subgroupId/workout", handlers.handleGetEventWorkout);
app.get("/events/:eventId/workout", handlers.handleGetEventWorkout);

app.post("/share", nocache(), handlers.handleCreateShare);
app.get("/share/:shareId", handlers.handleGetShare);
app.get("/share/:shareId/image", handlers.handleGETShareImage);

app.get("/places", handlers.handleGETPlaces);
app.get("/worlds/:worldSlug/places", handlers.handleGETPlacesByWorld);
app.post("/worlds/:worldSlug/places/", handlers.handlePOSTPlace);
app.get("/worlds/:worldSlug/places/:placeId", handlers.handleGETPlace);
app.put("/worlds/:worldSlug/places/:placeId", handlers.handlePUTPlace);
app.delete("/worlds/:worldSlug/places/:placeId", handlers.handleDELETEPlace);

app.post("/uploads", handlers.handlePOSTUpload);

setupExpressErrorHandler(app)
app.use(errorHandler);

export const api = app;

if (config.environment === "development") {
  const port = +(process.env.PORT ?? "3001");
  app.listen(port, async () => {
    logger.info(`Listening at port ${port}`);
  });
}

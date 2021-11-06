import "source-map-support/register";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import { PORT, SENTRY_DSN } from "./config";
import * as handlers from "./handlers";
import { app } from "./server";

Sentry.init({
  enabled: SENTRY_DSN.length > 0,
  dsn: SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.get("/strava/authorize", handlers.handleStravaAuthorize);
app.get("/strava/callback", handlers.handleStravaAuthorizeCallback);
app.post("/strava/refresh", handlers.handleStravaTokenRefresh);
app.get("/ping", handlers.handlePing);
app.get("*", handlers.handleDefault);

app.use(Sentry.Handlers.errorHandler());

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});

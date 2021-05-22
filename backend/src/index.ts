import { FRONTEND_URL, PORT, SENTRY_DSN } from "./config";
import { app } from "./server";
import { initStravaHandlers } from "./strava";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";

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

initStravaHandlers(app);
app.get("*", (req, res) => res.redirect(FRONTEND_URL));

app.use(Sentry.Handlers.errorHandler());

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});

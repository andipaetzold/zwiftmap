import { init } from "@sentry/node";
import { config } from "../shared/config.js";

init({
  enabled: config.sentry.dsn.length > 0,
  dsn: config.sentry.dsn,
  release: config.sentry.version,
  tracesSampleRate: 0.01,
  integrations: [],
});

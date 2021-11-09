import { MessageQueue } from "@react-md/alert";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BACKEND_HOST } from "./config";
import "./index.scss";
import { listenForStravaToken } from "./services/listenForStravaToken";
import { ping } from "./services/ping";

Sentry.init({
  enabled: (process.env.REACT_APP_SENTRY_DSN ?? "").length > 0,
  dsn: process.env.REACT_APP_SENTRY_DSN,
  integrations: [
    new Integrations.BrowserTracing({
      tracingOrigins: [BACKEND_HOST],
      beforeNavigate: (context) => {
        const pathParts = context.name.split("/");
        if (pathParts.length >= 2) {
          pathParts[1] = ":worldSlug";
        }
        return {
          ...context,
          name: pathParts.join("/"),
        };
      },
    }),
  ],
  tracesSampleRate: 1.0,
});

listenForStravaToken();
ping();

ReactDOM.render(
  <React.StrictMode>
    <MessageQueue id="message-queue" timeout={3_000}>
      <App />
    </MessageQueue>
  </React.StrictMode>,
  document.getElementById("app")
);

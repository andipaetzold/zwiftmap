import { MessageQueue } from "@react-md/alert";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.scss";
import { listenForStravaToken } from "./services/listenForStravaToken";
import { ping } from "./services/ping";

Sentry.init({
  enabled: (process.env.REACT_APP_SENTRY_DSN ?? "").length > 0,
  dsn: process.env.REACT_APP_SENTRY_DSN,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

listenForStravaToken();
ping();

ReactDOM.render(
  <React.StrictMode>
    <MessageQueue id="message-queue" timeout={5000}>
      <App />
    </MessageQueue>
  </React.StrictMode>,
  document.getElementById("app")
);

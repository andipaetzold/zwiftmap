import { MessageQueue } from "@react-md/alert";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { HelmetProvider } from "react-helmet-async";
import { registerSW } from "virtual:pwa-register";
import App from "./App";
import { Head } from "./components/Head";
import "./index.scss";
import { initSentry } from "./sentry";
import { fetchAuthStatus } from "./services/auth";

initSentry();
fetchAuthStatus();

const helmetContext = {};

ReactDOM.render(
  <StrictMode>
    <HelmetProvider context={helmetContext}>
      <Head />
      <MessageQueue id="message-queue" timeout={3_000}>
        <App />
      </MessageQueue>
    </HelmetProvider>
  </StrictMode>,
  document.getElementById("root")
);

registerSW();

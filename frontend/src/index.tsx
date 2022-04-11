import { MessageQueue } from "@react-md/alert";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { registerSW } from "virtual:pwa-register";
import App from "./App";
import { Head } from "./components/Head";
import "./index.scss";
import { initSentry } from "./sentry";
import { fetchAuthStatus } from "./services/auth";

initSentry();
fetchAuthStatus();

const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(
  <StrictMode>
    <HelmetProvider>
      <Head />
      <MessageQueue id="message-queue" timeout={3_000}>
        <App />
      </MessageQueue>
    </HelmetProvider>
  </StrictMode>
);

registerSW();

import { MessageQueue } from "@react-md/alert";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { registerSW } from "virtual:pwa-register";
import App from "./App";
import { Head } from "./components/Head";
import { ReactQueryProvider } from "./components/ReactQueryProvider";
import "./index.scss";
import { initSentry } from "./sentry";

initSentry();

const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(
  <StrictMode>
    <ReactQueryProvider>
      <HelmetProvider>
        <Head />
        <MessageQueue id="message-queue" timeout={3_000}>
          <App />
        </MessageQueue>
      </HelmetProvider>
    </ReactQueryProvider>
  </StrictMode>,
);

registerSW();

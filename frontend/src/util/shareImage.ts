import * as Sentry from "@sentry/react";
import { request } from "../services/request";

const isNavigatorShareSupported = "share" in navigator;

export async function shareImage(url: string): Promise<void> {
  if (!isNavigatorShareSupported) {
    window.open(url, "__blank");
    return;
  }

  try {
    const response = await request(url);
    const blob = await response.blob();

    const lastModified = response.headers.has("last-modified")
      ? +response.headers.get("last-modified")!
      : new Date().getTime();
    const files = [
      new File([blob], url.split("/").pop()!, {
        type: "image/png",
        lastModified,
      }),
    ];

    await navigator.share({ files });
  } catch (e) {
    if (e instanceof DOMException && e.name === "AbortError") {
      // ignore
    } else if (e instanceof DOMException && e.name === "NotAllowedError") {
      window.open(url, "__blank");
    } else {
      window.open(url, "__blank");
      Sentry.captureException(e);
    }
  }
}
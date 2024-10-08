import { captureException } from "@sentry/react";

const isNavigatorShareSupported = "share" in navigator;

export async function shareImage(url: string, fileName: string): Promise<void> {
  if (!isNavigatorShareSupported) {
    window.open(url, "__blank");
    return;
  }

  try {
    const response = await fetch(url, { credentials: "include" });
    const blob = await response.blob();

    const lastModified = response.headers.has("last-modified")
      ? +response.headers.get("last-modified")!
      : new Date().getTime();
    const files = [
      new File([blob], fileName, {
        type: "image/png",
        lastModified,
      }),
    ];

    if (navigator.canShare({ files })) {
      await navigator.share({ files });
    } else {
      window.open(url, "__blank");
    }
  } catch (e) {
    if (e instanceof DOMException && e.name === "AbortError") {
      // ignore
    } else if (e instanceof DOMException && e.name === "NotAllowedError") {
      window.open(url, "__blank");
    } else {
      window.open(url, "__blank");
      captureException(e);
    }
  }
}

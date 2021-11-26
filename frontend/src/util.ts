import * as Sentry from "@sentry/react";
import fromPairs from "lodash/fromPairs";

const isNavigatorShareSupported = "share" in navigator;

export function flipLatLng(p: [number, number]): [number, number] {
  return [p[1], p[0]];
}

export async function shareImage(url: string): Promise<void> {
  if (!isNavigatorShareSupported) {
    window.open(url, "__blank");
    return;
  }

  try {
    const response = await fetch(url);
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
    if (e instanceof DOMException && e.name === "NotAllowedError") {
      // ignore
    } else if (e instanceof DOMException && e.name === "NotAllowedError") {
      window.open(url, "__blank");
    } else {
      window.open(url, "__blank");
      Sentry.captureException(e);
    }
  }
}

export function urlSearchParamsToObject(searchParams: URLSearchParams): any {
  // @ts-ignore
  return fromPairs([...searchParams]);
}

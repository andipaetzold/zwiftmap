const BASE_URL =
  (document.currentScript as HTMLScriptElement).src.match("^[a-z-]+://.*/") ??
  "";
export const getURL = (path: string) => BASE_URL + path;

export async function replaceImage(element: HTMLImageElement, path: string) {
  const imagesUrl = `https://storage.googleapis.com/images.zwiftmap.com${path}`;

  if (element.getAttribute("src") === imagesUrl) {
    return;
  }

  element.removeAttribute("srcset");
  element.setAttribute("src", imagesUrl);
}

const PATTERN_URL = /https:\/\/zwiftmap\.com\/s\/(\w{22})/;
export function hasSharedLink(description: string): boolean {
  const match = PATTERN_URL.exec(description);
  return match !== null;
}

export function waitForElement(selector: string): Promise<HTMLElement> {
  return new Promise((resolve) => {
    const element = document.querySelector<HTMLElement>(selector);
    if (element) {
      resolve(element);
    }

    const mutationObserver = new MutationObserver(() => {
      const element = document.querySelector<HTMLElement>(selector);
      if (element) {
        mutationObserver.disconnect();
        resolve(element);
      }
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });
  });
}

export function preventParallelCalls(fn: () => Promise<void>) {
  let ongoingRequest: Promise<void> | undefined = undefined;
  return async () => {
    if (ongoingRequest) {
      await ongoingRequest;
      return;
    }

    ongoingRequest = fn();
    await ongoingRequest;
    ongoingRequest = undefined;
  };
}

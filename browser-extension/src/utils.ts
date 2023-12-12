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

export function waitForElement<T extends HTMLElement>(
  selector: string,
  {
    parent = document,
    signal,
  }: { parent?: ParentNode; signal?: AbortSignal } = {}
): Promise<T> {
  return new Promise((resolve) => {
    const element = parent.querySelector<T>(selector);
    if (element) {
      resolve(element);
    }

    const mutationObserver = new MutationObserver(() => {
      if (signal?.aborted) {
        mutationObserver.disconnect();
        return;
      }

      const element = parent.querySelector<T>(selector);
      if (element) {
        mutationObserver.disconnect();
        resolve(element);
      }
    });

    mutationObserver.observe(parent, { childList: true, subtree: true });
    signal?.addEventListener("abort", () => mutationObserver.disconnect());
  });
}

export function subscribeToElement<T extends HTMLElement>(
  selector: string,
  {
    parent = document,
    signal,
    callback,
  }: {
    parent?: ParentNode;
    signal?: AbortSignal;
    callback: (element: T | null) => void;
  }
): void {
  let prev = parent.querySelector<T>(selector);
  if (prev) {
    callback(prev);
  }

  const mutationObserver = new MutationObserver(() => {
    if (signal?.aborted) {
      mutationObserver.disconnect();
      return;
    }

    const element = parent.querySelector<T>(selector);
    if (element === prev) {
      return;
    }

    prev = element;
    callback(element);
  });

  mutationObserver.observe(parent, { childList: true, subtree: true });
  signal?.addEventListener("abort", () => mutationObserver.disconnect());
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

export function createAbortControllerFromSignal(signal: AbortSignal) {
  const controller = new AbortController();
  signal.addEventListener("abort", () => controller.abort());
  return controller;
}

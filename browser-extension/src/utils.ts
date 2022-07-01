const BASE_URL =
  (document.currentScript as HTMLScriptElement).src.match("^[a-z-]+://.*/") ??
  "";
export const getURL = (path: string) => BASE_URL + path;

const PATTERN_URL = /https:\/\/zwiftmap\.com\/s\/(\w{22})/;
export function hasSharedLink(description: string): boolean {
  const match = PATTERN_URL.exec(description);
  return match !== null;
}

export async function replaceImage(element: HTMLImageElement, path: string) {
  const imagesUrl = `https://storage.googleapis.com/images.zwiftmap.com${path}`;

  element.removeAttribute("srcset");
  element.setAttribute("src", imagesUrl);
}
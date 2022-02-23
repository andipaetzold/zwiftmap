const BASE_URL =
  (document.currentScript as HTMLScriptElement).src.match("^[a-z-]+://.*/") ??
  "";
export const getURL = (path: string) => BASE_URL + path;

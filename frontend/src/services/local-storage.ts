import mitt from "mitt";

const emitter = mitt<Record<string, string | null>>();

window.addEventListener("storage", (e) => {
  if (e.key) {
    emitter.emit(e.key, e.newValue);
  }
});

export function setLocalStorageItem(key: string, value: string | null): void {
  if (value === null) {
    localStorage.removeItem(key);
  } else {
    localStorage.setItem(key, value);
  }
  emitter.emit(key, value);
}

export function getLocalStorageItem(key: string): string | null {
  return localStorage.getItem(key);
}

export function addLocalStorageListener(
  key: string,
  callback: (value: string | null) => void,
): () => void {
  const listener = (v: string | null | undefined) =>
    callback(v as string | null);
  emitter.on(key, listener);
  return () => emitter.off(key, listener);
}

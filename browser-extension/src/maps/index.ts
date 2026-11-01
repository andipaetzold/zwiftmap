import { addMapControl } from "./control";
import { findNativeMap } from "./engine";
import { NativeMap } from "./types";

export function initNativeMaps() {
  const maps = new Map<
    HTMLCanvasElement,
    NativeMap & { dispose(restoreMap?: boolean): void }
  >();
  function refresh() {
    for (const [canvas, map] of maps) {
      const current = canvas.isConnected ? findNativeMap(canvas) : undefined;
      if (
        !current ||
        current.engine !== map.engine ||
        current.select !== map.select
      ) {
        map.dispose(false);
        maps.delete(canvas);
      }
    }
    for (const canvas of document.querySelectorAll("canvas")) {
      if (maps.has(canvas)) continue;
      const map = findNativeMap(canvas);
      if (map) maps.set(canvas, { ...map, dispose: addMapControl(map) });
    }
  }
  // The canvas can mount before the WASM engine enters React context; DOM observation alone misses it.
  const timer = setInterval(refresh, 1000);
  refresh();
  return () => {
    clearInterval(timer);
    maps.forEach((map) => map.dispose());
    maps.clear();
  };
}

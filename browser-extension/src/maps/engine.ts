import { CameraTarget, NativeMap, TerrainEngine } from "./types";

interface Fiber {
  return?: Fiber;
  memoizedProps?: {
    value?: {
      terrainEngine?: TerrainEngine;
      mapContainerRef?: { current?: HTMLElement };
      versionInfo?: { versionString?: string };
    };
  };
}

export function restoreCamera(engine: TerrainEngine, target: CameraTarget) {
  engine
    .getCamera()
    .flyToTarget(
      target,
      0.005,
      false,
      { top: 0, right: 0, bottom: 0, left: 0 },
      { onActionComplete() {} },
    );
}

export function findNativeMap(
  canvas: HTMLCanvasElement,
): NativeMap | undefined {
  const key = Object.keys(canvas).find((key) =>
    key.startsWith("__reactFiber$"),
  );
  let fiber = key
    ? (canvas as unknown as Record<string, Fiber>)[key]
    : undefined;
  for (; fiber; fiber = fiber.return) {
    const value = fiber.memoizedProps?.value;
    const engine = value?.terrainEngine;
    const select =
      value?.mapContainerRef?.current?.querySelector<HTMLSelectElement>(
        '[data-testid="mre-map-style-select"]',
      );
    if (
      select &&
      typeof engine?.switchToCustomStyle === "function" &&
      typeof engine.getTileSources === "function" &&
      typeof engine.getDebugApi === "function"
    ) {
      return {
        canvas,
        engine,
        select,
        version: value?.versionInfo?.versionString,
      };
    }
  }
}

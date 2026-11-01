export interface CameraTarget {
  lookAtPoint: { latitude: number; longitude: number; elevation?: number };
  distance: number;
  pitch: number;
  bearing: number;
}

export interface TerrainEngine {
  getCamera(): {
    getTarget(): CameraTarget;
    flyToTarget(
      target: CameraTarget,
      speed: number,
      adjust: boolean,
      margins: { top: number; right: number; bottom: number; left: number },
      listener: { onActionComplete(): void },
    ): void;
  };
  getTileSources(): {
    getTileSources(): { name: string; templateUrl: string }[];
    setTileSourceTemplateUrl(name: string, url: string): void;
  };
  switchToCustomStyle(
    style: string,
    name: string,
    listener: {
      onLoad(): void;
      onError(error: unknown): void;
    },
  ): void;
  setMapType(type: number): void;
  getDebugApi(): { clearCache(): void };
}

export interface NativeMap {
  canvas: HTMLCanvasElement;
  engine: TerrainEngine;
  select: HTMLSelectElement;
  version?: string;
}

export interface MapStyle {
  metadata: { strava: { mre: { styling: Record<string, unknown> } } };
  sources: Record<string, { type: string; url?: string }>;
  layers: {
    id: string;
    type: string;
    source?: string;
    [key: string]: unknown;
  }[];
}

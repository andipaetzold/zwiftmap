import { MapStyle, TerrainEngine } from "./types";

const styles = [
  "StravaPlanetTopoLight",
  "StravaPlanetTopoDark",
  "StravaPlanetTopoWinter",
  "StravaPlanetHybrid",
  "StravaPlanetSatellite",
];
const archives = new Map<
  string,
  Promise<{ module: string; data: ArrayBuffer }>
>();

async function fetchAsset(url: string) {
  const response = await fetch(url, { signal: AbortSignal.timeout(15000) });
  if (!response.ok)
    throw new Error(`Unable to load Strava map assets (${response.status}).`);
  return response;
}

export function extractStyle(
  module: string,
  data: ArrayBuffer,
  folder: string,
): MapStyle {
  // Emscripten embeds the archive index in its loader. Read its byte offsets, never execute it.
  const pattern = new RegExp(
    `filename:["']/assets/Shared/Configs/${folder}/style\\.json["'],start:(\\d+),end:(\\d+)`,
  );
  const match = module.match(pattern);
  if (!match) throw new Error("Strava's map asset format is unsupported.");
  const start = Number(match[1]),
    end = Number(match[2]);
  if (end > data.byteLength || start >= end)
    throw new Error("Invalid map style offsets.");
  return JSON.parse(new TextDecoder().decode(data.slice(start, end)));
}

export async function loadZwiftStyle(
  mapType: number,
  version?: string,
): Promise<MapStyle> {
  const asset =
    version && /^\d+\.\d+\.\d+$/.test(version)
      ? `https://wre-assets.prod.mapping.strava.com/releases/${version}/assets/emscripten/SDLWasmLib.data`
      : performance
          .getEntriesByType("resource")
          .map((entry) => entry.name)
          .find((url) =>
            /^https:\/\/wre-assets\.prod\.mapping\.strava\.com\/releases\/[^/]+\/assets\/emscripten\/SDLWasmLib\.(data|wasm)$/.test(
              url,
            ),
          );
  if (!asset) throw new Error("Strava's map assets have not loaded yet.");
  const directory = asset.slice(0, asset.lastIndexOf("/") + 1);
  let archive = archives.get(directory);
  if (!archive) {
    archive = Promise.all([
      fetchAsset(`${directory}SDLWasmLib.mjs`).then((response) =>
        response.text(),
      ),
      fetchAsset(`${directory}SDLWasmLib.data`).then((response) =>
        response.arrayBuffer(),
      ),
    ]).then(([module, data]) => ({ module, data }));
    archives.set(directory, archive);
    archive.catch(() => archives.delete(directory));
  }
  const { module, data } = await archive;
  return createZwiftStyle(
    extractStyle(module, data, styles[mapType % 5] ?? styles[0]),
  );
}

export function createZwiftStyle(style: MapStyle): MapStyle {
  const result = structuredClone(style);
  Object.assign(result.metadata.strava.mre.styling, {
    "use-vector-textures": false,
    "gradient-hillshading": false,
  });
  result.sources["summer-imagery"] = {
    type: "raster",
    url: "asset:///Shared/TileJson/summer-imagery.json",
  };
  // Keep Strava's activity, segment, gradient, highlight and marker layers intact.
  const basemapSources = new Set([
    "strava-planet",
    "strava-contours-v1",
    "strava-poi",
  ]);
  result.layers = result.layers.filter(
    (layer) =>
      !basemapSources.has(layer.source ?? "") &&
      layer.id !== "satellite-placeholder",
  );
  const index = result.layers.findIndex((layer) => layer.type !== "background");
  result.layers.splice(index < 0 ? result.layers.length : index, 0, {
    id: "satellite-placeholder",
    type: "raster",
    source: "summer-imagery",
    layout: { visibility: "visible" },
    paint: { "raster-opacity": 1 },
  });
  return result;
}

export function applyStyle(
  engine: TerrainEngine,
  style: MapStyle,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(
      () => reject(new Error("Strava map style loading timed out.")),
      15000,
    );
    const listener = {
      onLoad() {
        clearTimeout(timeout);
        resolve();
      },
      onError(error: unknown) {
        clearTimeout(timeout);
        reject(new Error(String(error)));
      },
    };
    try {
      engine.switchToCustomStyle(JSON.stringify(style), "ZwiftMap", listener);
    } catch (error) {
      listener.onError(error);
    }
  });
}

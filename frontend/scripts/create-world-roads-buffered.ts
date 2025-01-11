import buffer from "@turf/buffer";
import { Feature, lineString, MultiPolygon, Polygon } from "@turf/helpers";
import union from "@turf/union";
import { round } from "lodash-es";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { worlds } from "zwift-data";
import { latLngToPosition, positionToLatLng } from "../src/shared/coordinates";
import { WORLD_ROADS } from "../src/shared/roads";
import { dropAltitude } from "../src/util/drop-altitude";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const BASE_DIR = path.resolve(__dirname, "../public/worlds");

const BUFFER_RADIUS = 0.045; // 45 m

for (const world of worlds) {
  const roads = await WORLD_ROADS[world.slug]();

  const linePolygons = roads.edges
    .filter((edge) => edge.fog)
    .map((edge) => [
      edge.from.position,
      ...edge.stream.map(dropAltitude).map(latLngToPosition),
      edge.to.position,
    ])
    .map((line) => lineString(line))
    .map((line) => buffer(line, BUFFER_RADIUS, { units: "kilometers" }));

  const linePolygon = linePolygons.reduce(
    (prev, cur) => union(prev, cur)!,
    linePolygons[0] as Feature<Polygon | MultiPolygon>
  ) as Feature<Polygon>;

  const data = linePolygon.geometry.coordinates.map((polygon) =>
    polygon
      .map(positionToLatLng)
      .map(([lat, lng]) => [round(lat, 6), round(lng, 6)])
  );

  const dir = `${BASE_DIR}/${world.slug}`;
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  writeFileSync(`${dir}/roads-buffered.json`, JSON.stringify(data));
}

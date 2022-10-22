import { Feature, GeoJsonProperties, MultiPolygon, Polygon } from "geojson";
import sharp from "sharp";
import { World } from "zwift-data";
import { positionToLatLng } from "../browser/coordinates.js";
import { project } from "../projection.js";
import { LatLng } from "../types.js";
import { diff } from "../util.js";
import { getWorldImageTag } from "./world.js";

export async function createFogImage(
  world: World,
  fog: Feature<Polygon | MultiPolygon, GeoJsonProperties>,
  size: number
) {
  const projectedWorldBounds = world.bounds.map((b) => project(b));
  const x = Math.min(...projectedWorldBounds.map(([x]) => x));
  const y = Math.min(...projectedWorldBounds.map(([, y]) => y));
  const topLeft: LatLng = [x, y];
  const viewBoxWidth = diff(
    projectedWorldBounds[0][0],
    projectedWorldBounds[1][0]
  );
  const viewBoxHeight = diff(
    projectedWorldBounds[0][1],
    projectedWorldBounds[1][1]
  );
  const viewBox = [...topLeft, viewBoxWidth, viewBoxHeight].join(" ");

  // Size
  const aspectRatio = viewBoxWidth / viewBoxHeight;
  const height = aspectRatio > 1 ? size : aspectRatio * size;
  const width = aspectRatio > 1 ? aspectRatio * size : size;

  // latitude: y
  // longitude: x
  const content = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<svg viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${height}" preserveAspectRatio="xMidYMid meet">`,
    await getWorldImageTag(world),
    ...(await getPolygonTags(fog, world)),
    "</svg>",
  ].join("\n");

  return sharp(Buffer.from(content)).png();
}

async function getPolygonTags(
  fog: Feature<Polygon | MultiPolygon, GeoJsonProperties>,
  world: World
): Promise<string[]> {
  const multiPolygons = (
    fog.geometry.type === "MultiPolygon"
      ? fog.geometry.coordinates
      : [fog.geometry.coordinates]
  ).map((x) =>
    x.map((stream) => stream.map((pos) => positionToLatLng(pos)).map(project))
  );

  return multiPolygons.map(
    (polygons) =>
      `<path d="${polygons
        .map((polygon) =>
          polygon.map((pos, i) => (i === 0 ? `M ${pos} L` : `${pos}`)).join(" ")
        )
        .join(" Z ")} Z" fill-rule="evenodd" fill="black" fill-opacity="0.75" />`
  );
}

import sharp from "sharp";
import { project } from "../projection.js";
import { LatLng } from "../types.js";
import { diff, getWorld } from "../util.js";
import { getWorldImageTag, WORLD_BACKGROUNDS } from "./world.js";

// in meters
const STROKE_WIDTH = 20;
const MARKER_RADIUS = 30;
const MARKER_STROKE = 10;
const PADDING = 50;

export async function createLatLngStreamImage(
  stream: LatLng[],
  { width, height }: { width: number; height: number }
): Promise<NodeJS.ReadableStream> {
  const world = getWorld(stream[0])!;

  const xAndYBounds = bbox(stream.map((b) => project(b)));
  const topLeft: LatLng = [
    Math.min(...xAndYBounds.map(([x]) => x)),
    Math.min(...xAndYBounds.map(([, y]) => y)),
  ];
  const viewBoxWidth = diff(xAndYBounds[0][0], xAndYBounds[1][0]);
  const viewBoxHeight = diff(xAndYBounds[0][1], xAndYBounds[1][1]);
  const viewBox = [...topLeft, viewBoxWidth, viewBoxHeight].join(" ");

  // latitude: y
  // longitude: x
  let content = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<svg viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${height}" preserveAspectRatio="xMidYMid meet">`,
    await getWorldImageTag(world),
    `<polyline points="${stream
      .map((latlng) => project(latlng))
      .join(
        " "
      )}" fill="none" stroke="#f26722" stroke-width="${STROKE_WIDTH}" />`,
    `<circle cx="${project(stream[0])[0]}" cy="${
      project(stream[0])[1]
    }" r="${MARKER_RADIUS}" fill="green" stroke="white" stroke-width="${MARKER_STROKE}" />`,
    `<circle cx="${project(stream.at(-1)!)[0]}" cy="${
      project(stream.at(-1)!)[1]
    }" r="${MARKER_RADIUS}" fill="red" stroke="white" stroke-width="${MARKER_STROKE}" />`,
    "</svg>",
  ].join("\n");

  return sharp(Buffer.from(content))
    .flatten({ background: WORLD_BACKGROUNDS[world.slug] })
    .png();
}

function bbox(stream: LatLng[]): [LatLng, LatLng] {
  const result: [LatLng, LatLng] = [
    [Infinity, Infinity],
    [-Infinity, -Infinity],
  ];

  for (const latlng of stream) {
    if (result[0][0] > latlng[0]) {
      result[0][0] = latlng[0];
    }
    if (result[0][1] > latlng[1]) {
      result[0][1] = latlng[1];
    }
    if (result[1][0] < latlng[0]) {
      result[1][0] = latlng[0];
    }
    if (result[1][1] < latlng[1]) {
      result[1][1] = latlng[1];
    }
  }

  return [
    [result[0][0] - PADDING, result[0][1] - PADDING],
    [result[1][0] + PADDING, result[1][1] + PADDING],
  ];
}

import { promises as fs } from "fs";
import sharp from "sharp";
import { LatLng } from "strava";
import { World, worlds, WorldSlug } from "zwift-data";
import { Share } from "./persistence/types";
import { project } from "./projection";
import { diff, getWorld } from "./util";

sharp.cache(false);

// in meters
const STROKE_WIDTH = 20;
const MARKER_RADIUS = 30;
const MARKER_STROKE = 10;
const PADDING = 50;

const BACKGROUNDS: { [slug in WorldSlug]: string } = {
  bologna: "#b9b9b8",
  "crit-city": "#7c9938",
  france: "#6f992d",
  innsbruck: "#7c9938",
  london: "#6f992d",
  "makuri-islands": "#7d9a35",
  "new-york": "#bbbbb7",
  paris: "#b9b9b9",
  richmond: "#7c9938",
  watopia: "#0884e2",
  yorkshire: "#7c9938",
};

export async function createImage(
  share: Share,
  { width, height }: { width: number; height: number }
): Promise<NodeJS.ReadableStream> {
  const world = getWorld(share.activity)!;

  const xAndYBounds = bbox(share.streams.latlng.data.map((b) => project(b)));
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
    `<polyline points="${share.streams.latlng.data
      .map((latlng) => project(latlng))
      .join(
        " "
      )}" fill="none" stroke="#f26722" stroke-width="${STROKE_WIDTH}" />`,
    `<circle cx="${project(share.streams.latlng.data[0])[0]}" cy="${
      project(share.streams.latlng.data[0])[1]
    }" r="${MARKER_RADIUS}" fill="green" stroke="white" stroke-width="${MARKER_STROKE}" />`,
    `<circle cx="${project(share.streams.latlng.data.at(-1)!)[0]}" cy="${
      project(share.streams.latlng.data.at(-1)!)[1]
    }" r="${MARKER_RADIUS}" fill="red" stroke="white" stroke-width="${MARKER_STROKE}" />`,
    "</svg>",
  ].join("\n");

  return sharp(Buffer.from(content))
    .flatten({
      background: BACKGROUNDS[world.slug],
    })
    .png();
}

function bufferToDataUrl(buffer: Buffer, mime = "image/png"): string {
  const encoding = "base64";
  const data = buffer.toString(encoding);
  return `data:${mime};${encoding},${data}`;
}

const worldImages = Object.fromEntries(
  worlds.map((world) => [world.slug, fs.readFile(`assets/${world.slug}.png`)])
) as { [world in WorldSlug]: Promise<Buffer> };

async function getWorldImageTag(world: World) {
  const xAndYBounds = world.bounds.map((b) => project(b));

  const x = Math.min(...xAndYBounds.map(([x]) => x));
  const y = Math.min(...xAndYBounds.map(([, y]) => y));

  const width = diff(xAndYBounds[0][0], xAndYBounds[1][0]);
  const height = diff(xAndYBounds[0][1], xAndYBounds[1][1]);

  const buffer = await worldImages[world.slug];
  return `<image x="${x}" y="${y}" width="${width}" height="${height}" preserveAspectRatio="none" xlink:href="${bufferToDataUrl(
    buffer
  )}" />`;
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

import { Request, Response } from "express";
import { promises as fs } from "fs";
import { Record } from "runtypes";
import sharp from "sharp";
import { LatLng } from "strava";
import { World, worlds, WorldSlug } from "zwift-data";
import { readShare } from "../../../shared/persistence/share";
import { getWorld } from "../../../shared/util";
import { NumberString } from "../../services/runtypes";

const STROKE_WIDTH = 0.000002;
const MARKER_RADIUS = 0.000003;
const MARKER_STROKE = 0.000001;
const PADDING = 0.0005;

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

const Query = Record({
  width: NumberString,
  height: NumberString,
});

export async function handleGETShareImage(req: Request, res: Response) {
  if (!Query.guard(req.query)) {
    res.sendStatus(400);
    return;
  }

  const shareId = req.params.shareId;
  const share = await readShare(shareId);

  if (!share) {
    res.sendStatus(404);
    return;
  }

  if (share.type !== "strava-activity") {
    res.sendStatus(404);
    return;
  }

  const world = getWorld(share.activity);

  if (!world) {
    res.sendStatus(404);
    return;
  }

  const height = req.query.height;
  const width = req.query.width;

  const xAndYBounds = bbox(share.streams.latlng.data).map((b) => toXAndY(b));
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
      .map((latlng) => toXAndY(latlng))
      .join(" ")}" fill="none" stroke="#f26722" stroke-width="${multiply(
      STROKE_WIDTH
    )}" />`,
    `<circle cx="${toXAndY(share.streams.latlng.data[0])[0]}" cy="${
      toXAndY(share.streams.latlng.data[0])[1]
    }" r="${multiply(
      MARKER_RADIUS
    )}" fill="green" stroke="white" stroke-width="${multiply(
      MARKER_STROKE
    )}" />`,
    `<circle cx="${toXAndY(share.streams.latlng.data.at(-1)!)[0]}" cy="${
      toXAndY(share.streams.latlng.data.at(-1)!)[1]
    }" r="${multiply(
      MARKER_RADIUS
    )}" fill="red" stroke="white" stroke-width="${multiply(MARKER_STROKE)}" />`,
    "</svg>",
  ].join("\n");

  sharp(Buffer.from(content))
    .flatten({
      background: BACKGROUNDS[world.slug],
    })
    .png()
    .pipe(res)
    .header("Content-Type", "image/png");
}

function bufferToDataUrl(buffer: Buffer, mime = "image/png"): string {
  const encoding = "base64";
  const data = buffer.toString(encoding);
  return `data:${mime};${encoding},${data}`;
}

function toXAndY([lat, lng]: LatLng): [x: number, y: number] {
  return [
    multiply(degreesToRadians(lng)),
    multiply(-Math.asinh(Math.tan(degreesToRadians(lat)))),
  ];
}

function degreesToRadians(degrees: number) {
  return degrees * (Math.PI / 180);
}

function diff(a: number, b: number) {
  return Math.abs(a - b);
}

const worldImages = Object.fromEntries(
  worlds.map((world) => [world.slug, fs.readFile(`assets/${world.slug}.png`)])
) as { [world in WorldSlug]: Promise<Buffer> };

async function getWorldImageTag(world: World) {
  const xAndYBounds = world.bounds.map((b) => toXAndY(b));

  const x = Math.min(...xAndYBounds.map(([x]) => x));
  const y = Math.min(...xAndYBounds.map(([, y]) => y));

  const width = diff(xAndYBounds[0][0], xAndYBounds[1][0]);
  const height = diff(xAndYBounds[0][1], xAndYBounds[1][1]);

  const buffer = await worldImages[world.slug];
  return `<image x="${x}" y="${y}" width="${width}" height="${height}" xlink:href="${bufferToDataUrl(
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

/**
 * `sharp` doesn't like too small numbers and renders an empty image.
 * So, this just multiplies all dimensions.
 */
function multiply(n: number): number {
  return Math.round(n * Math.pow(10, 6));
}

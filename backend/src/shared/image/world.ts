import { promises as fs } from "fs";
import { World, WorldSlug } from "zwift-data";
import { project } from "../projection.js";
import { bufferToDataUrl, diff } from "../util.js";

export const WORLD_BACKGROUNDS: { [slug in WorldSlug]: string } = {
  bologna: "#b9b9b8",
  "crit-city": "#7c9938",
  france: "#6f992d",
  innsbruck: "#7c9938",
  london: "#6f992d",
  "makuri-islands": "#7d9a35",
  "new-york": "#bbbbb7",
  paris: "#b9b9b9",
  richmond: "#7c9938",
  scotland: "#aba73a",
  watopia: "#0884e2",
  yorkshire: "#7c9938",
};

async function getWorldImage(world: World) {
  return await fs.readFile(`assets/${world.slug}.png`);
}

export async function getWorldImageTag(world: World) {
  const xAndYBounds = world.bounds.map((b) => project(b));

  const x = Math.min(...xAndYBounds.map(([x]) => x));
  const y = Math.min(...xAndYBounds.map(([, y]) => y));

  const width = diff(xAndYBounds[0][0], xAndYBounds[1][0]);
  const height = diff(xAndYBounds[0][1], xAndYBounds[1][1]);

  const buffer = await getWorldImage(world);
  return `<image x="${x}" y="${y}" width="${width}" height="${height}" preserveAspectRatio="none" xlink:href="${bufferToDataUrl(
    buffer
  )}" />`;
}

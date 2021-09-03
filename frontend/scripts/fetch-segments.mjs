import { existsSync, mkdirSync, writeFileSync } from "fs";
import fetch from "node-fetch";
import path, { dirname } from "path";
import { routes, segments } from "zwift-data";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const BASE_DIR = path.resolve(__dirname, "../public");

async function main() {
  await Promise.all([
    ...routes
      .filter((route) => route.stravaSegmentId !== undefined)
      .map((route) => fetchSegment(route, "routes")),
    ...segments
      .filter((segment) => segment.stravaSegmentId !== undefined)
      .map((segment) => fetchSegment(segment, "segments")),
  ]);
}

if (!existsSync(BASE_DIR)) {
  mkdirSync(BASE_DIR);
}

main();

async function fetchSegment({ name, slug, stravaSegmentId }, type) {
  const response = await fetch(
    `https://www.strava.com/stream/segments/${stravaSegmentId}?streams%5B%5D=latlng&streams%5B%5D=distance&streams%5B%5D=altitude`
  );

  if (response.status !== 200) {
    console.error(`Could not fetch segment '${name}'`);
    process.exit(1);
  }

  const stravaData = await response.json();

  const segmentDir = `${BASE_DIR}/${type}/${slug}`;
  if (!existsSync(segmentDir)) {
    mkdirSync(segmentDir, { recursive: true });
  }

  writeFileSync(
    `${segmentDir}/altitude.json`,
    JSON.stringify(stravaData.altitude)
  );
  writeFileSync(
    `${segmentDir}/distance.json`,
    JSON.stringify(stravaData.distance)
  );
  writeFileSync(`${segmentDir}/latlng.json`, JSON.stringify(stravaData.latlng));

  console.log(name);
}

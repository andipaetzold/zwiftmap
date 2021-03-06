import { existsSync, mkdirSync, writeFileSync } from "fs";
import fetch from "node-fetch";
import path, { dirname } from "path";
import { routes, segments } from "zwift-data";
import { fileURLToPath } from "url";
import _ from "lodash-es";
import progress from "cli-progress";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const BASE_DIR = path.resolve(__dirname, "../public");

if (!existsSync(BASE_DIR)) {
  mkdirSync(BASE_DIR);
}

const bar = new progress.Bar();
const segmentsToFetch = [...routes, ...segments].filter(
  (route) => route.stravaSegmentId !== undefined
);
bar.start(segmentsToFetch.length, 0);

await Promise.all([
  ...[...routes, ...segments]
    .filter((route) => route.stravaSegmentId !== undefined)
    .map((segment) => fetchSegment(segment, bar)),
]);

bar.stop();

async function fetchSegment({ name, stravaSegmentId }, bar) {
  const segmentDir = `${BASE_DIR}/strava-segments/${stravaSegmentId}`;

  if (existsSync(segmentDir)) {
    bar.increment();
    return;
  }

  const response = await fetch(
    `https://www.strava.com/stream/segments/${stravaSegmentId}?streams%5B%5D=latlng&streams%5B%5D=distance&streams%5B%5D=altitude`
  );

  if (response.status !== 200) {
    console.error(`Could not fetch segment '${name}'`);
    process.exit(1);
  }

  const stravaData = await response.json();

  if (!existsSync(segmentDir)) {
    mkdirSync(segmentDir, { recursive: true });
  }

  const zipped = _.zip(
    getRoundedLatLng(stravaData),
    getRoundedAltitude(stravaData),
    getRoundedDistances(stravaData)
  );
  const [latlng, altitude, distance] = _.unzip(
    zipped.filter(([[lat, lng]], index) => {
      return (
        zipped[index - 1]?.[0][0] !== lat || zipped[index - 1]?.[0][1] !== lng
      );
    })
  );

  writeFileSync(`${segmentDir}/altitude.json`, JSON.stringify(altitude));
  writeFileSync(`${segmentDir}/distance.json`, JSON.stringify(distance));
  writeFileSync(`${segmentDir}/latlng.json`, JSON.stringify(latlng));

  bar.increment();
}

function getRoundedLatLng(stravaData) {
  return stravaData.latlng.map(([lat, lng]) => [
    _.round(lat, 6),
    _.round(lng, 6),
  ]);
}

function getRoundedAltitude(stravaData) {
  return stravaData.altitude.map((d) => _.round(d, 1));
}

function getRoundedDistances(stravaData) {
  return stravaData.distance.map((d) => _.round(d, 2));
}

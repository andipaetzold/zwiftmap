import { existsSync, mkdirSync, writeFileSync } from "fs";
import path, { dirname } from "path";
import { Route, routes, Segment, segments } from "zwift-data";
import { fileURLToPath } from "url";
import { zip, unzip, round } from "lodash-es";
import progress from "cli-progress";
import { LatLng } from "strava";

interface StravaData {
  altitude: number[];
  distance: number[];
  latlng: LatLng[];
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const BASE_DIR = path.resolve(__dirname, "../public");

if (!existsSync(BASE_DIR)) {
  mkdirSync(BASE_DIR);
}

const bar = new progress.Bar({});
const segmentsToFetch = [...routes, ...segments].filter(
  (route) => route.stravaSegmentId !== undefined
);
bar.start(segmentsToFetch.length, 0);

await Promise.all([
  ...[...routes, ...segments]
    .filter((route) => route.stravaSegmentId !== undefined)
    .map((segment) =>
      fetchSegment(
        segment as (Segment | Route) & { stravaSegmentId: number },
        bar
      )
    ),
]);

bar.stop();

async function fetchSegment(
  { name, stravaSegmentId }: (Segment | Route) & { stravaSegmentId: number },
  bar: progress.Bar
) {
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

  const stravaData = (await response.json()) as StravaData;

  if (!existsSync(segmentDir)) {
    mkdirSync(segmentDir, { recursive: true });
  }

  const zipped = zip(
    getRoundedLatLng(stravaData),
    getRoundedAltitude(stravaData),
    getRoundedDistances(stravaData)
  ) as [LatLng, number, number][];
  const dedupedZip = zipped.filter(([[lat, lng]], index) => {
    return (
      zipped[index - 1]?.[0][0] !== lat || zipped[index - 1]?.[0][1] !== lng
    );
  });
  const [latlng, altitude, distance] = unzip(dedupedZip) as [
    LatLng[],
    number[],
    number[],
  ];

  writeFileSync(
    `${segmentDir}/altitude.json`,
    JSON.stringify(fixMakuriIslandsAltitude(stravaSegmentId, altitude))
  );
  writeFileSync(`${segmentDir}/distance.json`, JSON.stringify(distance));
  writeFileSync(`${segmentDir}/latlng.json`, JSON.stringify(latlng));

  bar.increment();
}

function getRoundedLatLng(stravaData: StravaData) {
  return stravaData.latlng.map(([lat, lng]) => [round(lat, 6), round(lng, 6)]);
}

function getRoundedAltitude(stravaData: StravaData) {
  return stravaData.altitude.map((d) => round(d, 1));
}

function getRoundedDistances(stravaData: StravaData) {
  return stravaData.distance.map((d) => round(d, 2));
}

/**
 * With the Urukazi update, Zwift lowered the altitude of all existing roads by 60m
 */
function fixMakuriIslandsAltitude(
  segmentId: number,
  altitudeStream: number[]
): number[] {
  const segments = [
    30407802, 28431416, 30987848, 30480835, 30407658, 29009500, 30629791,
    28432243, 29559312, 28433439, 30988311, 30408107, 29534888, 28432116,
    30407957, 30412485, 29009511, 28433076, 30414842, 28432455, 30407898,
    28432204, 28430973, 30629803, 30408380,
  ];

  if (!segments.includes(segmentId)) {
    return altitudeStream;
  }

  return altitudeStream.map((altitude) => altitude - 60);
}

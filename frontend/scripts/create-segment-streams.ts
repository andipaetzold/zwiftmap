import { mkdirSync, rmSync, writeFileSync } from "fs";
import path, { dirname } from "path";
import { routes, segments } from "zwift-data";
import {
  routes as routeStreams,
  segments as segmentStreams,
  type StreamData,
} from "zwift-data/streams";
import { fileURLToPath } from "url";
import progress from "cli-progress";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const OUTPUT_DIR = path.resolve(__dirname, "../public/strava-segments");

// Rebuild every stream, including removing files for mappings no longer present.
rmSync(OUTPUT_DIR, { recursive: true, force: true });
mkdirSync(OUTPUT_DIR, { recursive: true });

const entries = [
  ...routes.map((route) => ({ ...route, stream: routeStreams[route.slug] })),
  ...segments.map((segment) => ({
    ...segment,
    stream: segmentStreams[segment.slug],
  })),
].filter((entry) => entry.stravaSegmentId !== undefined);

const bar = new progress.Bar({});
bar.start(entries.length, 0);

try {
  for (const { slug, stravaSegmentId, stream } of entries) {
    if (!stream) {
      throw new Error(`Missing stream for '${slug}' (${stravaSegmentId})`);
    }
    generateSegment(stravaSegmentId!, stream);
    bar.increment();
  }
} finally {
  bar.stop();
}

function generateSegment(segmentId: number, stream: StreamData) {
  if (
    stream.latlng.length === 0 ||
    stream.latlng.length !== stream.altitude.length ||
    stream.latlng.length !== stream.distance.length
  ) {
    throw new Error(
      `Empty or misaligned stream for Strava segment ${segmentId}`,
    );
  }

  // Coordinates already have six decimal places. Keep the first point in each
  // consecutive run and use its index for all three arrays.
  const retainedIndices = stream.latlng.flatMap(([lat, lng], index) =>
    stream.latlng[index - 1]?.[0] !== lat ||
    stream.latlng[index - 1]?.[1] !== lng
      ? [index]
      : [],
  );
  const latlng = retainedIndices.map((index) => stream.latlng[index]);
  const altitude = fixMakuriIslandsAltitude(
    segmentId,
    retainedIndices.map((index) => stream.altitude[index]),
  );
  // The package stores distance at 0.1 m precision; rounding to two decimal
  // places would not restore finer source precision.
  const distance = retainedIndices.map((index) => stream.distance[index]);

  const segmentDir = path.join(OUTPUT_DIR, String(segmentId));
  mkdirSync(segmentDir, { recursive: true });
  writeFileSync(
    path.join(segmentDir, "altitude.json"),
    JSON.stringify(altitude),
  );
  writeFileSync(
    path.join(segmentDir, "distance.json"),
    JSON.stringify(distance),
  );
  writeFileSync(path.join(segmentDir, "latlng.json"), JSON.stringify(latlng));
}

/**
 * With the Urukazi update, Zwift lowered the altitude of all existing roads by 60m
 */
function fixMakuriIslandsAltitude(
  segmentId: number,
  altitudeStream: number[],
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

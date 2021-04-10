import { StravaSegment } from "./types";

const segmentCache: { [segmentSlug: string]: Promise<StravaSegment> } = {};

export async function getStravaSegment(
  segmentSlug: string
): Promise<StravaSegment> {
  if (!segmentCache[segmentSlug]) {
    segmentCache[segmentSlug] = fetchStravaSegment(segmentSlug);
  }

  return await segmentCache[segmentSlug];
}

async function fetchStravaSegment(segmentSlug: string) {
  const basePath = `segments/${segmentSlug}`;

  const response = await Promise.all([
    fetch(`${basePath}/altitude.json`).then((r) => r.json()),
    fetch(`${basePath}/distance.json`).then((r) => r.json()),
    fetch(`${basePath}/latlng.json`).then((r) => r.json()),
  ]);
  return {
    altitude: response[0],
    distance: response[1],
    latlng: response[2],
  };
}

import { StravaSegment } from "./types";

const segmentCache: { [segmentSlug: string]: Promise<StravaSegment> } = {};

export async function getStravaSegment(segmentSlug: string): Promise<StravaSegment> {
  if (!segmentCache[segmentSlug]) {
    segmentCache[segmentSlug] = fetchStravaSegment(segmentSlug);
  }

  return await segmentCache[segmentSlug];
}

async function fetchStravaSegment(segmentSlug: string) {
  const response = await fetch(`segments/${segmentSlug}.json`);
  return await response.json();
}

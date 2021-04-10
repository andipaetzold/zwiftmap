import { Segment } from "./types";

const segmentCache: { [segmentSlug: string]: Promise<Segment> } = {};

export async function getSegment(segmentSlug: string): Promise<Segment> {
  if (!segmentCache[segmentSlug]) {
    segmentCache[segmentSlug] = fetchSegment(segmentSlug);
  }

  return await segmentCache[segmentSlug];
}

async function fetchSegment(segmentSlug: string) {
  const response = await fetch(`segments/${segmentSlug}.json`);
  return await response.json();
}

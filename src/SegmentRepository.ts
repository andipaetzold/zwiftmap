import { Segment } from "./types";

const segmentCache: { [segmentSlug: string]: Segment } = {};

export async function getSegment(segmentSlug: string): Promise<Segment> {
  if (!segmentCache[segmentSlug]) {
    const response = await fetch(`segments/${segmentSlug}.json`);
    segmentCache[segmentSlug] = await response.json();
  }

  return segmentCache[segmentSlug];
}

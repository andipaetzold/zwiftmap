import { StravaSegment } from "./types";

const cache: { [cacheKey: string]: Promise<any> } = {};

export async function getStravaSegment(
  segmentSlug: string
): Promise<StravaSegment> {
  if (!cache[segmentSlug]) {
    cache[segmentSlug] = fetchStravaSegment(segmentSlug);
  }

  return await cache[segmentSlug];
}

export async function getStravaSegmentStream<
  Stream extends "altitude" | "distance" | "latlng"
>(segmentSlug: string, stream: Stream): Promise<StravaSegment[Stream]> {
  const cacheKey = `${segmentSlug}-${stream}`;
  if (!cache[cacheKey]) {
    cache[cacheKey] = fetchStravaSegmentStream(segmentSlug, stream);
  }

  return cache[cacheKey];
}

export async function getStravaSegmentStreams<
  Stream extends "altitude" | "distance" | "latlng"
>(
  segmentSlug: string,
  streams: ReadonlyArray<Stream>
): Promise<Pick<StravaSegment, Stream>> {
  const streamData = await Promise.all(
    streams.map((stream) => getStravaSegmentStream(segmentSlug, stream))
  );

  // @ts-ignore
  return Object.fromEntries(
    streams.map((stream, i) => [stream, streamData[i]])
  );
}

async function fetchStravaSegment(segmentSlug: string) {
  const response = await Promise.all([
    getStravaSegmentStream(segmentSlug, "altitude"),
    getStravaSegmentStream(segmentSlug, "distance"),
    getStravaSegmentStream(segmentSlug, "latlng"),
  ]);

  return {
    altitude: response[0],
    distance: response[1],
    latlng: response[2],
  };
}

async function fetchStravaSegmentStream<
  Stream extends "altitude" | "distance" | "latlng"
>(segmentSlug: string, stream: Stream): Promise<StravaSegment[Stream]> {
  const response = await fetch(`segments/${segmentSlug}/${stream}.json`);
  return await response.json();
}

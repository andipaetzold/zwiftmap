import { StravaSegment } from "../types";

const cache: { [cacheKey: string]: Promise<any> } = {};

export async function getStravaSegmentStream<
  Stream extends "altitude" | "distance" | "latlng"
>(
  segmentSlug: string,
  type: "segments" | "routes",
  stream: Stream
): Promise<StravaSegment[Stream]> {
  const cacheKey = `${type}-${segmentSlug}-${stream}`;
  if (!cache[cacheKey]) {
    cache[cacheKey] = fetchStravaSegmentStream(segmentSlug, type, stream);
  }

  return cache[cacheKey];
}

export async function getStravaSegmentStreams<
  Stream extends "altitude" | "distance" | "latlng"
>(
  segmentSlug: string,
  type: "segments" | "routes",
  streams: ReadonlyArray<Stream>
): Promise<Pick<StravaSegment, Stream>> {
  const streamData = await Promise.all(
    streams.map((stream) => getStravaSegmentStream(segmentSlug, type, stream))
  );

  // @ts-ignore
  return Object.fromEntries(
    streams.map((stream, i) => [stream, streamData[i]])
  );
}

async function fetchStravaSegmentStream<
  Stream extends "altitude" | "distance" | "latlng"
>(
  segmentSlug: string,
  type: "segments" | "routes",
  stream: Stream
): Promise<StravaSegment[Stream]> {
  const response = await fetch(
    `${type}/${segmentSlug}/${stream}.json`
  );
  return await response.json();
}

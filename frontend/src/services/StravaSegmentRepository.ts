import axios from "axios";
import fromPairs from "lodash/fromPairs";
import { StravaSegment } from "../types";
import { createAxiosCacheAdapter } from "./axios-cache-adapter";

const api = axios.create({
  adapter: createAxiosCacheAdapter(),
});

export async function getStravaSegmentStream<
  Stream extends "altitude" | "distance" | "latlng"
>(
  segmentSlug: string,
  type: "segments" | "routes",
  stream: Stream
): Promise<StravaSegment[Stream]> {
  const response = await api.get<StravaSegment[Stream]>(
    `/${type}/${segmentSlug}/${stream}.json`
  );

  if (typeof response.data === "string") {
    throw new Error(`Error fetching ${stream} for ${type} "${segmentSlug}"`);
  }

  return response.data;
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
  return fromPairs(streams.map((stream, i) => [stream, streamData[i]]));
}

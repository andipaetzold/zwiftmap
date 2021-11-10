import axios from "axios";
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
  return Object.fromEntries(
    streams.map((stream, i) => [stream, streamData[i]])
  );
}

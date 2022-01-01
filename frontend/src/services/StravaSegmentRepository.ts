import axios from "axios";
import fromPairs from "lodash/fromPairs";
import { StravaSegment } from "../types";
import { createAxiosCacheAdapter } from "./axios-cache-adapter";

const api = axios.create({
  adapter: createAxiosCacheAdapter(),
});

async function getStravaSegmentStream<
  Stream extends "altitude" | "distance" | "latlng"
>(stravaSegmentId: number, stream: Stream): Promise<StravaSegment[Stream]> {
  const response = await api.get<StravaSegment[Stream]>(
    `/strava-segments/${stravaSegmentId}/${stream}.json`
  );

  if (typeof response.data === "string") {
    throw new Error(`Error fetching ${stream} for segment ${stravaSegmentId}`);
  }

  return response.data;
}

export async function getStravaSegmentStreams<
  Stream extends "altitude" | "distance" | "latlng"
>(
  stravaSegmentId: number | undefined,
  streams: ReadonlyArray<Stream>
): Promise<Pick<StravaSegment, Stream>> {
  if (!stravaSegmentId) {
    throw new Error(`Error fetching streams for undefined segment`);
  }

  const streamData = await Promise.all(
    streams.map((stream) => getStravaSegmentStream(stravaSegmentId, stream))
  );

  // @ts-ignore
  return fromPairs(streams.map((stream, i) => [stream, streamData[i]]));
}

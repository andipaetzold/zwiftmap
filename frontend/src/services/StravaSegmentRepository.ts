import fromPairs from "lodash/fromPairs";
import { StravaSegment } from "../types";
import { cachedRequest } from "./cached-request";

async function getStravaSegmentStream<
  Stream extends "altitude" | "distance" | "latlng"
>(stravaSegmentId: number, stream: Stream): Promise<StravaSegment[Stream]> {
  try {
    return await cachedRequest(
      `/strava-segments/${stravaSegmentId}/${stream}.json`
    );
  } catch {
    throw new Error(`Error fetching ${stream} for segment ${stravaSegmentId}`);
  }
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

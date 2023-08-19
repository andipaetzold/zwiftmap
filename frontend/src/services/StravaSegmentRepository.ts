import { StravaSegment } from "../types";
import { request } from "./request";

export async function getStravaSegmentStream<
  Stream extends "altitude" | "distance" | "latlng",
>(stravaSegmentId: number, stream: Stream): Promise<StravaSegment[Stream]> {
  try {
    return await request(`/strava-segments/${stravaSegmentId}/${stream}.json`);
  } catch {
    throw new Error(`Error fetching ${stream} for segment ${stravaSegmentId}`);
  }
}

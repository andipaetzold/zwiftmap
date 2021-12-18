import { DistanceStream, ElevationStream } from "./Stream";

export interface StravaSegment {
  latlng: Array<[number, number]>;
  distance: DistanceStream;
  altitude: ElevationStream;
}

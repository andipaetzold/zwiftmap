import { DistanceStream, ElevationStream, LatLngStream } from "./Stream";

export interface StravaSegment {
  latlng: LatLngStream;
  distance: DistanceStream;
  altitude: ElevationStream;
}

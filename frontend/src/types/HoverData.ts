import { LatLngStream } from "./Stream";

export type HoverData =
  | undefined
  | HoverDataRoute
  | HoverDataSegment
  | HoverDataLatLng;

export interface HoverDataRoute {
  type: "route";
  route: string;
}

export interface HoverDataSegment {
  type: "segment";
  segment: string;
}

export interface HoverDataLatLng {
  type: "latlng";
  latlng: LatLngStream;
}

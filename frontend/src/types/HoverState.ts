import { LatLngStream } from "./Stream";
import { SurfaceType } from "./Surface";

export type HoverState =
  | undefined
  | HoverStateRoute
  | HoverStateSegment
  | HoverStateLatLngStream
  | HoverStateSurface
  | HoverStateRouteDistance;

export interface HoverStateRoute {
  type: "route";
  route: string;
}

export interface HoverStateSegment {
  type: "segment";
  segment: string;
}

export interface HoverStateLatLngStream {
  type: "latLngStream";
  latLngStream: LatLngStream;
}

export interface HoverStateSurface {
  type: "surface";
  surface: SurfaceType;
}

export interface HoverStateRouteDistance {
  type: "distance";
  distance: number;
}

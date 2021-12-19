import { LatLngStream } from "./Stream";
import { SurfaceType } from "./Surface";

export type HoverState =
  | undefined
  | HoverStatePreviewRoute
  | HoverStatePreviewSegment
  | HoverStatePreviewLatLngStream
  | HoverStateSurface
  | HoverStateRouteDistance;

export interface HoverStatePreviewRoute {
  type: "preview-route";
  route: string;
}

export interface HoverStatePreviewSegment {
  type: "preview-segment";
  segment: string;
}

export interface HoverStatePreviewLatLngStream {
  type: "preview-latLngStream";
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

import { LatLngStream } from "./Stream";
import { SurfaceType } from "./Surface";

export type HoverState =
  | undefined
  | HoverStatePreviewRoute
  | HoverStatePreviewEvent
  | HoverStatePreviewSegment
  | HoverStatePreviewLatLngStream
  | HoverStateHighlightSurface
  | HoverStateHighlightSegment
  | HoverStateRouteDistance;

export const enum HoverStateType {
  PreviewRoute,
  PreviewEvent,
  PreviewSegment,
  PreviewLatLngStream,
  HighlightSurface,
  HighlightSegment,
  Distance,
  Place,
}

export interface HoverStatePreviewRoute {
  type: HoverStateType.PreviewRoute;
  route: string;
}

export interface HoverStatePreviewEvent {
  type: HoverStateType.PreviewEvent;
  event: number;
}

export interface HoverStatePreviewSegment {
  type: HoverStateType.PreviewSegment;
  segment: string;
}

export interface HoverStatePreviewLatLngStream {
  type: HoverStateType.PreviewLatLngStream;
  /**
   * TODO: store activity id instead of stream
   */
  latLngStream: LatLngStream;
}

export interface HoverStateHighlightSurface {
  type: HoverStateType.HighlightSurface;
  surface: SurfaceType;
}

export interface HoverStateHighlightSegment {
  type: HoverStateType.HighlightSegment;
  segment: string;
}

export interface HoverStateRouteDistance {
  type: HoverStateType.Distance;
  distance: number;
}

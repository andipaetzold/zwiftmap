import { RoadsEdge } from "./roads/index.js";

export type LatLng = [latitude: number, longitude: number];
export type LatLngAlt = [latitude: number, longitude: number, altitude: number];

export interface SnappedPoint {
  position: LatLngAlt;
  sourcePosition: LatLng;
  edge: RoadsEdge;
  edgeStreamIndex: number;
}

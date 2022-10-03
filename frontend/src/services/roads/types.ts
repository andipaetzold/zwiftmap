import { LatLngTuple } from "leaflet";
import { RoadsEdge } from "./roads";

export interface SnappedPoint {
  position: LatLngAlt;
  sourcePosition: LatLngTuple;
  edge: RoadsEdge;
  edgeStreamIndex: number;
}

export type LatLngAlt = [latitude: number, longitude: number, altitude: number];

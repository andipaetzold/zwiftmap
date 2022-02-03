import { LatLngTuple } from "leaflet";
import { Edge } from "../services/Roads";

export interface SnappedPoint {
  position: LatLngTuple;
  sourcePosition: LatLngTuple;
  edge: Edge;
  edgeStreamIndex: number;
}

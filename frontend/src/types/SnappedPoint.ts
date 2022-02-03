import { LatLngTuple } from "leaflet";
import { Edge } from "../services/Roads";
import { LatLngAlt } from "./LatLngAlt";

export interface SnappedPoint {
  position: LatLngAlt;
  sourcePosition: LatLngTuple;
  edge: Edge;
  edgeStreamIndex: number;
}

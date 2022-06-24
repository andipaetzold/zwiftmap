import { LatLngTuple } from "leaflet";
import { Edge } from "./Roads";
import { LatLngAlt } from "@zwiftmap/types";

export interface SnappedPoint {
  position: LatLngAlt;
  sourcePosition: LatLngTuple;
  edge: Edge;
  edgeStreamIndex: number;
}

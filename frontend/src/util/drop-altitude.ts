import { LatLngTuple } from "leaflet";
import { LatLngAlt } from "../types";

export function dropAltitude(p: LatLngAlt): LatLngTuple {
  return [p[0], p[1]];
}

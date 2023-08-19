import { LatLngBounds } from "leaflet";
import { LatLngStream } from "../types";

export function getBounds(latLngStream: LatLngStream) {
  return latLngStream.reduce(
    (bounds, coord) => bounds.extend(coord),
    new LatLngBounds(latLngStream[0], latLngStream[0]),
  );
}

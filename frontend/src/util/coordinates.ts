import type { Position } from "@turf/helpers";
import type { LatLngExpression, LatLngTuple } from "leaflet";

export function positionToLatLng(position: Position): LatLngTuple {
  return [position[1], position[0]];
}

export function latLngToPosition(latLng: LatLngExpression): Position {
  if (Array.isArray(latLng)) {
    return [latLng[1], latLng[0]];
  }

  return [latLng.lng, latLng.lat];
}

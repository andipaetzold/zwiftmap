import { LatLngBounds, LatLngTuple } from "leaflet";

export function getBounds(coordinates: LatLngTuple[]) {
  return coordinates.reduce(
    (bounds, coord) => bounds.extend(coord),
    new LatLngBounds(coordinates[0], coordinates[0])
  );
}

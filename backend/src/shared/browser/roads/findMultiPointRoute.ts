import { range } from "lodash-es";
import { findRoute } from "./findRoute.js";
import { Roads } from "./roads/Roads.js";
import { LatLng, LatLngAlt } from "./types.js";

export function findMultiPointRoute(
  points: LatLng[],
  roads: Roads
): LatLngAlt[] | null {
  if (points.length < 2) {
    return null;
  }

  const routes = range(0, points.length - 1).map((index) =>
    findRoute(points[index], points[index + 1], roads)
  );
  if (routes.some((route) => route === null)) {
    return null;
  }

  return ([] as LatLngAlt[]).concat.apply([], routes as LatLngAlt[][]);
}

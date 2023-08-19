import { Route, Segment, World } from "zwift-data";
import { Place, SortState } from "../types";

export function sortWorld(sortState: SortState, a: World, b: World): number {
  const result = a.name.localeCompare(b.name);
  return sortState.dir === "ASC" ? result : -result;
}

export function sortRoute(sortState: SortState, a: Route, b: Route): number {
  let result = 0;

  switch (sortState.key) {
    case "name":
      result = a.name.localeCompare(b.name);
      break;
    case "distance":
      result = a.distance - b.distance;
      break;
    case "elevation":
      result = a.elevation - b.elevation;
      break;
    case "experience":
      result = (a.experience ?? 0) - (b.experience ?? 0);
      break;
    case "leadInDistance":
      result = (a.leadInDistance ?? 0) - (b.leadInDistance ?? 0);
      break;
    case "leadInElevation":
      result = (a.leadInElevation ?? 0) - (b.leadInElevation ?? 0);
      break;
  }

  return sortState.dir === "ASC" ? result : -result;
}

export function sortSegment(
  sortState: SortState,
  a: Segment,
  b: Segment,
): number {
  let result = 0;

  switch (sortState.key) {
    case "name":
      result = a.name.localeCompare(b.name);
      break;
    case "distance":
      result = a.distance - b.distance;
      break;
    case "elevation":
      result = (a.elevation ?? Infinity) - (b.elevation ?? Infinity);
      break;
  }

  return sortState.dir === "ASC" ? result : -result;
}

export function sortPlace(sortState: SortState, a: Place, b: Place): number {
  const result = a.name.localeCompare(b.name);
  return sortState.dir === "ASC" ? result : -result;
}

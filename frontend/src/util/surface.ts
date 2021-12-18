import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import { point as turfPoint, polygon as turfPolygon } from "@turf/helpers";
import {
  DistanceStream,
  LatLngStream,
  SurfaceType,
  SurfaceTypeStream,
  SURFACE_TYPE_BRICK,
  SURFACE_TYPE_COBBLES,
  SURFACE_TYPE_DIRT,
  SURFACE_TYPE_GRASS,
  SURFACE_TYPE_SNOW,
  SURFACE_TYPE_TARMAC,
  SURFACE_TYPE_WOOD,
  WorldConfigSurface,
} from "../types";

export function getSurfaceStream(
  latLngStream: LatLngStream,
  surfaces: WorldConfigSurface[]
): SurfaceTypeStream {
  const turfedWorldSurfaces = surfaces.map((worldSurface) => ({
    ...worldSurface,
    polygon: turfPolygon([worldSurface.polygon]),
  }));

  return latLngStream
    .map((latlng) => turfPoint(latlng))
    .map(
      (point) =>
        turfedWorldSurfaces.find((worldSurface) =>
          booleanPointInPolygon(point, worldSurface.polygon)
        )?.type ?? SURFACE_TYPE_TARMAC
    );
}

export function getSurfaceStats(
  distanceStream: DistanceStream,
  surfaceStream: SurfaceTypeStream
): Record<SurfaceType, number> {
  const result: Record<SurfaceType, number> = {
    [SURFACE_TYPE_TARMAC]: 0,
    [SURFACE_TYPE_BRICK]: 0,
    [SURFACE_TYPE_WOOD]: 0,
    [SURFACE_TYPE_COBBLES]: 0,
    [SURFACE_TYPE_SNOW]: 0,
    [SURFACE_TYPE_DIRT]: 0,
    [SURFACE_TYPE_GRASS]: 0,
  };

  for (let i = 1; i < distanceStream.length; ++i) {
    result[surfaceStream[i]] +=
      (distanceStream[i] - distanceStream[i - 1]) / 1_000;
  }

  return result;
}

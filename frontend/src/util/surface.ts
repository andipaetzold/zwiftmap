import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import { point as turfPoint, polygon as turfPolygon } from "@turf/helpers";
import {
  DistanceStream,
  LatLngStream,
  SURFACE_TYPES,
  SurfaceType,
  SurfaceTypeStream,
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
        )?.type ?? SurfaceType.Tarmac
    );
}

export function getSurfaceStats(
  distanceStream: DistanceStream,
  surfaceStream: SurfaceTypeStream
): Record<SurfaceType, number> {
  const result = Object.fromEntries(
    SURFACE_TYPES.map((type) => [type, 0])
  ) as Record<SurfaceType, number>;

  for (let i = 1; i < distanceStream.length; ++i) {
    result[surfaceStream[i]] +=
      (distanceStream[i] - distanceStream[i - 1]) / 1_000;
  }

  return result;
}

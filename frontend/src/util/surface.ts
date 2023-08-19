import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import { point as turfPoint, polygon as turfPolygon } from "@turf/helpers";
import {
  DistanceStream,
  LatLngStream,
  SurfaceType,
  SurfaceTypeStream,
  WorldConfigSurface,
} from "../types";

export function getSurfaceStream(
  latLngStream: LatLngStream,
  surfaces: WorldConfigSurface[],
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
          booleanPointInPolygon(point, worldSurface.polygon),
        )?.type ?? SurfaceType.Tarmac,
    );
}

export function getSurfaceStats(
  distanceStream: DistanceStream,
  surfaceStream: SurfaceTypeStream,
): Record<SurfaceType, number> {
  const result: Record<SurfaceType, number> = {
    [SurfaceType.Tarmac]: 0,
    [SurfaceType.Brick]: 0,
    [SurfaceType.Wood]: 0,
    [SurfaceType.Cobbles]: 0,
    [SurfaceType.Snow]: 0,
    [SurfaceType.Dirt]: 0,
    [SurfaceType.Grass]: 0,
    [SurfaceType.Sand]: 0,
  };

  for (let i = 1; i < distanceStream.length; ++i) {
    result[surfaceStream[i]] +=
      (distanceStream[i] - distanceStream[i - 1]) / 1_000;
  }

  return result;
}

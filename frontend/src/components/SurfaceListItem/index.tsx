import { List, SimpleListItem } from "@react-md/list";
import { LatLngTuple } from "leaflet";
import { SURFACE_CONSTANTS } from "../../constants";
import {
  SurfaceType,
  SURFACE_TYPES,
  SURFACE_TYPE_BRICK,
  SURFACE_TYPE_COBBLES,
  SURFACE_TYPE_DIRT,
  SURFACE_TYPE_GRASS,
  SURFACE_TYPE_SNOW,
  SURFACE_TYPE_TARMAC,
  SURFACE_TYPE_WOOD,
  WorldConfigSurface,
} from "../../types";
import { Distance } from "../Distance";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import { point as turfPoint, polygon as turfPolygon } from "@turf/helpers";

const FORMAT_PERCENT = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
  style: "percent",
});

interface Props {
  latLngStream: LatLngTuple[];
  distancStream: number[];
  distance: number;
  surfaces: WorldConfigSurface[];
}

export function SurfaceListItem({
  latLngStream,
  distancStream,
  distance,
  surfaces,
}: Props) {
  const worldSurfaces = surfaces.map((worldSurface) => ({
    ...worldSurface,
    polygon: turfPolygon([worldSurface.polygon]),
  }));

  const routeSurfaces = latLngStream
    .map((latlng) => turfPoint(latlng))
    .map(
      (point) =>
        worldSurfaces.find((ws) => booleanPointInPolygon(point, ws.polygon))
          ?.type ?? SURFACE_TYPE_TARMAC
    );

  const surfaceTypesWithDistance: Record<SurfaceType, number> = {
    [SURFACE_TYPE_TARMAC]: 0,
    [SURFACE_TYPE_BRICK]: 0,
    [SURFACE_TYPE_WOOD]: 0,
    [SURFACE_TYPE_COBBLES]: 0,
    [SURFACE_TYPE_SNOW]: 0,
    [SURFACE_TYPE_DIRT]: 0,
    [SURFACE_TYPE_GRASS]: 0,
  };

  for (let i = 1; i < routeSurfaces.length; ++i) {
    surfaceTypesWithDistance[routeSurfaces[i]] +=
      (distancStream[i] - distancStream[i - 1]) / 1_000;
  }

  return (
    <List style={{ marginTop: 0, marginBottom: 0 }}>
      <Legend data={surfaceTypesWithDistance} distance={distance} />
    </List>
  );
}

interface LegendProps {
  data: Record<SurfaceType, number>;
  distance: number;
}

function Legend({ data, distance }: LegendProps) {
  return (
    <SimpleListItem>
      <ul style={{ padding: 0, margin: 0 }}>
        {SURFACE_TYPES.filter((type) => data[type] > 0).map((type) => (
          <li key={type} style={{ display: "block" }}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 32 32"
              style={{
                display: "inline-block",
                verticalAlign: "middle",
                marginRight: "4px",
              }}
            >
              <path fill={SURFACE_CONSTANTS[type].color} d="M0,4h32v24h-32z" />
            </svg>
            {SURFACE_CONSTANTS[type].label}: <Distance distance={data[type]} />{" "}
            ({FORMAT_PERCENT.format(data[type] / distance)})
          </li>
        ))}
      </ul>
    </SimpleListItem>
  );
}

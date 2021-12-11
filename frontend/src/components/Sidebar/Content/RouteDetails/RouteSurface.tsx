import { List, ListSubheader, SimpleListItem } from "@react-md/list";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import { point as turfPoint, polygon as turfPolygon } from "@turf/helpers";
import { useAsync } from "react-async-hook";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Route } from "zwift-data";
import { ENVIRONMENT } from "../../../../config";
import { SURFACE_CONSTANTS } from "../../../../constants";
import { getStravaSegmentStreams } from "../../../../services/StravaSegmentRepository";
import { StravaSegment } from "../../../../types";
import {
  Surface,
  SURFACES,
  SURFACE_BRICK,
  SURFACE_COBBLES,
  SURFACE_DIRT,
  SURFACE_GRASS,
  SURFACE_SNOW,
  SURFACE_TARMAC,
  SURFACE_WOOD,
} from "../../../../types/Surface";
import { worldConfigs } from "../../../../worldConfig";
import { Distance } from "../../../Distance";

interface Props {
  route: Route;
}

const REQUIRED_STREAMS = ["latlng", "distance"] as const;

export const FORMAT_PERCENT = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
  style: "percent",
});

export function RouteSurface({ route }: Props) {
  const { result: routeSegment } = useAsync<
    Pick<StravaSegment, "latlng" | "distance">
  >(getStravaSegmentStreams, [route.slug, "routes", REQUIRED_STREAMS]);

  if (ENVIRONMENT === "production") {
    return null;
  }

  if (!routeSegment) {
    return null;
  }

  const routeLatLng = routeSegment.latlng;
  const routeDistance = routeSegment.distance;

  /**
   * Distance in zwift-data and on Strava are not identical. This factor is used to adjust the strava distance.
   */
  const distanceFactor =
    route.distance / (routeDistance[routeDistance.length - 1] / 1_000);

  const worldConfig = worldConfigs[route.world];
  const worldSurfaces = worldConfig.surfaces.map((worldSurface) => ({
    ...worldSurface,
    polygon: turfPolygon([worldSurface.polygon]),
  }));

  const routeSurfaces = routeLatLng
    .map((latlng) => turfPoint(latlng))
    .map(
      (point) =>
        worldSurfaces.find((ws) => booleanPointInPolygon(point, ws.polygon))
          ?.surface ?? SURFACE_TARMAC
    );

  const surfacesWithDistance: Record<Surface, number> = {
    [SURFACE_TARMAC]: 0,
    [SURFACE_BRICK]: 0,
    [SURFACE_WOOD]: 0,
    [SURFACE_COBBLES]: 0,
    [SURFACE_SNOW]: 0,
    [SURFACE_DIRT]: 0,
    [SURFACE_GRASS]: 0,
  };

  for (let i = 1; i < routeSurfaces.length; ++i) {
    surfacesWithDistance[routeSurfaces[i]] +=
      ((routeDistance[i] - routeDistance[i - 1]) / 1_000) * distanceFactor;
  }

  return (
    <List
      aria-labelledby="route-surface-header"
      style={{ marginTop: 0, marginBottom: 0 }}
    >
      <ListSubheader id="route-surface-header" role="none">
        Surfaces
      </ListSubheader>

      <Chart data={surfacesWithDistance} />
      <Legend data={surfacesWithDistance} distance={route.distance} />
    </List>
  );
}

interface ChartProps {
  data: Record<Surface, number>;
}

function Chart({ data }: ChartProps) {
  return (
    <SimpleListItem aria-hidden="true">
      <div style={{ width: "100%", height: 100 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={[data]} layout="vertical">
            <XAxis
              type="number"
              allowDecimals={false}
              tickCount={4}
              domain={[0, "auto"]}
              unit="km"
            />
            <YAxis type="category" dataKey="surface" tick={false} width={15} />
            {SURFACES.filter((s) => data[s] > 0).map((s) => (
              <Bar
                key={s}
                dataKey={s}
                fill={SURFACE_CONSTANTS[s].color}
                label={SURFACE_CONSTANTS[s].label}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </SimpleListItem>
  );
}

interface LegendProps {
  data: Record<Surface, number>;
  distance: number;
}

function Legend({ data, distance }: LegendProps) {
  return (
    <SimpleListItem>
      <ul style={{ padding: 0, margin: 0 }}>
        {SURFACES.filter((s) => data[s] > 0).map((s) => (
          <li key={s} style={{ display: "block" }}>
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
              <path fill={SURFACE_CONSTANTS[s].color} d="M0,4h32v24h-32z" />
            </svg>
            {SURFACE_CONSTANTS[s].label}: <Distance distance={data[s]} /> (
            {FORMAT_PERCENT.format(data[s] / distance)})
          </li>
        ))}
      </ul>
    </SimpleListItem>
  );
}

import { List, SimpleListItem } from "@react-md/list";
import { SURFACE_CONSTANTS } from "../../constants";
import {
  DistanceStream,
  LatLngStream,
  SurfaceType,
  SURFACE_TYPES,
  WorldConfigSurface
} from "../../types";
import { getSurfaceStats, getSurfaceStream } from "../../util/surface";
import { Distance } from "../Distance";

const FORMAT_PERCENT = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
  style: "percent",
});

interface Props {
  latLngStream: LatLngStream;
  distancStream: DistanceStream;
  distance: number;
  surfaces: WorldConfigSurface[];
}

export function SurfaceListItem({
  latLngStream,
  distancStream,
  distance,
  surfaces,
}: Props) {
  const surfaceStream = getSurfaceStream(latLngStream, surfaces);
  const surfaceTypesWithDistance = getSurfaceStats(
    distancStream,
    surfaceStream
  );

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

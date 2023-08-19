import { List, SimpleListItem } from "@react-md/list";
import { SURFACE_CONSTANTS } from "../../constants";
import { useStore } from "../../hooks/useStore";
import {
  DistanceStream,
  HoverStateType,
  LatLngStream,
  SurfaceType,
  SURFACE_TYPES,
  WorldConfigSurface,
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
  surfaces: WorldConfigSurface[];
}

export function SurfaceListItem({
  latLngStream,
  distancStream,
  surfaces,
}: Props) {
  const surfaceStream = getSurfaceStream(latLngStream, surfaces);
  const surfaceTypesWithDistance = getSurfaceStats(
    distancStream,
    surfaceStream,
  );

  return (
    <List style={{ marginTop: 0, marginBottom: 0 }}>
      <Legend data={surfaceTypesWithDistance} />
    </List>
  );
}

interface LegendProps {
  data: Record<SurfaceType, number>;
}

function Legend({ data }: LegendProps) {
  const setHoverState = useStore((state) => state.setHoverState);
  const distance = Object.values(data).reduce((prev, cur) => prev + cur, 0);

  return (
    <SimpleListItem>
      <ul style={{ padding: 0, margin: 0 }}>
        {SURFACE_TYPES.filter((type) => data[type] > 0).map((type) => (
          <li
            key={type}
            style={{ display: "block" }}
            onMouseEnter={() =>
              setHoverState({
                type: HoverStateType.HighlightSurface,
                surface: type,
              })
            }
            onMouseLeave={() => setHoverState(undefined)}
          >
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

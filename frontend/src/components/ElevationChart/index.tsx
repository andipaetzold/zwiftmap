import { SimpleListItem } from "@react-md/list";
import { Typography } from "@react-md/typography";
import { withErrorBoundary } from "@sentry/react";
import { useCallback, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SegmentType } from "zwift-data";
import { COLORS } from "../../constants";
import { useStore } from "../../hooks/useStore";
import { DistanceStream, ElevationStream, HoverStateType } from "../../types";
import { Distance } from "../Distance";
import { Elevation } from "../Elevation";
import { ElevationGradient } from "../ElevationGradient";

interface Props {
  distanceStream: DistanceStream;
  altitudeStream: ElevationStream;
  segments?: {
    range: [from: number, to: number];
    type: SegmentType;
  }[];
}

interface OnMouseMoveProps {
  isTooltipActive?: boolean;
  activeCoordinate?: { x: number; y: number };
  activeLabel?: string;
  activePayload?: {
    chartType: unknown;
    color: string;
    dataKey: string;
    fill: string;
    fillOpacity: number;
    formatter: unknown;
    name: string;
    payload: Data;
    points: unknown[];
    stroke: string;
    type: unknown;
    unit: string;
    value: number;
  }[];
  activeTooltipIndex?: number;
  chartX?: number;
  chartY?: number;
}

// max width the chart will be rendered
const TARGET_RESOLUTION = 750;

function thinStream<T>(stream: T[]): T[] {
  const n = Math.max(1, Math.floor(stream.length / TARGET_RESOLUTION));
  return stream.filter((_v, i) => i % n === 0);
}

interface Data {
  distance: number;
  elevationRegular: number | undefined;
  elevationSegmentSprint: number | undefined;
  elevationSegmentKOM: number | undefined;
}

export const ElevationChart = withErrorBoundary(ElevationChartComponent, {});

function ElevationChartComponent({
  distanceStream,
  altitudeStream,
  segments = [],
}: Props) {
  const setHoverState = useStore((store) => store.setHoverState);
  const [currentDistance, setCurrentDistance] = useState<number | undefined>(
    undefined
  );
  const [currentAltitude, setCurrentAltitude] = useState<number | undefined>(
    undefined
  );

  const handleMouseMove = useCallback(
    (
      data: OnMouseMoveProps,
      event: React.MouseEvent<SVGElement> | React.Touch
    ) => {
      if ("stopPropagation" in event) {
        event.stopPropagation();
      }

      if (!data.isTooltipActive) {
        setHoverState(undefined);
        setCurrentDistance(undefined);
        setCurrentAltitude(undefined);
        return;
      }

      const distance = data.activePayload?.[0]?.payload.distance;
      const elevation =
        data.activePayload?.[0]?.payload.elevationRegular ??
        data.activePayload?.[0]?.payload.elevationSegmentSprint ??
        data.activePayload?.[0]?.payload.elevationSegmentKOM;

      setHoverState(
        distance ? { type: HoverStateType.Distance, distance } : undefined
      );
      setCurrentDistance(distance);
      setCurrentAltitude(elevation);
    },
    [setHoverState]
  );

  const handleMouseLeave = useCallback(() => {
    setHoverState(undefined);
    setCurrentDistance(undefined);
    setCurrentAltitude(undefined);
  }, [setHoverState]);

  const data: Data[] | undefined = useMemo(() => {
    const thinnedDistanceStream = thinStream(distanceStream);
    const thinnedAltitudeStream = thinStream(altitudeStream);

    let prevType: undefined | "regular" | "sprint" | "climb" = undefined;

    const result: Data[] = [];

    for (let i = 0; i < thinnedDistanceStream.length - 1; ++i) {
      const distanceInKM = thinnedDistanceStream[i] / 1_000;

      const currentType = (segments
        .filter((s) => s.type !== "segment")
        .find(
          ({ range: [from, to] }) => from <= distanceInKM && distanceInKM <= to
        )?.type ?? "regular") as "regular" | "sprint" | "climb";

      result.push({
        distance: distanceInKM,
        elevationRegular:
          currentType === "regular" || prevType === "regular"
            ? thinnedAltitudeStream[i]
            : undefined,
        elevationSegmentSprint:
          currentType === "sprint" || prevType === "sprint"
            ? thinnedAltitudeStream[i]
            : undefined,
        elevationSegmentKOM:
          currentType === "climb" || prevType === "climb"
            ? thinnedAltitudeStream[i]
            : undefined,
      });

      prevType = currentType;
    }

    return result;
  }, [distanceStream, altitudeStream, segments]);

  if (data === undefined) {
    return null;
  }

  return (
    <SimpleListItem aria-hidden="true">
      <div style={{ width: "100%", height: 100, marginBottom: "2em" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 25, bottom: 15 }}
            // @ts-expect-error Prop is missing in types
            baseValue="dataMin"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <defs>
              <ElevationGradient />
            </defs>
            <CartesianGrid
              vertical={false}
              stroke="var(--rmd-form-text-border-color)"
            />
            <XAxis
              name="Distance"
              dataKey="distance"
              type="number"
              allowDecimals={false}
              tick={false}
              unit="km"
              domain={[0, "dataMax"]}
              hide={true}
            />
            <YAxis
              name="Elevation"
              type="number"
              allowDecimals={false}
              tickCount={5}
              domain={["dataMin", "auto"]}
              unit="m"
              hide={true}
            />
            <Tooltip
              content={TooltipContent}
              isAnimationActive={false}
              position={{ y: 10 }}
            />
            <Area
              type="monotone"
              dataKey="elevationRegular"
              stroke={COLORS.regular}
              fillOpacity={1}
              fill="url(#colorElevation)"
              unit="m"
              isAnimationActive={false}
            />
            <Area
              type="monotone"
              dataKey="elevationSegmentSprint"
              stroke={COLORS.sprintSegment}
              fillOpacity={1}
              fill="url(#colorSegmentSprint)"
              unit="m"
              isAnimationActive={false}
            />
            <Area
              type="monotone"
              dataKey="elevationSegmentKOM"
              stroke={COLORS.komSegment}
              fillOpacity={1}
              fill="url(#colorSegmentKOM)"
              unit="m"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
        <div style={{ display: "flex", gap: "1em" }}>
          <Typography type="body-2" style={{ whiteSpace: "nowrap" }}>
            Distance:{" "}
            {currentDistance !== undefined ? (
              <Distance distance={currentDistance} />
            ) : (
              "- km"
            )}
          </Typography>
          <Typography type="body-2" style={{ whiteSpace: "nowrap" }}>
            Altitude:{" "}
            {currentAltitude !== undefined ? (
              <Elevation elevation={currentAltitude} />
            ) : (
              "- m"
            )}
          </Typography>
        </div>
      </div>
    </SimpleListItem>
  );
}

function TooltipContent() {
  return null;
}

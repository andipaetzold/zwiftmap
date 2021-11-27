import { SimpleListItem } from "@react-md/list";
import { Typography } from "@react-md/typography";
import React, { useCallback, useMemo, useState } from "react";
import { useAsync } from "react-async-hook";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Route } from "zwift-data";
import { getStravaSegmentStreams } from "../../services/StravaSegmentRepository";
import { StravaSegment } from "../../types";
import { Distance } from "../Distance";
import { Elevation } from "../Elevation";
import { ElevationGradient } from "../ElevationGradient";
import { LoadingSpinnerListItem } from "../Loading";

interface RouteElevationChartProps {
  route: Route;
  onMouseHoverDistanceChange: (distance: number | undefined) => void;
}

const REQUIRED_STREAMS = ["altitude", "distance"] as const;

export function RouteElevationChart({
  route,
  onMouseHoverDistanceChange,
}: RouteElevationChartProps) {
  const { result: routeSegment, error } = useAsync<
    Pick<StravaSegment, "altitude" | "distance">
  >(getStravaSegmentStreams, [route.slug, "routes", REQUIRED_STREAMS]);

  if (error) {
    return null;
  }

  if (!routeSegment) {
    return <LoadingSpinnerListItem />;
  }

  return (
    <SimpleListItem>
      <ElevationChart
        altitudeStream={routeSegment.altitude}
        distanceStream={routeSegment.distance}
        onMouseHoverDistanceChange={onMouseHoverDistanceChange}
        segments={route.segmentsOnRoute.map((sor) => [sor.from, sor.to])}
      />
    </SimpleListItem>
  );
}

interface Props {
  distanceStream: number[];
  altitudeStream: number[];
  onMouseHoverDistanceChange: (distance: number | undefined) => void;
  segments?: [from: number, to: number][];
}

interface OnMouseMoveProps {
  isTooltipActive: boolean;
  activeCoordinate?: { x: number; y: number };
  activeLabel?: number;
  activePayload?: {
    chartType: unknown;
    color: string;
    dataKey: string;
    fill: string;
    fillOpacity: number;
    formatter: unknown;
    name: string;
    payload: { distance: number; elevation: number };
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
  elevationSegment: number | undefined;
}

export function ElevationChart({
  distanceStream,
  altitudeStream,
  onMouseHoverDistanceChange,
  segments = [],
}: Props) {
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
        onMouseHoverDistanceChange(undefined);
        setCurrentDistance(undefined);
        setCurrentAltitude(undefined);
        return;
      }

      const distance = data.activePayload?.[0]?.payload.distance;
      const elevation = data.activePayload?.[0]?.payload.elevation;

      onMouseHoverDistanceChange(distance);
      setCurrentDistance(distance);
      setCurrentAltitude(elevation);
    },
    [onMouseHoverDistanceChange]
  );

  const handleMouseLeave = useCallback(() => {
    onMouseHoverDistanceChange(undefined);
    setCurrentDistance(undefined);
    setCurrentAltitude(undefined);
  }, [onMouseHoverDistanceChange]);

  const data: Data[] | undefined = useMemo(() => {
    const thinnedDistanceStream = thinStream(distanceStream);
    const thinnedAltitudeStream = thinStream(altitudeStream);

    let prevType: undefined | "regular" | "segment" = undefined;

    const result: Data[] = [];

    for (let i = 0; i < thinnedDistanceStream.length - 1; ++i) {
      const distanceInKM = thinnedDistanceStream[i] / 1_000;

      const isSegment = segments.some(
        ([from, to]) => from <= distanceInKM && distanceInKM <= to
      );

      result.push({
        distance: distanceInKM,
        elevationRegular:
          !isSegment || (isSegment && prevType === "regular")
            ? thinnedAltitudeStream[i]
            : undefined,
        elevationSegment:
          isSegment || (!isSegment && prevType === "segment")
            ? thinnedAltitudeStream[i]
            : undefined,
      });

      prevType = isSegment ? "segment" : "regular";
    }

    return result;
  }, [distanceStream, altitudeStream, segments]);

  if (data === undefined) {
    return null;
  }

  return (
    <div style={{ width: "100%", height: 100, marginBottom: "2em" }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 25, bottom: 15 }}
          // @ts-ignore
          baseValue="dataMin"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <defs>
            <ElevationGradient />
          </defs>
          <CartesianGrid vertical={false} />
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
            cursor={{ stroke: "black" }}
          />
          <Area
            type="monotone"
            dataKey="elevationRegular"
            stroke="black"
            fillOpacity={1}
            fill="url(#colorElevation)"
            unit="m"
            isAnimationActive={false}
          />
          <Area
            type="monotone"
            dataKey="elevationSegment"
            stroke="#64ac39"
            fillOpacity={1}
            fill="url(#colorSegment)"
            unit="m"
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
      <div style={{ display: "flex", gap: "1em" }}>
        <Typography type="body-2" style={{ whiteSpace: "nowrap" }}>
          Distance:{" "}
          {currentDistance ? <Distance distance={currentDistance} /> : "- km"}
        </Typography>
        <Typography type="body-2" style={{ whiteSpace: "nowrap" }}>
          Altitude:{" "}
          {currentAltitude ? <Elevation elevation={currentAltitude} /> : "- m"}
        </Typography>
      </div>
    </div>
  );
}

function TooltipContent() {
  return null;
}

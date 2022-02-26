import  { useMemo } from "react";
import { useAsync } from "react-async-hook";
import { Area, AreaChart, XAxis, YAxis } from "recharts";
import { Route, Segment } from "zwift-data";
import { COLORS } from "../../constants";
import { getStravaSegmentStreams } from "../../services/StravaSegmentRepository";
import { StravaSegment } from "../../types";
import { ElevationGradient } from "../ElevationGradient";
import { LoadingSpinner } from "../Loading";

interface RouteProps {
  route: Route;
}

export function RouteElevationChartPreview({ route }: RouteProps) {
  const { result: streams, error } = useAsync<
    Pick<StravaSegment, "altitude" | "distance">
  >(getStravaSegmentStreams, [route.stravaSegmentId, REQUIRED_STREAMS]);

  const data: Data[] | undefined = useMemo(() => {
    if (streams === undefined) {
      return;
    }

    const filteredData = streams.distance
      .map((distance, index) => ({
        distance: distance / 1_000,
        elevation: streams.altitude[index],
      }))
      .filter(
        (_d, index) =>
          index %
            Math.max(
              1,
              Math.floor(streams.distance.length / TARGET_RESOLUTION)
            ) ===
          0
      );
    // remove negative elevation
    const lowestElevation = Math.min(...filteredData.map((d) => d.elevation));
    return filteredData.map((d) => ({
      ...d,
      elevation: d.elevation - lowestElevation,
    }));
  }, [streams]);

  if (error) {
    return null;
  }

  if (!data) {
    return <LoadingSpinner small />;
  }

  return <ElevationChartPreview data={data} />;
}

interface SegmentProps {
  segment: Segment;
}

export function SegmentElevationChartPreview({ segment }: SegmentProps) {
  const { result: streams, error } = useAsync<
    Pick<StravaSegment, "altitude" | "distance">
  >(getStravaSegmentStreams, [segment.stravaSegmentId, REQUIRED_STREAMS]);

  const data: Data[] | undefined = useMemo(() => {
    if (streams === undefined) {
      return;
    }

    const filteredData = streams.distance
      .map((distance, index) => ({
        distance: distance / 1_000,
        elevation: streams.altitude[index],
      }))
      .filter(
        (_d, index) =>
          index %
            Math.max(
              1,
              Math.floor(streams.distance.length / TARGET_RESOLUTION)
            ) ===
          0
      );
    // remove negative elevation
    const lowestElevation = Math.min(...filteredData.map((d) => d.elevation));
    return filteredData.map((d) => ({
      ...d,
      elevation: d.elevation - lowestElevation,
    }));
  }, [streams]);

  if (error) {
    return null;
  }

  if (!data) {
    return <LoadingSpinner small />;
  }

  return <ElevationChartPreview data={data} />;
}

const REQUIRED_STREAMS = ["altitude", "distance"];

interface Data {
  distance: number;
  elevation: number;
}

// max width the chart will be rendered
const TARGET_RESOLUTION = 100;

interface Props {
  data: Data[];
}

function ElevationChartPreview({ data }: Props) {
  return (
    <AreaChart
      height={50}
      width={100}
      data={data}
      // @ts-ignore
      baseValue="dataMin"
      aria-hidden="true"
    >
      <defs>
        <ElevationGradient />
      </defs>

      <XAxis
        dataKey="distance"
        type="number"
        domain={[0, "dataMax"]}
        unit="km"
        hide={true}
      />

      <YAxis
        dataKey="elevation"
        type="number"
        allowDecimals={false}
        domain={[0, 750]}
        unit="m"
        hide={true}
      />

      <Area
        type="monotone"
        dataKey="elevation"
        name="Elevation"
        stroke={COLORS.regular}
        fillOpacity={1}
        fill="url(#colorElevation)"
        unit="m"
        isAnimationActive={false}
      />
    </AreaChart>
  );
}

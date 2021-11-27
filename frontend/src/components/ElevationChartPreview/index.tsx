import React, { useMemo } from "react";
import { useAsync } from "react-async-hook";
import { Area, AreaChart, XAxis, YAxis } from "recharts";
import { Route } from "zwift-data";
import { COLORS } from "../../constants";
import { getStravaSegmentStreams } from "../../services/StravaSegmentRepository";
import { StravaSegment } from "../../types";
import { ElevationGradient } from "../ElevationGradient";
import { LoadingSpinner } from "../Loading";

interface Props {
  route: Route;
}

const REQUIRED_STREAMS = ["altitude", "distance"];

// max width the chart will be rendered
const TARGET_RESOLUTION = 100;

export function ElevationChartPreview({ route }: Props) {
  const { result: segment, error } = useAsync<
    Pick<StravaSegment, "altitude" | "distance">
  >(getStravaSegmentStreams, [route.slug, "routes", REQUIRED_STREAMS]);

  const data: { distance: number; elevation: number }[] | undefined =
    useMemo(() => {
      if (segment === undefined) {
        return;
      }

      const filteredData = segment.distance
        .map((distance, index) => ({
          distance: distance / 1_000,
          elevation: segment.altitude[index],
        }))
        .filter(
          (_d, index) =>
            index %
              Math.max(
                1,
                Math.floor(segment.distance.length / TARGET_RESOLUTION)
              ) ===
            0
        );
      // remove negative elevation
      const lowestElevation = Math.min(...filteredData.map((d) => d.elevation));
      return filteredData.map((d) => ({
        ...d,
        elevation: d.elevation - lowestElevation,
      }));
    }, [segment]);

  if (error) {
    return null;
  }

  if (!data) {
    return <LoadingSpinner small />;
  }

  return (
    <AreaChart
      height={50}
      width={100}
      data={data}
      // @ts-ignore
      baseValue="dataMin"
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

import { CircularProgress } from "@react-md/progress";
import uniqWith from "lodash/uniqWith";
import React, { useMemo } from "react";
import { useAsync } from "react-async-hook";
import { Area, AreaChart, XAxis, YAxis } from "recharts";
import { getStravaSegmentStreams } from "../../services/StravaSegmentRepository";
import { Route, StravaSegment } from "../../types";
import { ElevationGradient } from "../ElevationGradient";

interface Props {
  route: Route;
}

const REQUIRED_STREAMS = ["altitude", "distance"];

export function ElevationChartPreview({ route }: Props) {
  const { result: segment } = useAsync<
    Pick<StravaSegment, "altitude" | "distance">
  >(getStravaSegmentStreams, [route.slug, 'routes', REQUIRED_STREAMS]);

  const data: any[] | undefined = useMemo(() => {
    if (segment === undefined) {
      return;
    }

    const filteredData = uniqWith(
      segment.distance.map((distance, index) => ({
        distance: Math.round(distance / 100) / 10,
        elevation: segment.altitude[index],
      })),
      (a, b) => a.distance === b.distance
    );

    // remove negative elevation
    const lowestElevation = Math.min(...filteredData.map((d) => d.elevation));
    return filteredData.map((d) => ({
      ...d,
      elevation: d.elevation - lowestElevation,
    }));
  }, [segment]);

  if (!data) {
    return (
      <CircularProgress
        id={`elevation-preview-${route.slug}`}
        small
        circleStyle={{ stroke: "black" }}
      />
    );
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
        stroke="black"
        fillOpacity={1}
        fill="url(#colorElevation)"
        unit="m"
        isAnimationActive={false}
      />
    </AreaChart>
  );
}

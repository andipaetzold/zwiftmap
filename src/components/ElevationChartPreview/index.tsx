import uniqWith from "lodash/uniqWith";
import React, { useMemo } from "react";
import { useAsync } from "react-async-hook";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { getStravaSegmentStreams } from "../../StravaSegmentRepository";
import { Route, StravaSegment } from "../../types";

interface Props {
  route: Route;
}

const REQUIRED_STREAMS = ["altitude", "distance"];

export function ElevationChartPreview({ route }: Props) {
  const { result: segment } = useAsync<
    Pick<StravaSegment, "altitude" | "distance">
  >(getStravaSegmentStreams, [route.slug, REQUIRED_STREAMS]);

  const data: any[] | undefined = useMemo(() => {
    if (segment === undefined) {
      return;
    }

    return uniqWith(
      segment.distance.map((distance, index) => ({
        distance: Math.round(distance / 100) / 10,
        elevation: segment.altitude[index],
      })),
      (a, b) => a.distance === b.distance
    );
  }, [segment]);

  if (!data) {
    return null;
  }

  return (
    <div style={{ width: "100%", height: 50, pointerEvents: "none" }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          // @ts-ignore
          baseValue="dataMin"
        >
          <defs>
            <linearGradient id="colorElevation" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="black" stopOpacity={0.8} />
              <stop offset="95%" stopColor="black" stopOpacity={0} />
            </linearGradient>
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
            domain={[0, "auto"]}
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
      </ResponsiveContainer>
    </div>
  );
}

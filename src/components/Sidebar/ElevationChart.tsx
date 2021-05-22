import uniqWith from "lodash/uniqWith";
import React, { useEffect, useMemo } from "react";
import { useAsync } from "react-async-hook";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import { getStravaSegmentStreams } from "../../services/StravaSegmentRepository";
import { Route, StravaSegment } from "../../types";
import { ElevationGradient } from "../ElevationGradient";

interface Props {
  route: Route;
  onMouseHoverDistanceChange: (distance: number | undefined) => void;
}

const REQUIRED_STREAMS = ["altitude", "distance"] as const;

export function ElevationChart({ route, onMouseHoverDistanceChange }: Props) {
  const { result: segment } = useAsync<
    Pick<StravaSegment, "altitude" | "distance">
  >(getStravaSegmentStreams, [route.slug, "routes", REQUIRED_STREAMS]);

  const data: any[] | undefined = useMemo(() => {
    if (segment === undefined) {
      return;
    }

    return uniqWith(
      segment.distance.map((distance, index) => ({
        distance: Math.round(distance / 10) / 100,
        elevation: segment.altitude[index],
      })),
      (a, b) => a.distance === b.distance
    );
  }, [segment]);

  if (data === undefined) {
    return null;
  }

  return (
    <div style={{ width: "100%", height: 100 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 25,
            right: 15,
            left: 15,
            bottom: 15,
          }}
          // @ts-ignore
          baseValue="dataMin"
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
            content={(props) => (
              <TooltipContent
                {...props}
                onMouseDistance={onMouseHoverDistanceChange}
              />
            )}
            isAnimationActive={false}
            position={{ y: 10 }}
            cursor={{ stroke: "black" }}
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

interface TooltipContentProps extends TooltipProps<any, any> {
  onMouseDistance: (distance: number | undefined) => void;
}

function TooltipContent(props: TooltipContentProps) {
  useEffect(() => {
    if (props.payload === undefined || props.payload.length === 0) {
      props.onMouseDistance(undefined);
    } else {
      props.onMouseDistance(props.label * 1_000);
    }
  }, [props]);

  return null;
}

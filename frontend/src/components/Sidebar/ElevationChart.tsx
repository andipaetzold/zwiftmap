import uniqWith from "lodash/uniqWith";
import React, { useEffect, useMemo, useState } from "react";
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
import { StravaSegment } from "../../types";
import { ElevationGradient } from "../ElevationGradient";
import { Text } from "@react-md/typography";
import { Distance } from "../Distance";
import { Elevation } from "../Elevation";
import { Route } from "zwift-data";

interface HoverData {
  distance: number;
  altitude: number;
}

interface Props {
  route: Route;
  onMouseHoverDistanceChange: (distance: number | undefined) => void;
}

const REQUIRED_STREAMS = ["altitude", "distance"] as const;

export function ElevationChart({ route, onMouseHoverDistanceChange }: Props) {
  const { result: segment } = useAsync<
    Pick<StravaSegment, "altitude" | "distance">
  >(getStravaSegmentStreams, [route.slug, "routes", REQUIRED_STREAMS]);

  const [hoverData, setHoverData] = useState<HoverData | undefined>(undefined);

  const handleMouseMove = (data?: HoverData) => {
    onMouseHoverDistanceChange(data?.distance);
    setHoverData(data);
  };

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
    <div style={{ width: "100%", height: 100, marginBottom: "1em" }}>
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
              <TooltipContent {...props} onMouseMove={handleMouseMove} />
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
      <div style={{ display: "flex", gap: "1em" }}>
        <Text type="caption" style={{ whiteSpace: "nowrap" }}>
          Distance:{" "}
          {hoverData?.distance ? (
            <Distance distance={hoverData.distance} />
          ) : (
            "- km"
          )}
        </Text>
        <Text type="caption" style={{ whiteSpace: "nowrap" }}>
          Altitude:{" "}
          {hoverData?.altitude ? (
            <Elevation elevation={hoverData.altitude} />
          ) : (
            "- m"
          )}
        </Text>
      </div>
    </div>
  );
}

interface TooltipContentProps extends TooltipProps<any, any> {
  onMouseMove: (distance: HoverData | undefined) => void;
}

function TooltipContent(props: TooltipContentProps) {
  useEffect(() => {
    if (props.payload === undefined || props.payload.length === 0) {
      props.onMouseMove(undefined);
    } else {
      props.onMouseMove({
        distance: props.payload[0].payload.distance,
        altitude: props.payload[0].payload.elevation,
      });
    }
  }, [props]);

  return null;
}

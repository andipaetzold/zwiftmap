import React, { useMemo } from "react";
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
import styles from "./ElevationChart.module.css";
import { getSegment } from "./SegmentRepository";
import { Route } from "./types";

interface Props {
  route: Route;
  onMouseHoverDistanceChange: (distance: number | undefined) => void;
}

export function ElevationChart({ route }: Props) {
  const { result: segment } = useAsync(getSegment, [route.slug]);

  const data: any[] | undefined = useMemo(() => {
    if (segment === undefined) {
      return;
    }

    return segment.distance.map((distance, index) => ({
      distance: distance / 1_000,
      elevation: segment.altitude[index],
    }));
  }, [segment]);

  if (data === undefined) {
    return null;
  }

  return (
    <div className={styles.Container}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          // @ts-ignore
          baseValue="dataMin"
        >
          <defs>
            <linearGradient id="colorElevation" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="black" stopOpacity={0.8} />
              <stop offset="95%" stopColor="black" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} />
          <XAxis
            name="Distance"
            dataKey="distance"
            type="number"
            allowDecimals={false}
            tickCount={10}
            domain={[0, "dataMax"]}
            unit="km"
          />

          <YAxis
            name="Elevation"
            type="number"
            allowDecimals={false}
            tickCount={5}
            domain={[0, "auto"]}
            unit="m"
          />
          <Tooltip
            content={TooltipContent}
            isAnimationActive={false}
            position={{ y: 0 }}
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

function TooltipContent(props: TooltipProps<any, any>) {
  if (props.payload === undefined || props.payload.length === 0) {
    return null;
  }

  return (
    <div
      className="recharts-default-tooltip"
      style={{
        margin: 0,
        padding: 10,
        backgroundColor: "#fff",
        border: "1px solid #ccc",
        whiteSpace: "nowrap",
      }}
    >
      <ul
        className="recharts-tooltip-item-list"
        style={{ padding: 0, margin: 0 }}
      >
        <li
          className="recharts-tooltip-item"
          style={{
            display: "block",
            paddingTop: 4,
            paddingBottom: 4,
            color: "#000",
          }}
        >
          <span className="recharts-tooltip-item-name">Distance</span>
          <span className="recharts-tooltip-item-separator">
            {props.separator}
          </span>
          <span
            className="recharts-tooltip-item-value"
            style={{ fontWeight: "bold" }}
          >
            {Math.round(props.label * 10) / 10}
          </span>
          <span
            className="recharts-tooltip-item-unit"
            style={{ fontWeight: "bold" }}
          >
            km
          </span>
        </li>

        <li
          className="recharts-tooltip-item"
          style={{
            display: "block",
            paddingTop: 4,
            paddingBottom: 4,
            color: "#000",
          }}
        >
          <span className="recharts-tooltip-item-name">
            {props.payload[0].name}
          </span>
          <span className="recharts-tooltip-item-separator">
            {props.separator}
          </span>
          <span
            className="recharts-tooltip-item-value"
            style={{ fontWeight: "bold" }}
          >
            {Math.round(
              props.payload[0].payload[props.payload[0].dataKey as string]
            )}
          </span>
          <span
            className="recharts-tooltip-item-unit"
            style={{ fontWeight: "bold" }}
          >
            {props.payload[0].unit}
          </span>
        </li>
      </ul>
    </div>
  );
}

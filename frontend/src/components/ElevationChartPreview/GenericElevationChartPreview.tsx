import { Area, AreaChart, XAxis, YAxis } from "recharts";
import { COLORS } from "../../constants";
import { ElevationGradient } from "../ElevationGradient";
import { Data } from "./types";

interface Props {
  data: Data[];
}

export function GenericElevationChartPreview({ data }: Props) {
  return (
    <AreaChart
      height={50}
      width={100}
      data={data}
      // @ts-expect-error Prop is missing in types
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

import turfDistance from "@turf/distance";
import { point as turfPoint } from "@turf/helpers";
import { useMemo } from "react";
import { LatLngAlt } from "../../../../types";
import { ElevationChart } from "../../../ElevationChart";

interface Props {
  stream: LatLngAlt[];
}

export function CustomRouteElevationChart({ stream }: Props) {
  const altitudeStream = useMemo(
    () => stream.map(([, , alt]) => alt),
    [stream],
  );
  const distanceStream = useMemo(
    () =>
      stream
        .map((latlng, index, array) =>
          index === 0
            ? 0
            : turfDistance(turfPoint(array[index - 1]), turfPoint(latlng), {
                units: "meters",
              }),
        )
        .reduce(
          (prev, cur, index) =>
            index === 0 ? [0] : [...prev, prev[prev.length - 1] + cur],
          [] as number[],
        ),
    [stream],
  );

  return (
    <ElevationChart
      altitudeStream={altitudeStream}
      distanceStream={distanceStream}
      segments={[]}
    />
  );
}

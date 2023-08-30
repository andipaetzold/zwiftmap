import turfDistance from "@turf/distance";
import { point as turfPoint } from "@turf/helpers";
import { useMemo } from "react";
import { worldConfigs } from "../../../../constants/worldConfigs";
import { LocationStateCustomRoute } from "../../../../services/location-state";
import { LatLngAlt } from "../../../../types";
import { dropAltitude } from "../../../../util/drop-altitude";
import { SurfaceListItem } from "../../../SurfaceListItem";

export interface Props {
  state: LocationStateCustomRoute;
  latLngStream: LatLngAlt[];
}

export function CustomRouteSurface({ state, latLngStream }: Props) {
  const distancStream = useMemo(
    () =>
      latLngStream
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
    [latLngStream],
  );

  return (
    <SurfaceListItem
      distancStream={distancStream}
      latLngStream={latLngStream.map(dropAltitude)}
      surfaces={worldConfigs[state.world.slug].surfaces}
    />
  );
}

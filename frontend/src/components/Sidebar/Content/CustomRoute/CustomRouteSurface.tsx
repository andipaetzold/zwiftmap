import turfDistance from "@turf/distance";
import { point as turfPoint } from "@turf/helpers";
import { useMemo } from "react";
import { worldConfigs } from "../../../../constants/worldConfigs";
import { LocationStateCustomRoute } from "../../../../services/location-state";
import { latLngToPosition } from "../../../../shared/coordinates";
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
            : turfDistance(
                turfPoint(
                  latLngToPosition([array[index - 1][0], array[index - 1][1]]),
                ),
                turfPoint(latLngToPosition([latlng[0], latlng[1]])),
                { units: "meters" },
              ),
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

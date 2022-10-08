import polyline from "@mapbox/polyline";
import bboxPolygon from "@turf/bbox-polygon";
import buffer from "@turf/buffer";
import difference from "@turf/difference";
import {
  Feature,
  lineString,
  MultiPolygon,
  Polygon as TurfPolygon,
} from "@turf/helpers";
import { useMemo } from "react";
import { Polygon, Rectangle } from "react-leaflet";
import { useStravaActivities } from "../../react-query";
import {
  LocationStateFog,
  useLocationState,
} from "../../services/location-state";
import { latLngToPosition, positionToLatLng } from "../../util/coordinates";
import { getWorld } from "../../util/strava";

const BUFFER_RADIUS = 0.05; // 50 m

const PATH_OPTIONS = { color: "black", stroke: false, fillOpacity: 0.5 };

interface Props {
  state: LocationStateFog;
}

export function Fog({ state }: Props) {
  const locationState = useLocationState();
  const { data: activities } = useStravaActivities();

  const fog = useMemo(() => {
    if (!activities) {
      return;
    }

    const boundsPolygon = bboxPolygon([
      state.world.bounds[0][1] - 1,
      state.world.bounds[0][0] + 1,
      state.world.bounds[1][1] + 1,
      state.world.bounds[1][0] - 1,
    ]);

    const multiOrSinglePolygon = activities
      .filter(
        (activity) =>
          getWorld(activity.start_latlng)?.id === locationState.world?.id
      )
      .map((activity) => polyline.decode(activity.map.summary_polyline))
      .map((stream) => stream.map(latLngToPosition))
      .map((stream) => lineString(stream))
      .map((line) => buffer(line, BUFFER_RADIUS, { units: "kilometers" }))
      .reduce((prev, cur) => {
        try {
          // Activities can never cover the whole map
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          return difference(prev, cur)!;
        } catch (e) {
          return prev;
        }
      }, boundsPolygon as Feature<TurfPolygon | MultiPolygon>);

    if (multiOrSinglePolygon.geometry.type === "Polygon") {
      return multiOrSinglePolygon.geometry.coordinates.map((polygon) =>
        polygon.map(positionToLatLng)
      );
    } else {
      return multiOrSinglePolygon.geometry.coordinates.map((multiPoly) =>
        multiPoly.map((polygon) => polygon.map(positionToLatLng))
      );
    }
  }, [activities, locationState.world?.id, state.world.bounds]);

  if (!fog) {
    return (
      <Rectangle
        interactive={false}
        bounds={state.world.bounds}
        pathOptions={PATH_OPTIONS}
      />
    );
  }

  return (
    <Polygon interactive={false} positions={fog} pathOptions={PATH_OPTIONS} />
  );
}

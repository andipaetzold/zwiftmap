import { LatLngTuple, Marker as LeafletMarker } from "leaflet";
import { range } from "lodash";
import { useCallback, useEffect } from "react";
import { useAsync } from "react-async-hook";
import { Marker, Polyline, useMapEvent } from "react-leaflet";
import { COLORS } from "../../constants";
import { LocationStateRouting, navigate } from "../../services/location-state";
import { worker } from "../../services/worker-client";
import { dropAltitude } from "../../util/drop-altitude";
import { POLYLINE_WIDTH } from "./constants";

interface Props {
  state: LocationStateRouting;
}

export function Routing({ state }: Props) {
  useMapEvent("click", async (e) => {
    if (
      state.points.filter((p) => p !== null).length >= 2 &&
      state.points[state.points.length - 1]
    ) {
      return;
    }

    const latlng = [e.latlng.lat, e.latlng.lng] as LatLngTuple;
    const snapped = await worker.snapPoint(latlng, state.world.slug);
    const snappedWithoutAltitude = dropAltitude(snapped.position);

    const index = state.points[0] ? state.points.length - 1 : 0;

    navigate({
      ...state,
      points: state.points.map((p, i) =>
        i === index ? snappedWithoutAltitude : p
      ),
    });
  });

  const updateMarker = useCallback(
    async (marker: LeafletMarker, pointIndex) => {
      const latlng = marker.getLatLng();
      const snapped = await worker.snapPoint(
        [latlng.lat, latlng.lng],
        state.world.slug
      );

      navigate({
        ...state,
        points: state.points.map((point, index) =>
          index === pointIndex ? dropAltitude(snapped.position) : point
        ),
      });
    },
    [state]
  );

  useEffect(() => {
    worker.fetchRoads(state.world.slug);
  }, [state.world.slug]);

  const { result: routes } = useAsync(
    async () => {
      const nonNullPoints = state.points.filter(
        (p): p is LatLngTuple => p !== null
      );

      if (nonNullPoints.length < 2) {
        return;
      }

      return await Promise.all(
        range(0, nonNullPoints.length - 1).map((index) =>
          worker.navigate(
            nonNullPoints[index],
            nonNullPoints[index + 1],
            state.world.slug
          )
        )
      );
    },
    [state.points, state.world.slug],
    { setLoading: (state) => ({ ...state, loading: true }) }
  );

  return (
    <>
      {state.points
        .filter((p): p is LatLngTuple => p !== null)
        .map((point, index) => (
          <Marker
            key={index}
            draggable
            position={point}
            eventHandlers={{ dragend: (e) => updateMarker(e.target, index) }}
          />
        ))}
      {routes?.map((route, routeIndex) => (
        <Polyline
          key={routeIndex}
          positions={route.map(dropAltitude)}
          interactive={false}
          pathOptions={{
            color: COLORS.route,
            weight: POLYLINE_WIDTH,
          }}
        />
      ))}
    </>
  );
}

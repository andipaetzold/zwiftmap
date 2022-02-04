import { LatLngTuple, Marker as LeafletMarker } from "leaflet";
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
    if (state.points.length >= 2) {
      return;
    }

    const latlng = [e.latlng.lat, e.latlng.lng] as LatLngTuple;
    const snapped = await worker.snapPoint(latlng, state.world.slug);
    if (!state.points[0]) {
      navigate({
        ...state,
        points: [dropAltitude(snapped.position)],
      });
    } else {
      navigate({
        ...state,
        points: [...state.points, dropAltitude(snapped.position)],
      });
    }
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

  const { result: route } = useAsync(
    async () => {
      if (state.points[0] === null || state.points[1] === null) {
        return;
      }

      return await worker.navigate(
        state.points[0],
        state.points[1],
        state.world.slug
      );
    },
    [state.points, state.world.slug],
    { setLoading: (state) => ({ ...state, loading: true }) }
  );

  return (
    <>
      {state.points[0] && (
        <Marker
          draggable
          position={state.points[0]}
          eventHandlers={{
            dragend: (e) => updateMarker(e.target, 0),
          }}
        />
      )}
      {state.points[1] && (
        <Marker
          draggable
          position={state.points[1]}
          eventHandlers={{
            dragend: (e) => updateMarker(e.target, 1),
          }}
        />
      )}
      {route && (
        <Polyline
          positions={route.map((p) => [p[0], p[1]])}
          interactive={false}
          pathOptions={{
            color: COLORS.route,
            weight: POLYLINE_WIDTH,
          }}
        />
      )}
    </>
  );
}

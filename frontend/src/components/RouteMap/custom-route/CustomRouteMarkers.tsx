import { LatLngTuple, Marker as LeafletMarker } from "leaflet";
import { useCallback } from "react";
import {
  LocationStateCustomRoute,
  navigate,
} from "../../../services/location-state";
import { worker } from "../../../services/worker-client";
import { dropAltitude } from "../../../util/drop-altitude";
import { PlaceMarker } from "../../PlaceMarker";

interface Props {
  state: LocationStateCustomRoute;
}

export function CustomRouteMarkers({ state }: Props) {
  const updateMarker = useCallback(
    async (marker: LeafletMarker, pointIndex: number) => {
      const latlng = marker.getLatLng();
      const snapped = await worker.snapPoint(
        [latlng.lat, latlng.lng],
        state.world.slug,
      );

      navigate({
        ...state,
        points: state.points.map((point, index) =>
          index === pointIndex ? dropAltitude(snapped.position) : point,
        ),
      });
    },
    [state],
  );

  return (
    <>
      {state.points
        .filter((p): p is LatLngTuple => p !== null)
        .map((point, index) => {
          return (
            <PlaceMarker
              key={index}
              draggable
              position={point}
              eventHandlers={{ dragend: (e) => updateMarker(e.target, index) }}
              label={`${index + 1}`}
            />
          );
        })}
    </>
  );
}

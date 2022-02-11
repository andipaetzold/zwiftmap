import { Icon, LatLngTuple, Marker as LeafletMarker } from "leaflet";
import { useCallback } from "react";
import { Marker } from "react-leaflet";
import {
  LocationStateRouting,
  navigate,
} from "../../../services/location-state";
import { worker } from "../../../services/worker-client";
import { dropAltitude } from "../../../util/drop-altitude";
import { getMarkerIconAsDataUrl } from "../../MarkerIcon";

interface Props {
  state: LocationStateRouting;
}

export function RoutingMarkers({ state }: Props) {
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

  return (
    <>
      {state.points
        .filter((p): p is LatLngTuple => p !== null)
        .map((point, index) => {
          const icon = new Icon({
            iconUrl: getMarkerIconAsDataUrl(index + 1),
            iconRetinaUrl: undefined,
            shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
            iconSize: [31, 48],
            iconAnchor: [31 / 2, 48],
            shadowSize: [41, 41],
          });
          return (
            <Marker
              key={index}
              draggable
              position={point}
              eventHandlers={{ dragend: (e) => updateMarker(e.target, index) }}
              icon={icon}
            />
          );
        })}
    </>
  );
}

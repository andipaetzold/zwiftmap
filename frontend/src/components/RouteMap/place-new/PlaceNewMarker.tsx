import { LatLngTuple, Marker as LeafletMarker } from "leaflet";
import { useCallback, useEffect, useState } from "react";
import { useWorldPlace } from "../../../react-query";
import { emitter } from "../../../services/emitter";
import {
  LocationStatePlaceEdit,
  LocationStatePlaceNew,
} from "../../../services/location-state";
import { PlaceMarker } from "../../PlaceMarker";

interface Props {
  state: LocationStatePlaceEdit | LocationStatePlaceNew;
}

export function PlaceNewMarker({ state }: Props) {
  const { data: place } = useWorldPlace(
    state.world.slug,
    state.type === "place-edit" ? state.placeId : undefined,
  );

  const [position, setPosition] = useState<LatLngTuple | null>(
    place?.position ?? null,
  );
  useEffect(() => {
    const listener = (pos: LatLngTuple) => setPosition(pos);
    emitter.on("placeMarkerMove", listener);
    return () => emitter.off("placeMarkerMove", listener);
  }, []);

  const updateMarker = useCallback(async (marker: LeafletMarker) => {
    const latlng = marker.getLatLng();
    emitter.emit("placeMarkerMove", [latlng.lat, latlng.lng]);
  }, []);

  return (
    <>
      {position && (
        <PlaceMarker
          draggable
          position={position}
          eventHandlers={{ dragend: (e) => updateMarker(e.target) }}
        />
      )}
    </>
  );
}

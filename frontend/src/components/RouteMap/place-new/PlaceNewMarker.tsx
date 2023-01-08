import { LatLngTuple, Marker as LeafletMarker } from "leaflet";
import { useCallback, useEffect, useState } from "react";
import { emitter } from "../../../services/emitter";
import { PlaceMarker } from "../../PlaceMarker";

export function PlaceNewMarker() {
  const [position, setPosition] = useState<LatLngTuple | null>(null);
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

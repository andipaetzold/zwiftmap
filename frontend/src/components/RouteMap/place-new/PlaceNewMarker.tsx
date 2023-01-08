import { Icon, LatLngTuple, Marker as LeafletMarker } from "leaflet";
import { useCallback, useEffect, useState } from "react";
import { Marker } from "react-leaflet";
import { emitter } from "../../../services/emitter";
import { getMarkerIconAsDataUrl } from "../../MarkerIcon";
import shadowUrl from "./marker-shadow.png";

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
        <Marker
          draggable
          position={position}
          eventHandlers={{ dragend: (e) => updateMarker(e.target) }}
          icon={icon}
        />
      )}
    </>
  );
}
const icon = new Icon({
  iconUrl: getMarkerIconAsDataUrl(),
  iconRetinaUrl: undefined,
  shadowUrl,
  iconSize: [26.5, 41],
  iconAnchor: [26.5 / 2, 41],
  shadowSize: [41, 41],
});

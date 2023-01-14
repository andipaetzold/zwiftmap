import { LatLngTuple } from "leaflet";
import { useMapEvent } from "react-leaflet";
import { emitter } from "../../../services/emitter";
import { LocationState } from "../../../services/location-state";

export function usePlaceNewMarkerMove(state: LocationState) {
  useMapEvent("click", async (e) => {
    if (state.type !== "place-new") {
      return;
    }

    const latlng = [e.latlng.lat, e.latlng.lng] as LatLngTuple;
    emitter.emit("placeMarkerMove", latlng);
  });
}

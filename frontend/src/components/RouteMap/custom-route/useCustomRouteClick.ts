import { LatLngTuple } from "leaflet";
import { useMapEvent } from "react-leaflet";
import { LocationState, navigate } from "../../../services/location-state";
import { worker } from "../../../services/worker-client";
import { dropAltitude } from "../../../util/drop-altitude";

export function useCustomRouteClick(state: LocationState) {
  useMapEvent("click", async (e) => {
    if (state.type !== "custom-route") {
      return;
    }

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
        i === index ? snappedWithoutAltitude : p,
      ),
    });
  });
}

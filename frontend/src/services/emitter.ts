import { LatLngTuple } from "leaflet";
import mitt from "mitt";

type Events = {
  placeMarkerMove: LatLngTuple;
};

export const emitter = mitt<Events>();

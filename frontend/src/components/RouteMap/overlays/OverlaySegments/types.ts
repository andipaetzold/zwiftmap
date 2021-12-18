import { LatLngTuple } from "leaflet";

export interface Section {
  latlng: LatLngTuple[];
  type: "regular" | "sprint" | "climb";
}

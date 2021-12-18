import { LatLngStream } from "../../../../types";

export interface Section {
  latlng: LatLngStream;
  type: "regular" | "sprint" | "climb";
}

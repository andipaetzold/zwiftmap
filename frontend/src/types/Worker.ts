import type { LatLngTuple } from "leaflet";
import { LatLngAlt } from "./LatLngAlt";

export interface ComlinkWorker {
  navigate(from: LatLngTuple, to: LatLngTuple): Promise<LatLngAlt[]>;
}

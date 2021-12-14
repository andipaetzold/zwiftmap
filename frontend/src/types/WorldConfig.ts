import { LatLngTuple } from "leaflet";
import { SurfaceType } from "./Surface";

export interface WorldConfig {
  initialBounds: [LatLngTuple, LatLngTuple];
  image: string;
  backgroundColor: string;
  surfaces: WorldConfigSuraface[];
}

export interface WorldConfigSuraface {
  type: SurfaceType;
  polygon: LatLngTuple[];
}

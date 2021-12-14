import { LatLngTuple } from "leaflet";
import { SurfaceType } from "./Surface";

export interface WorldConfig {
  initialBounds: [LatLngTuple, LatLngTuple];
  image: string;
  backgroundColor: string;
  surfaces: WorldConfigSurface[];
}

export interface WorldConfigSurface {
  type: SurfaceType;
  polygon: LatLngTuple[];
}

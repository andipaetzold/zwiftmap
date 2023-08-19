import type { LatLngTuple } from "leaflet";
import { WorldSlug } from "zwift-data";
import { SnappedPoint } from "../shared/roads";
import { LatLngAlt } from "./LatLngAlt";

export interface ComlinkWorker {
  navigate(
    from: LatLngTuple,
    to: LatLngTuple,
    worldSlug: WorldSlug,
  ): Promise<LatLngAlt[]>;
  snapPoint(point: LatLngTuple, worldSlug: WorldSlug): Promise<SnappedPoint>;
  fetchRoads(worldSlug: WorldSlug): Promise<void>;
}

import { LatLngTuple } from "leaflet";
import { WorldSlug } from "zwift-data";
import { BACKEND_HOST } from "../config";

export function getShareImageUrl(shareId: string): string {
  return `${BACKEND_HOST}/share/${shareId}/image?width=1920&height=1080`;
}

export function getFogImageUrl(world: WorldSlug): string {
  return `${BACKEND_HOST}/strava/fog/${world}/image?size=1000`;
}

export function getCustomRouteImageUrl(points: LatLngTuple[]): string {
  const searchParams = new URLSearchParams();
  searchParams.set("width", "1920");
  searchParams.set("height", "1080");
  searchParams.set("points", points.join("!"));
  return `${BACKEND_HOST}/custom-route/image?${searchParams.toString()}`;
}

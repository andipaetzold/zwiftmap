import { WorldSlug } from "zwift-data";
import { BACKEND_HOST } from "../config";

export function getShareImageUrl(shareId: string): string {
  return `${BACKEND_HOST}/share/${shareId}/image?width=1920&height=1080`;
}

export function getFogImageUrl(world: WorldSlug): string {
  return `${BACKEND_HOST}/strava/fog/${world}/image?size=1000`;
}

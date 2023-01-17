import { WorldSlug } from "zwift-data";

export const queries = {
  authStatus: ["auth"] as const,
  authStravaSettings: ["auth", "strava-settings"] as const,
  events: ["events"] as const,
  event: (eventId: number | undefined) => ["events", eventId] as const,
  stravaFogGeoJSON: (world: WorldSlug) =>
    ["strava", "fog", world, "geojson"] as const,
  stravaFogStats: (world: WorldSlug) =>
    ["strava", "fog", world, "stats"] as const,
  worldRoads: (world: WorldSlug) => ["worlds", world, "roads"] as const,
  worldRoadsBuffered: (world: WorldSlug) =>
    ["worlds", world, "roads-buffered"] as const,
  placesBase: ["places"] as const,
  places: (verified: boolean | undefined) => ["places", { verified }] as const,
  worlds: ["worlds"] as const,
  worldPlacesBase: (world: WorldSlug) => ["worlds", world, "places"] as const,
  worldPlaces: (world: WorldSlug, verified: boolean | undefined) =>
    ["worlds", world, "places", { verified }] as const,
  worldPlace: (world: WorldSlug, placeId: string) =>
    ["worlds", world, "places", placeId] as const,
};

export const PATTERN_EVENT =
  /^\/events\/(?<eventId>\d+)(\/(?<subgroupLabel>[ABCDE]))?$/;
export const PATTERN_STRAVA_ACTIVITY =
  /^\/strava-activities\/(?<stravaActivityId>\d+)$/;
export const PATTERN_SHARED_ITEM = /^\/s\/(?<shareId>.+)$/;
export const PATTERN_ROUTE_OR_SEGMENT =
  /^\/(?<worldSlug>.+)\/(?<routeOrSegmentSlug>.+)$/;
export const PATTERN_WORLD = /^\/(?<worldSlug>.+)$/;
export const PATTERN_CUSTOM_ROUTE =
  /^\/(?<worldSlug>.+)\/(custom-route|routing)$/;
export const PATTERN_FOG = /^\/(?<worldSlug>.+)\/fog$/;
export const PATTERN_PLACE_NEW = /^\/(?<worldSlug>.+)\/places\/new$/;
export const PATTERN_PLACE_EDIT =
  /^\/(?<worldSlug>.+)\/places\/(?<placeId>.+)\/edit$/;
export const PATTERN_PLACE = /^\/(?<worldSlug>.+)\/places\/(?<placeId>.+)$/;

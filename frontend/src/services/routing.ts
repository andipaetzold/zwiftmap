export const PATTERN_EVENT = /^\/events\/(?<eventId>\d+)$/;
export const PATTERN_STRAVA_ACTIVITY =
  /^\/strava-activities\/(?<stravaActivityId>\d+)$/;
export const PATTERN_SHARED_ITEM = /^\/s\/(?<shareId>.+)$/;
export const PATTERN_ROUTE_OR_SEGMENT =
  /^\/(?<worldSlug>.+)\/(?<routeOrSegmentSlug>.+)$/;
export const PATTERN_WORLD = /^\/(?<worldSlug>.+)$/;
export const PATTERN_CUSTOM_ROUTE = /^\/(?<worldSlug>.+)\/(custom-route|routing)$/;

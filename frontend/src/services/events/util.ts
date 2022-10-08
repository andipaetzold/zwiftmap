import { range } from "lodash-es";
import { Route, routes, World, worlds } from "zwift-data";
import { DistanceStream, ZwiftEvent } from "../../types";

type Stream = "altitude" | "latlng" | "distance";

export function getWorldFromEvent(event: ZwiftEvent): World | undefined {
  const route = routes.find((r) => r.id === event.routeId);
  return worlds.find((w) => w.slug === route?.world || w.id === event.mapId);
}

export function getRouteFromEvent(event: ZwiftEvent): Route | undefined {
  return routes.find((r) => r.id === event.routeId);
}

export function adjustStreamForEvent<T>(
  event: ZwiftEvent,
  distanceStream: DistanceStream,
  stream: T[]
): T[] | undefined {
  const route = getRouteFromEvent(event);
  if (!route?.stravaSegmentId) {
    return undefined;
  }

  const distance = event.distanceInMeters / 1_000 - (route.leadInDistance ?? 0);

  // Some events have wrong distances (e.g. 1m)
  if (distance < 0) {
    return stream;
  }

  const adjustedStream: T[] = [];

  if (route.lap) {
    const laps = Math.floor(distance / route.distance);
    for (const _ of range(0, laps)) {
      adjustedStream.push(...stream);
    }
  }

  const remainingDistance = route.lap ? distance % route.distance : distance;
  const finishIndex = distanceStream.findIndex(
    (d) => d / 1_000 > remainingDistance
  );

  adjustedStream.push(...adjustedStream.slice(0, finishIndex));
  return adjustedStream;
}

export function getEventDistance(event: ZwiftEvent): number | undefined {
  const route = getRouteFromEvent(event);

  if (event.distanceInMeters) {
    return event.distanceInMeters / 1_000;
  } else if (route && event.laps > 0) {
    return event.laps * route.distance + (route.leadInDistance ?? 0);
  }
}

export function getEventElevation(event: ZwiftEvent): number | undefined {
  const route = getRouteFromEvent(event);
  if (route && event.laps > 0) {
    return event.laps * route.elevation + (route.leadInElevation ?? 0);
  }
}

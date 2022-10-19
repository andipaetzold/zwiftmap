import range from "lodash-es/range";
import { Route, routes, World, worlds } from "zwift-data";
import { DistanceStream, PaceType, ZwiftEvent } from "../../types";

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

  adjustedStream.push(...stream.slice(0, finishIndex));
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

const PACE_NUMER_FORMAT = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});
export function getEventPaceRangeAsString(event: ZwiftEvent): string | null {
  if (event.eventSubgroups.length === 0) {
    return null;
  }

  if (event.eventSubgroups.some((g) => g.paceType !== PaceType.WKG)) {
    return null;
  }

  const paceFrom = Math.min(
    ...event.eventSubgroups.map((g) => g.fromPaceValue)
  );
  const paceTo = Math.max(...event.eventSubgroups.map((g) => g.toPaceValue));

  if (paceFrom === paceTo) {
    return `${PACE_NUMER_FORMAT.format(paceFrom)} W/kg`;
  } else {
    // TODO: use formatRange once supported
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/formatRange
    return `${PACE_NUMER_FORMAT.format(paceFrom)} – ${PACE_NUMER_FORMAT.format(
      paceTo
    )} W/kg`;
  }
}

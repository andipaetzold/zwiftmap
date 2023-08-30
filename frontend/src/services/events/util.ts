import range from "lodash-es/range";
import { Route, routes, World, worlds } from "zwift-data";
import {
  DistanceStream,
  EventSubgroup,
  PaceType,
  Units,
  ZwiftEvent,
} from "../../types";

export function getWorldFromEvent(
  eventOrGroup: ZwiftEvent | EventSubgroup,
): World | undefined {
  const route = routes.find((r) => r.id === eventOrGroup.routeId);
  return worlds.find(
    (w) => w.slug === route?.world || w.id === eventOrGroup.mapId,
  );
}

export function getRouteFromEvent(
  eventOrGroup: ZwiftEvent | EventSubgroup,
): Route | undefined {
  return routes.find((r) => r.id === eventOrGroup.routeId);
}

export function adjustStreamForEvent<T>(
  event: ZwiftEvent,
  distanceStream: DistanceStream,
  stream: T[],
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
    (d) => d / 1_000 > remainingDistance,
  );

  adjustedStream.push(...stream.slice(0, finishIndex));
  return adjustedStream;
}

export function getEventDistance(
  eventOrGroup: ZwiftEvent | EventSubgroup,
): number | undefined {
  const route = getRouteFromEvent(eventOrGroup);

  if (eventOrGroup.distanceInMeters) {
    return eventOrGroup.distanceInMeters / 1_000;
  } else if (route && eventOrGroup.laps > 0) {
    return eventOrGroup.laps * route.distance + (route.leadInDistance ?? 0);
  }
}

export function getEventElevation(
  eventOrGroup: ZwiftEvent | EventSubgroup,
): number | undefined {
  const route = getRouteFromEvent(eventOrGroup);
  if (route && eventOrGroup.laps > 0) {
    return eventOrGroup.laps * route.elevation + (route.leadInElevation ?? 0);
  }
}

const PACE_NUMER_FORMAT = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});
export function getEventPaceRangeAsString(
  event: ZwiftEvent,
  units: Units,
): string | undefined {
  if (event.eventSubgroups.length === 0) {
    return;
  }

  if (event.eventSubgroups.some((g) => g.paceType !== PaceType.WKG)) {
    return;
  }

  const paceFrom = Math.min(
    ...event.eventSubgroups.map((g) => g.fromPaceValue),
  );
  const paceTo = Math.max(...event.eventSubgroups.map((g) => g.toPaceValue));

  return formatEventPace(PaceType.WKG, paceFrom, paceTo, units);
}

export function formatEventPace(
  type: PaceType,
  from: number,
  to: number,
  units: Units,
): string | undefined {
  if (from === 0 && to === 0) {
    return undefined;
  }

  const unit =
    type === PaceType.WKG ? "W/kg" : units === "imperial" ? "mp/h" : "km/h";

  const fromConverted = units === "imperial" ? from / 1.609 : from;
  const toConverted = units === "imperial" ? to / 1.609 : to;

  if (from === to) {
    return `${PACE_NUMER_FORMAT.format(fromConverted)} ${unit}`;
  } else {
    // TODO: use formatRange once supported
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/formatRange
    return `${PACE_NUMER_FORMAT.format(
      fromConverted,
    )} – ${PACE_NUMER_FORMAT.format(toConverted)} ${unit}`;
  }
}

export function getSubgroupFromEvent(
  event: ZwiftEvent,
  subgroupLabel: string | null,
): EventSubgroup | undefined {
  return (
    event.eventSubgroups.find((g) => g.subgroupLabel === subgroupLabel) ??
    (event.eventSubgroups[0] as EventSubgroup | undefined)
  );
}

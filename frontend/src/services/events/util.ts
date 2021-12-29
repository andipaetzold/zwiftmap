import { fromPairs, range } from "lodash";
import { Route, routes, World, worlds } from "zwift-data";
import { StravaSegment } from "../../types";
import { getStravaSegmentStreams } from "../StravaSegmentRepository";
import { ZwiftEvent } from "./types";

export function getWorldFromEvent(event: ZwiftEvent): World | undefined {
  const route = routes.find((r) => r.id === event.routeId);
  return worlds.find((w) => w.slug === route?.world || w.id === event.mapId);
}

export function getRouteFromEvent(event: ZwiftEvent): Route | undefined {
  return routes.find((r) => r.id === event.routeId);
}

export async function getEventStreams<
  StreamType extends "altitude" | "latlng" | "distance"
>(
  event: ZwiftEvent,
  streamTypes: ReadonlyArray<StreamType>
): Promise<Pick<StravaSegment, StreamType> | undefined> {
  const route = getRouteFromEvent(event);
  if (!route || !route.stravaSegmentId) {
    return undefined;
  }
  const streamTypesToFetch = [...streamTypes, "distance" as const];
  const streams = await getStravaSegmentStreams(
    route.slug,
    "routes",
    streamTypesToFetch
  );

  if (!event.distanceInMeters) {
    return streams;
  }

  // @ts-ignore
  const adjustedStreams: Pick<StravaSegment, StreamType | "distance"> =
    fromPairs(streamTypes.map((type) => [type, []]));

  const distance = event.distanceInMeters / 1_000 - (route.leadInDistance ?? 0);
  const laps = Math.floor(distance / route.distance);
  range(0, laps).forEach(() => {
    for (let streamType of streamTypes) {
      adjustedStreams[streamType].push(
        // @ts-ignore
        ...streams[streamType]
      );
    }
  });

  const remainingDistance = distance % route.distance;
  const finishIndex = streams.distance.findIndex(
    (d) => d / 1_000 > remainingDistance
  );
  for (let streamType of streamTypes) {
    adjustedStreams[streamType].push(
      // @ts-ignore
      ...streams[streamType].slice(0, finishIndex)
    );
  }

  return adjustedStreams;
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

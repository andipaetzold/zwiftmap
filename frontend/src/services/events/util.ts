import { Route, routes, World, worlds } from "zwift-data";
import { ZwiftEvent } from "./types";

export function getWorldFromEvent(event: ZwiftEvent): World | undefined {
  const route = routes.find((r) => r.id === event.routeId);
  return worlds.find((w) => w.slug === route?.world || w.id === event.mapId);
}

export function getRouteFromEvent(event: ZwiftEvent): Route | undefined {
  return routes.find((r) => r.id === event.routeId);
}

import { SimpleListItem } from "@react-md/list";
import {
  AssessmentSVGIcon,
  EventSVGIcon,
  LandscapeSVGIcon,
  MapSVGIcon,
  PlaceSVGIcon,
  RefreshSVGIcon,
  SpaceBarSVGIcon,
  TimerSVGIcon,
} from "@react-md/material-icons";
import round from "lodash/round";
import { routes } from "zwift-data";
import {
  getRouteFromEvent,
  getWorldFromEvent,
  ZwiftEvent,
} from "../../../../services/events";
import { EVENT_TYPES } from "../../../../services/events/constants";
import { Distance } from "../../../Distance";
import { Elevation } from "../../../Elevation";
import { ListItemState } from "../../../ListItemState";

const FORMAT = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  weekday: "short",
});

interface Props {
  event: ZwiftEvent;
}

export function EventFacts({ event }: Props) {
  const route = getRouteFromEvent(event);
  const world = getWorldFromEvent(event);

  const distance = getDistance(event);
  const elevation = getElevation(event);

  return (
    <>
      <SimpleListItem
        clickable={false}
        leftAddon={<EventSVGIcon />}
        leftAddonType="icon"
      >
        <time dateTime={event.eventStart ?? ""}>
          {event.eventStart
            ? FORMAT.format(Date.parse(event.eventStart))
            : "Unknown"}
        </time>
      </SimpleListItem>
      <SimpleListItem
        clickable={false}
        leftAddon={<AssessmentSVGIcon />}
        leftAddonType="icon"
      >
        {EVENT_TYPES[event.eventType]}
      </SimpleListItem>
      {event.durationInSeconds > 0 && (
        <SimpleListItem clickable={false} leftAddon={<TimerSVGIcon />}>
          {round(event.durationInSeconds) / 60}min
        </SimpleListItem>
      )}
      {distance && (
        <SimpleListItem clickable={false} leftAddon={<SpaceBarSVGIcon />}>
          <Distance distance={distance} />{" "}
          {event.laps > 1 && route ? (
            <>
              (<Distance distance={route.distance} /> per Lap)
            </>
          ) : null}
        </SimpleListItem>
      )}
      {elevation && (
        <SimpleListItem clickable={false} leftAddon={<LandscapeSVGIcon />}>
          <Elevation elevation={elevation} />{" "}
          {event.laps > 1 && route ? (
            <>
              (<Elevation elevation={route.elevation} /> per Lap)
            </>
          ) : null}
        </SimpleListItem>
      )}
      {event.laps > 0 && (
        <SimpleListItem clickable={false} leftAddon={<RefreshSVGIcon />}>
          {event.laps === 1 ? "1 Lap" : `${event.laps} Laps`}
        </SimpleListItem>
      )}
      {route && world && (
        <ListItemState
          state={{
            type: "route",
            route: route,
            segments: [],
            world: world,
          }}
          leftAddon={<PlaceSVGIcon />}
          leftAddonType="icon"
        >
          {route.name}
        </ListItemState>
      )}
      {world && (
        <SimpleListItem
          clickable={false}
          leftAddon={<MapSVGIcon />}
          leftAddonType="icon"
        >
          {world.name}
        </SimpleListItem>
      )}
    </>
  );
}

function getDistance(event: ZwiftEvent): number | undefined {
  const route = routes.find((r) => r.id === event.routeId);

  if (event.distanceInMeters) {
    return event.distanceInMeters;
  } else if (route && event.laps > 0) {
    return event.laps * route.distance + (route.leadInDistance ?? 0);
  }
}

function getElevation(event: ZwiftEvent): number | undefined {
  const route = routes.find((r) => r.id === event.routeId);
  if (route && event.laps > 0) {
    return event.laps * route.elevation + (route.leadInElevation ?? 0);
  }
}

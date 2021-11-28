import { SimpleListItem } from "@react-md/list";
import {
  AssessmentFontIcon,
  EventFontIcon,
  LandscapeFontIcon,
  MapFontIcon,
  PlaceFontIcon,
  RefreshFontIcon,
  SpaceBarFontIcon,
  TimerFontIcon,
} from "@react-md/material-icons";
import round from "lodash/round";
import { routes, worlds } from "zwift-data";
import { ZwiftEvent } from "../../../../services/events";
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
  const route = routes.find((r) => r.id === event.routeId);
  const world = worlds.find((w) => w.id === event.mapId);

  const distance = getDistance(event);
  const elevation = getElevation(event);

  return (
    <>
      <SimpleListItem
        clickable={false}
        leftAddon={<EventFontIcon />}
        leftAddonType="icon"
      >
        {event.eventStart
          ? FORMAT.format(Date.parse(event.eventStart))
          : "Unknown"}
      </SimpleListItem>
      <SimpleListItem
        clickable={false}
        leftAddon={<AssessmentFontIcon />}
        leftAddonType="icon"
      >
        {EVENT_TYPES[event.eventType]}
      </SimpleListItem>
      {event.durationInSeconds > 0 && (
        <SimpleListItem clickable={false} leftAddon={<TimerFontIcon />}>
          {round(event.durationInSeconds) / 60}min
        </SimpleListItem>
      )}
      {distance && (
        <SimpleListItem clickable={false} leftAddon={<SpaceBarFontIcon />}>
          <Distance distance={distance} />{" "}
          {event.laps > 1 && route ? (
            <>
              (<Distance distance={route.distance} /> per Lap)
            </>
          ) : null}
        </SimpleListItem>
      )}
      {elevation && (
        <SimpleListItem clickable={false} leftAddon={<LandscapeFontIcon />}>
          <Elevation elevation={elevation} />{" "}
          {event.laps > 1 && route ? (
            <>
              (<Elevation elevation={route.elevation} /> per Lap)
            </>
          ) : null}
        </SimpleListItem>
      )}
      {event.laps > 0 && (
        <SimpleListItem clickable={false} leftAddon={<RefreshFontIcon />}>
          {event.laps === 1 ? "1 Lap" : `${event.laps} Laps`}
        </SimpleListItem>
      )}
      {route && (
        <ListItemState
          state={{
            type: "route",
            route: route,
            segments: [],
            world: world!,
          }}
          leftAddon={<PlaceFontIcon />}
          leftAddonType="icon"
        >
          {route.name}
        </ListItemState>
      )}
      {world && (
        <SimpleListItem
          clickable={false}
          leftAddon={<MapFontIcon />}
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

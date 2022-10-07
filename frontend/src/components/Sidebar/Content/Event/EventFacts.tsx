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
import round from "lodash-es/round";
import {
  EVENT_TYPES,
  getEventDistance,
  getEventElevation,
  getRouteFromEvent,
  getWorldFromEvent,
} from "../../../../services/events";
import { ZwiftEvent } from "../../../../types";
import { formatEventStart } from "../../../../util/formats";
import { Distance } from "../../../Distance";
import { Elevation } from "../../../Elevation";
import { ListItemState } from "../../../ListItemState";

interface Props {
  event: ZwiftEvent;
}

export function EventFacts({ event }: Props) {
  const route = getRouteFromEvent(event);
  const world = getWorldFromEvent(event);

  const distance = getEventDistance(event);
  const elevation = getEventElevation(event);

  return (
    <>
      <SimpleListItem leftAddon={<EventSVGIcon />} leftAddonType="icon">
        <time dateTime={event.eventStart}>{formatEventStart(event)}</time>
      </SimpleListItem>
      <SimpleListItem leftAddon={<AssessmentSVGIcon />} leftAddonType="icon">
        {EVENT_TYPES[event.eventType]}
      </SimpleListItem>
      {event.durationInSeconds > 0 && (
        <SimpleListItem leftAddon={<TimerSVGIcon />}>
          {round(event.durationInSeconds) / 60}min
        </SimpleListItem>
      )}
      {distance && (
        <SimpleListItem leftAddon={<SpaceBarSVGIcon />}>
          <Distance distance={distance} />
          {event.laps > 1 && route ? (
            <small>
              &nbsp;(
              <Distance distance={route.distance} />
              &nbsp;per Lap)
            </small>
          ) : null}
        </SimpleListItem>
      )}
      {elevation && (
        <SimpleListItem leftAddon={<LandscapeSVGIcon />}>
          <Elevation elevation={elevation} />
          {event.laps > 1 && route ? (
            <small>
              &nbsp;(
              <Elevation elevation={route.elevation} />
              &nbsp;per Lap)
            </small>
          ) : null}
        </SimpleListItem>
      )}
      {event.laps > 0 && (
        <SimpleListItem leftAddon={<RefreshSVGIcon />}>
          {event.laps === 1 ? "1 Lap" : `${event.laps} Laps`}
        </SimpleListItem>
      )}
      {route && world && (
        <ListItemState
          state={{ type: "route", route: route, world: world }}
          leftAddon={<PlaceSVGIcon />}
          leftAddonType="icon"
        >
          {route.name}
        </ListItemState>
      )}
      {world && (
        <SimpleListItem leftAddon={<MapSVGIcon />} leftAddonType="icon">
          {world.name}
        </SimpleListItem>
      )}
    </>
  );
}

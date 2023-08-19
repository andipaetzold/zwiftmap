import { SimpleListItem } from "@react-md/list";
import {
  AssessmentSVGIcon,
  EventSVGIcon,
  LandscapeSVGIcon,
  MapSVGIcon,
  PlaceSVGIcon,
  RefreshSVGIcon,
  SpaceBarSVGIcon,
  TimelineSVGIcon,
  TimerSVGIcon,
} from "@react-md/material-icons";
import round from "lodash-es/round";
import { useSettings } from "../../../../hooks/useSettings";
import {
  EVENT_TYPES,
  formatEventPace,
  getEventDistance,
  getEventElevation,
  getRouteFromEvent,
  getWorldFromEvent,
} from "../../../../services/events";
import { EventSubgroup, ZwiftEvent } from "../../../../types";
import { formatEventSubgroupStart } from "../../../../util/formats";
import { Distance } from "../../../Distance";
import { Elevation } from "../../../Elevation";
import { ListItemState } from "../../../ListItemState";

interface Props {
  event: ZwiftEvent;
  subgroup: EventSubgroup | undefined;
}

export function EventFacts({ event, subgroup }: Props) {
  const eventOrSubgroup = subgroup ?? event;

  const route = getRouteFromEvent(eventOrSubgroup);
  const world = getWorldFromEvent(eventOrSubgroup);
  const units = useSettings((state) => state.units);

  const distance = getEventDistance(eventOrSubgroup);
  const elevation = getEventElevation(eventOrSubgroup);
  const paceRange = subgroup
    ? formatEventPace(
        subgroup.paceType,
        subgroup.fromPaceValue,
        subgroup.toPaceValue,
        units,
      )
    : undefined;

  return (
    <>
      <SimpleListItem leftAddon={<EventSVGIcon />} leftAddonType="icon">
        <time dateTime={subgroup?.eventSubgroupStart ?? event.eventStart}>
          {formatEventSubgroupStart(
            subgroup?.eventSubgroupStart ?? event.eventStart,
          )}
        </time>
      </SimpleListItem>
      <SimpleListItem leftAddon={<AssessmentSVGIcon />} leftAddonType="icon">
        {EVENT_TYPES[event.eventType]}
      </SimpleListItem>
      {eventOrSubgroup.durationInSeconds > 0 && (
        <SimpleListItem leftAddon={<TimerSVGIcon />}>
          {round(eventOrSubgroup.durationInSeconds) / 60}min
        </SimpleListItem>
      )}
      {distance && (
        <SimpleListItem leftAddon={<SpaceBarSVGIcon />}>
          <Distance distance={distance} />
          {eventOrSubgroup.laps > 1 && route ? (
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
          {eventOrSubgroup.laps > 1 && route ? (
            <small>
              &nbsp;(
              <Elevation elevation={route.elevation} />
              &nbsp;per Lap)
            </small>
          ) : null}
        </SimpleListItem>
      )}
      {eventOrSubgroup.laps > 0 && (
        <SimpleListItem leftAddon={<RefreshSVGIcon />}>
          {eventOrSubgroup.laps === 1
            ? "1 Lap"
            : `${eventOrSubgroup.laps} Laps`}
        </SimpleListItem>
      )}
      {paceRange && (
        <SimpleListItem leftAddon={<TimelineSVGIcon />} leftAddonType="icon">
          {paceRange}
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

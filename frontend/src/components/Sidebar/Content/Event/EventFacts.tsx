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
  subgroup: EventSubgroup;
}

export function EventFacts({ event, subgroup }: Props) {
  const route = getRouteFromEvent(subgroup);
  const world = getWorldFromEvent(subgroup);
  const units = useSettings((state) => state.units);

  const distance = getEventDistance(subgroup);
  const elevation = getEventElevation(subgroup);
  const paceRange = formatEventPace(
    subgroup.paceType,
    subgroup.fromPaceValue,
    subgroup.toPaceValue,
    units
  );

  return (
    <>
      <SimpleListItem leftAddon={<EventSVGIcon />} leftAddonType="icon">
        <time dateTime={subgroup.eventSubgroupStart}>
          {formatEventSubgroupStart(subgroup)}
        </time>
      </SimpleListItem>
      <SimpleListItem leftAddon={<AssessmentSVGIcon />} leftAddonType="icon">
        {EVENT_TYPES[event.eventType]}
      </SimpleListItem>
      {subgroup.durationInSeconds > 0 && (
        <SimpleListItem leftAddon={<TimerSVGIcon />}>
          {round(subgroup.durationInSeconds) / 60}min
        </SimpleListItem>
      )}
      {distance && (
        <SimpleListItem leftAddon={<SpaceBarSVGIcon />}>
          <Distance distance={distance} />
          {subgroup.laps > 1 && route ? (
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
          {subgroup.laps > 1 && route ? (
            <small>
              &nbsp;(
              <Elevation elevation={route.elevation} />
              &nbsp;per Lap)
            </small>
          ) : null}
        </SimpleListItem>
      )}
      {subgroup.laps > 0 && (
        <SimpleListItem leftAddon={<RefreshSVGIcon />}>
          {subgroup.laps === 1 ? "1 Lap" : `${subgroup.laps} Laps`}
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

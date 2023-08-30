import { Select } from "@react-md/form";
import { SimpleListItem } from "@react-md/list";
import { ArrowDropDownSVGIcon } from "@react-md/material-icons";
import round from "lodash-es/round";
import { useId } from "react";
import { useSettings } from "../../../../hooks/useSettings";
import {
  formatEventPace,
  getRouteFromEvent,
} from "../../../../services/events";
import {
  LocationStateUpcomingEvent,
  navigate,
} from "../../../../services/location-state";
import { EventSubgroup, PaceType, Units, ZwiftEvent } from "../../../../types";
import { formatDistance } from "../../../Distance";
import styles from "./EventSubgroupSelector.module.scss";

interface Props {
  event: ZwiftEvent;
  state: LocationStateUpcomingEvent;
}

export function EventSubgroupSelector({ event, state }: Props) {
  const id = useId();
  const units = useSettings((state) => state.units);

  if (event.eventSubgroups.length <= 1) {
    return null;
  }

  const differentPace =
    new Set(
      event.eventSubgroups.map((g) =>
        [g.fromPaceValue, g.toPaceValue].toString(),
      ),
    ).size > 1;
  const differentRoute =
    new Set(event.eventSubgroups.map((g) => g.routeId)).size > 1 &&
    event.eventSubgroups.every((g) => g.paceType === PaceType.WKG);
  const differentDistance =
    new Set(event.eventSubgroups.map((g) => g.distanceInMeters)).size > 1;
  const differentDuration =
    new Set(event.eventSubgroups.map((g) => g.durationInSeconds)).size > 1;
  const differentLaps =
    new Set(event.eventSubgroups.map((g) => g.laps)).size > 1;

  return (
    <SimpleListItem>
      <Select
        id={id}
        dense
        className={styles.Select}
        listboxStyle={{ zIndex: 6000 }}
        name="subgroup"
        label="Group"
        value={state.subgroupLabel ?? event.eventSubgroups[0].subgroupLabel}
        onChange={(newSubgroupLabel) =>
          navigate({
            ...state,
            subgroupLabel: newSubgroupLabel,
          })
        }
        rightChildren={<ArrowDropDownSVGIcon />}
        options={event.eventSubgroups.map((group) => ({
          label: getLabel(
            group,
            {
              differentPace,
              differentRoute,
              differentDistance,
              differentDuration,
              differentLaps,
            },
            units,
          ),
          value: group.subgroupLabel,
        }))}
      />
    </SimpleListItem>
  );
}

interface LabelOptions {
  differentPace: boolean;
  differentRoute: boolean;
  differentDistance: boolean;
  differentDuration: boolean;
  differentLaps: boolean;
}

function getLabel(
  group: EventSubgroup,
  options: LabelOptions,
  units: Units,
): string {
  const difference = getDifference(group, options, units);
  if (difference) {
    return `${group.subgroupLabel}: ${difference}`;
  } else {
    return `Group ${group.subgroupLabel}`;
  }
}

function getDifference(
  group: EventSubgroup,
  {
    differentPace,
    differentRoute,
    differentDistance,
    differentDuration,
    differentLaps,
  }: LabelOptions,
  units: Units,
) {
  if (differentPace) {
    return formatEventPace(
      group.paceType,
      group.fromPaceValue,
      group.toPaceValue,
      units,
    );
  } else if (differentRoute) {
    return getRouteFromEvent(group)?.name ?? null;
  } else if (differentDistance) {
    return formatDistance(group.distanceInMeters, units);
  } else if (differentDuration) {
    return `${round(group.durationInSeconds) / 60}min`;
  } else if (differentLaps) {
    return group.laps === 1 ? "1 Lap" : `${group.laps} Laps`;
  } else {
    return null;
  }
}

import { ListItem, SimpleListItem } from "@react-md/list";
import {
  AssessmentFontIcon,
  EventFontIcon,
  MapFontIcon,
  PlaceFontIcon,
  RefreshFontIcon,
  SpaceBarFontIcon,
  TimerFontIcon,
} from "@react-md/material-icons";
import round from "lodash/round";
import { routes, worlds } from "zwift-data";
import { useLocationState } from "../../../../hooks/useLocationState";
import { ZwiftEvent } from "../../../../services/events";
import { EVENT_TYPES } from "../../../../services/events/constants";
import { Distance } from "../../../Distance";

const FORMAT = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  weekday: "short",
});

interface Props {
  event: ZwiftEvent;
}

export function EventFacts({ event }: Props) {
  const [locationState, setLocationState] = useLocationState();
  const route = routes.find((r) => r.id === event.routeId);
  const world = worlds.find((w) => w.id === event.mapId);

  return (
    <>
      <SimpleListItem
        clickable={false}
        leftAddon={<EventFontIcon />}
        leftAddonType="icon"
      >
        {FORMAT.format(Date.parse(event.eventStart))}
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
      {event.distanceInMeters > 0 && (
        <SimpleListItem clickable={false} leftAddon={<SpaceBarFontIcon />}>
          <Distance distance={event.distanceInMeters} />
        </SimpleListItem>
      )}
      {event.laps > 0 && (
        <SimpleListItem clickable={false} leftAddon={<RefreshFontIcon />}>
          {event.laps === 1 ? "1 Lap" : `${event.laps} Laps`}
        </SimpleListItem>
      )}
      {route && (
        <ListItem
          onClick={() =>
            setLocationState({
              type: "route",
              route: route,
              segments: [],
              world: world!,
              query: locationState.query,
            })
          }
          clickable={false}
          leftAddon={<PlaceFontIcon />}
          leftAddonType="icon"
        >
          {route.name}
        </ListItem>
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

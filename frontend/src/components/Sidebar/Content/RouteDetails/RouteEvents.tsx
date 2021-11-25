import {
  ListItem,
  ListItemText,
  ListSubheader,
  SimpleListItem
} from "@react-md/list";
import { Typography } from "@react-md/typography";
import React, { useMemo } from "react";
import { useAsync } from "react-async-hook";
import { Route, worlds } from "zwift-data";
import { useSettings } from "../../../../hooks/useSettings";
import { fetchEvents } from "../../../../services/events/api";
import {
  LocationStateRoute,
  useLocationState
} from "../../../../services/location-state";
import { EventInfo } from "../../../EventInfo";
import { LoadingSpinnerListItem } from "../../../Loading";

interface Props {
  route: Route;
}

export function RouteEvents({ route }: Props) {
  const { result: events } = useAsync(fetchEvents, []);
  const [settings] = useSettings();
  const [, setLocationState] = useLocationState<LocationStateRoute>();

  const filteredEvents = useMemo(() => {
    if (!events) {
      return;
    }

    return events
      .filter((e) => e.sport.toLowerCase() === settings.sport)
      .filter((event) => {
        const eventRouteIds = [
          event.routeId,
          ...event.eventSubgroups.map((esg) => esg.routeId),
        ];

        return route.id && eventRouteIds.includes(route.id);
      })
      .sort((a, b) => (a.eventStart ?? "").localeCompare(b.eventStart ?? ""));
  }, [events, route, settings.sport]);

  if (filteredEvents === undefined) {
    return <LoadingSpinnerListItem small />;
  }

  if (filteredEvents.length === 0) {
    return <>
      <ListSubheader>Upcoming Events</ListSubheader>
      <SimpleListItem>
        <Typography type="body-2">No events on this route today.</Typography>
      </SimpleListItem>
    </>;
  }

  return <>
    <ListSubheader>Upcoming Events</ListSubheader>
    {filteredEvents.slice(0, 3).map((event) => (
      <ListItem
        key={event.id}
        onClick={() =>
          setLocationState({
            type: "event",
            world: worlds.find((w) => w.slug === route.world) ?? null,
            eventId: event.id.toString(),
          })
        }
        secondaryText={<EventInfo event={event} />}
        threeLines
      >
        <ListItemText>{event.name}</ListItemText>
      </ListItem>
    ))}
    {filteredEvents.length > 3 && (
      <SimpleListItem>
        <Typography type="body-2">
          {filteredEvents.length - 3} more{" "}
          {filteredEvents.length === 4 ? "event" : "events"} happening today
        </Typography>
      </SimpleListItem>
    )}
  </>;
}

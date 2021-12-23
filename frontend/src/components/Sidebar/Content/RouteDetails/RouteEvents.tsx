import {
  List,
  ListItemText,
  ListSubheader,
  SimpleListItem,
} from "@react-md/list";
import { Typography } from "@react-md/typography";
import React, { useMemo } from "react";
import { useAsync } from "react-async-hook";
import { Route } from "zwift-data";
import { WORLDS_BY_SLUG } from "../../../../constants";
import { useSettings } from "../../../../hooks/useSettings";
import { fetchEvents } from "../../../../services/events/api";
import { EventInfo } from "../../../EventInfo";
import { ListItemState } from "../../../ListItemState";
import { LoadingSpinnerListItem } from "../../../Loading";

interface Props {
  route: Route;
}

export function RouteEvents({ route }: Props) {
  const { result: events } = useAsync(fetchEvents, []);
  const [settings] = useSettings();

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
      .sort((a, b) => a.eventStart.localeCompare(b.eventStart));
  }, [events, route, settings.sport]);

  if (filteredEvents === undefined) {
    return <LoadingSpinnerListItem small />;
  }

  if (filteredEvents.length === 0) {
    return (
      <List
        role="list"
        aria-labelledby="route-events-header"
        style={{ marginTop: 0, marginBottom: 0 }}
      >
        <ListSubheader id="route-events-header" role="none">
          Upcoming Events
        </ListSubheader>
        <SimpleListItem>
          <Typography type="body-2">No events on this route today.</Typography>
        </SimpleListItem>
      </List>
    );
  }

  return (
    <List
      role="list"
      aria-labelledby="route-events-header"
      style={{ marginTop: 0, marginBottom: 0 }}
    >
      <ListSubheader id="route-events-header" role="none">
        Upcoming Events
      </ListSubheader>
      {filteredEvents.slice(0, 3).map((event) => (
        <ListItemState
          key={event.id}
          state={{
            type: "event",
            world: WORLDS_BY_SLUG[route.world],
            eventId: event.id.toString(),
          }}
          secondaryText={<EventInfo event={event} />}
          threeLines
        >
          <ListItemText>{event.name}</ListItemText>
        </ListItemState>
      ))}
      {filteredEvents.length > 3 && (
        <SimpleListItem>
          <Typography type="body-2">
            {filteredEvents.length - 3} more{" "}
            {filteredEvents.length === 4 ? "event" : "events"} happening today
          </Typography>
        </SimpleListItem>
      )}
    </List>
  );
}

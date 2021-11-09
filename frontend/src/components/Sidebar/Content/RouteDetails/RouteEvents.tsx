import { ListItemLink, ListSubheader, SimpleListItem } from "@react-md/list";
import { EventFontIcon } from "@react-md/material-icons";
import { CircularProgress } from "@react-md/progress";
import { Text } from "@react-md/typography";
import React, { useMemo } from "react";
import { useAsync } from "react-async-hook";
import { Route } from "zwift-data";
import { useSettings } from "../../../../hooks/useSettings";
import { fetchEvents } from "../../../../services/events/api";
import { EventInfo } from "../../../EventInfo";

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
    return (
      <SimpleListItem>
        <CircularProgress
          id="loading-events"
          small
          circleStyle={{ stroke: "black" }}
        />
      </SimpleListItem>
    );
  }

  if (filteredEvents.length === 0) {
    return (
      <SimpleListItem>
        <Text type="body-2">No events on this route today.</Text>
      </SimpleListItem>
    );
  }

  return (
    <>
      <ListSubheader>Upcoming Events</ListSubheader>
      {filteredEvents.slice(0, 3).map((event) => (
        <ListItemLink
          key={event.id}
          href={`https://zwift.com/events/view/${event.id}`}
          target="_blank"
          rightAddon={<EventFontIcon />}
          rightAddonType="icon"
          secondaryText={<EventInfo event={event} />}
          threeLines
        >
          {event.name}
        </ListItemLink>
      ))}
      {filteredEvents.length > 3 && (
        <SimpleListItem>
          <Text type="body-2">
            {filteredEvents.length - 3} more{" "}
            {filteredEvents.length === 4 ? "event" : "events"} happening today
          </Text>
        </SimpleListItem>
      )}
    </>
  );
}

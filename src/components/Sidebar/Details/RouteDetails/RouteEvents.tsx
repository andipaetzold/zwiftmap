import { ListItem, SimpleListItem } from "@react-md/list";
import { EventFontIcon } from "@react-md/material-icons";
import { CircularProgress } from "@react-md/progress";
import { Text } from "@react-md/typography";
import round from "lodash/round";
import React, { useMemo } from "react";
import { useAsync } from "react-async-hook";
import { fetchEvents, ZwiftEventType } from "../../../../services/fetchEvents";
import { Route } from "../../../../types";

interface Props {
  route: Route;
}

export function RouteEvents({ route }: Props) {
  const { result: events } = useAsync(fetchEvents, []);
  const filteredEvents = useMemo(() => {
    if (!events) {
      return;
    }

    return events
      .filter((event) => {
        const eventRouteIds = [
          event.routeId,
          ...event.eventSubgroups.map((esg) => esg.routeId),
        ];

        return eventRouteIds.includes(route.id);
      })
      .sort((a, b) => a.eventStart.localeCompare(b.eventStart));
  }, [events, route]);

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
      {filteredEvents.slice(0, 3).map((event) => (
        <ListItem
          key={event.id}
          onClick={() =>
            window.open(`http://zwift.com/events/view/${event.id}`, "_blank")
          }
          rightAddon={<EventFontIcon />}
          rightAddonType="icon"
          secondaryText={
            <>
              {new Intl.DateTimeFormat("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                weekday: "short",
              }).format(Date.parse(event.eventStart))}
              <br />
              {eventTypes[event.eventType] ?? event.eventType} |&nbsp;
              {event.distanceInMeters !== 0 ? (
                <>
                  {round(event.distanceInMeters / 1_000, 1)}
                  km
                </>
              ) : event.durationInSeconds > 0 ? (
                <>{round(event.durationInSeconds) / 60}min</>
              ) : (
                <>{event.laps === 1 ? `1 lap` : `${event.laps} laps`}</>
              )}
            </>
          }
          threeLines
        >
          {event.name}
        </ListItem>
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

const eventTypes: { [type in ZwiftEventType]: string } = {
  GROUP_RIDE: "Group Ride",
  GROUP_WORKOUT: "Workout",
  RACE: "Race",
  TIME_TRIAL: "Time Trial",
};

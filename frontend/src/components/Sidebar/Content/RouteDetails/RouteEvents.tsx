import {
  List,
  ListItemText,
  ListSubheader,
  SimpleListItem,
} from "@react-md/list";
import { Typography } from "@react-md/typography";
import { useMemo } from "react";
import { Route } from "zwift-data";
import { WORLDS_BY_SLUG } from "../../../../constants";
import { useSettings } from "../../../../hooks/useSettings";
import { useEvents } from "../../../../react-query";
import { EventSubgroup, ZwiftEvent } from "../../../../types";
import { EventInfo } from "../../../EventInfo";
import { ListItemState } from "../../../ListItemState";
import { LoadingSpinnerListItem } from "../../../Loading";

interface Props {
  route: Route;
}

export function RouteEvents({ route }: Props) {
  const { data: events, isLoading, isError } = useEvents();
  const sport = useSettings((state) => state.sport);

  const filteredEvents = useMemo(() => {
    if (!events || !route.id) {
      return;
    }

    return events
      .filter((e) => e.sport.toLowerCase() === sport)
      .map((event) => {
        const subgroup = event.eventSubgroups.find(
          (esg) => esg.routeId === route.id,
        );
        if (!subgroup) {
          return null;
        }

        return {
          ...event,
          subgroup,
        };
      })
      .filter((e): e is ZwiftEvent & { subgroup: EventSubgroup } => e !== null)
      .sort((a, b) => a.eventStart.localeCompare(b.eventStart));
  }, [events, route, sport]);

  if (isError) {
    return null;
  }

  if (isLoading || filteredEvents === undefined) {
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
            eventId: event.id,
            subgroupLabel: event.subgroup.subgroupLabel,
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

import { ListItemLink } from "@react-md/list";
import { OpenInNewSVGIcon } from "@react-md/material-icons";
import { routes, worlds } from "zwift-data";
import { ZwiftEvent } from "../../../../services/events";
import {
  LocationStateUpcomingEvents,
  useLocationState,
} from "../../../../services/location-state";
import { HoverData } from "../../../../types";
import { EventInfo } from "../../../EventInfo";
import { ListItemState } from "../../../ListItemState";

interface Props {
  event: ZwiftEvent;
  onHoverRoute: (data: HoverData) => void;
}

export function EventItem({ event, onHoverRoute }: Props) {
  const route = routes.find((r) => r.id === event.routeId);
  const [locationState] = useLocationState<LocationStateUpcomingEvents>();

  if (!route) {
    return (
      <ListItemLink
        href={`https://zwift.com/events/view/${event.id}`}
        target="_blank"
      >
        {event.name}
      </ListItemLink>
    );
  }

  return (
    <ListItemState
      secondaryText={
        <EventInfo
          event={event}
          showWorld={locationState.world.slug !== route?.slug}
        />
      }
      threeLines
      state={{
        type: "event",
        world: worlds.find((w) => w.slug === route.world)!,
        eventId: event.id.toString(),
      }}
      onClick={() => onHoverRoute(undefined)}
      onMouseEnter={() => {
        if (route.world === locationState.world.slug) {
          onHoverRoute({ type: "route", route: route.slug });
        } else {
          onHoverRoute(undefined);
        }
      }}
      onMouseLeave={() => onHoverRoute(undefined)}
      rightAddon={route ? undefined : <OpenInNewSVGIcon />}
      rightAddonType={route ? undefined : "icon"}
    >
      {event.name}
    </ListItemState>
  );
}

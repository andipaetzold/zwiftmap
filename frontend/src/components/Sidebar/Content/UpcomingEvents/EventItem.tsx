import { ListItemLink } from "@react-md/list";
import { OpenInNewSVGIcon } from "@react-md/material-icons";
import { routes, worlds } from "zwift-data";
import { useStore } from "../../../../hooks/useStore";
import { ZwiftEvent } from "../../../../services/events";
import { LocationStateUpcomingEvents } from "../../../../services/location-state";
import { EventInfo } from "../../../EventInfo";
import { ListItemState } from "../../../ListItemState";

interface Props {
  state: LocationStateUpcomingEvents;
  event: ZwiftEvent;
}

export function EventItem({ state, event }: Props) {
  const setHoverState = useStore((store) => store.setHoverState);
  const route = routes.find((r) => r.id === event.routeId);

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
        <EventInfo event={event} showWorld={state.world.slug !== route?.slug} />
      }
      threeLines
      state={{
        type: "event",
        world: worlds.find((w) => w.slug === route.world)!,
        eventId: event.id.toString(),
      }}
      onClick={() => setHoverState(undefined)}
      onMouseEnter={() => {
        if (route.world === state.world.slug) {
          setHoverState({ type: "preview-route", route: route.slug });
        } else {
          setHoverState(undefined);
        }
      }}
      onMouseLeave={() => setHoverState(undefined)}
      rightAddon={route ? undefined : <OpenInNewSVGIcon />}
      rightAddonType={route ? undefined : "icon"}
    >
      {event.name}
    </ListItemState>
  );
}

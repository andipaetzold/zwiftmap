import { ListItemLink } from "@react-md/list";
import { OpenInNewSVGIcon } from "@react-md/material-icons";
import { routes } from "zwift-data";
import { WORLDS_BY_SLUG } from "../../../../constants";
import { useStore } from "../../../../hooks/useStore";
import { LocationStateUpcomingEvents } from "../../../../services/location-state";
import { HoverStateType, ZwiftEvent } from "../../../../types";
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
        world: WORLDS_BY_SLUG[route.world],
        eventId: event.id,
        subgroupLabel: null,
      }}
      onClick={() => setHoverState(undefined)}
      onMouseEnter={() => {
        setHoverState({
          type: HoverStateType.PreviewEvent,
          event: event.id,
        });
      }}
      onMouseLeave={() => setHoverState(undefined)}
      rightAddon={route ? undefined : <OpenInNewSVGIcon />}
      rightAddonType={route ? undefined : "icon"}
    >
      {event.name}
    </ListItemState>
  );
}

import { TextIconSpacing } from "@react-md/icon";
import { List, ListSubheader, SimpleListItem } from "@react-md/list";
import { ListSVGIcon } from "@react-md/material-icons";
import { useAsync } from "react-async-hook";
import { Helmet } from "react-helmet-async";
import { useSessionSettings } from "../../../../hooks/useSessionSettings";
import { useSettings } from "../../../../hooks/useSettings";
import { fetchEvents } from "../../../../services/events";
import { LocationStateUpcomingEvents } from "../../../../services/location-state";
import { ButtonState } from "../../../ButtonState";
import { LoadingSpinnerListItem } from "../../../Loading";
import { EventItem } from "./EventItem";
import { EventFilterButton } from "./FilterButton";

interface Props {
  state: LocationStateUpcomingEvents;
}

export function UpcomingEvents({ state }: Props) {
  const [{ eventFilter: filterState }] = useSessionSettings();
  const { result: events, loading } = useAsync(fetchEvents, []);
  const [settings] = useSettings();

  if (!events) {
    if (loading) {
      return (
        <List>
          <Header state={state} />
          <LoadingSpinnerListItem />
        </List>
      );
    } else {
      return (
        <List>
          <Header state={state} />
          <SimpleListItem
            secondaryText="Make sure you can access the activity and it was recorded in Zwift."
            threeLines
          >
            An error occurred
          </SimpleListItem>
        </List>
      );
    }
  }

  return (
    <List>
      <Header state={state} />

      <EventFilterButton />

      {events
        .filter((e) => e.sport.toLowerCase() === settings.sport)
        .filter((e) => filterState.eventTypes.includes(e.eventType))
        .map((event) => (
          <EventItem key={event.id} state={state} event={event} />
        ))}
    </List>
  );
}

interface HeaderProps {
  state: LocationStateUpcomingEvents;
}

function Header({ state }: HeaderProps) {
  return (
    <>
      <Helmet>
        <title>Upcoming Events</title>
        <meta name="description" content="Upcoming events on Zwift" />

        <meta property="og:title" content="UpcomingEvents - ZwiftMap" />
        <meta property="og:description" content="Upcoming events on Zwift" />
      </Helmet>
      <SimpleListItem>
        <ButtonState
          themeType="outline"
          query=""
          state={{
            world: state.world,
            type: "default",
          }}
        >
          <TextIconSpacing icon={<ListSVGIcon />}>Route List</TextIconSpacing>
        </ButtonState>
      </SimpleListItem>
      <ListSubheader>Upcoming Event</ListSubheader>
    </>
  );
}

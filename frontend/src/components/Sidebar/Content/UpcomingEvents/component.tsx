import { TextIconSpacing } from "@react-md/icon";
import { List, ListSubheader, SimpleListItem } from "@react-md/list";
import { ListSVGIcon } from "@react-md/material-icons";
import { Helmet } from "react-helmet-async";
import { useSessionSettings } from "../../../../hooks/useSessionSettings";
import { useSettings } from "../../../../hooks/useSettings";
import { useEvents } from "../../../../react-query";
import { LocationStateUpcomingEvents } from "../../../../services/location-state";
import { ButtonState } from "../../../ButtonState";
import { LoadingSpinnerListItem } from "../../../Loading";
import { EventItem } from "./EventItem";
import { EventFilterButton } from "./FilterButton";

interface Props {
  state: LocationStateUpcomingEvents;
}

export default function UpcomingEvents({ state }: Props) {
  const [{ eventFilter: filterState }] = useSessionSettings();
  const { data: events, isLoading, isError } = useEvents();
  const sport = useSettings((state) => state.sport);

  if (isLoading) {
    return (
      <List>
        <Header state={state} />
        <LoadingSpinnerListItem />
      </List>
    );
  }

  if (isError || !events) {
    return (
      <List>
        <Header state={state} />
        <SimpleListItem
          secondaryText="Error fetching upcoming events."
          threeLines
        >
          An error occurred
        </SimpleListItem>
      </List>
    );
  }

  return (
    <List>
      <Header state={state} />

      <EventFilterButton />

      {events
        .filter((e) => e.sport.toLowerCase() === sport)
        .filter((e) => filterState.eventTypes.includes(e.eventType))
        .filter(
          (e) =>
            filterState.requireCategoryEnforcement === false ||
            e.categoryEnforcement,
        )
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

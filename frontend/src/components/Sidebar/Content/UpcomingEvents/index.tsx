import { Button } from "@react-md/button";
import { TextIconSpacing } from "@react-md/icon";
import { List, ListSubheader, SimpleListItem } from "@react-md/list";
import { ListFontIcon } from "@react-md/material-icons";
import { useAsync } from "react-async-hook";
import { useSessionSettings } from "../../../../hooks/useSessionSettings";
import { useSettings } from "../../../../hooks/useSettings";
import { useStore } from "../../../../hooks/useStore";
import { fetchEvents } from "../../../../services/events";
import {
  LocationStateUpcomingEvents,
  useLocationState,
} from "../../../../services/location-state";
import { HoverData } from "../../../../types";
import { LoadingSpinnerListItem } from "../../../Loading";
import { EventItem } from "./EventItem";
import { EventFilterButton } from "./FilterButton";

interface Props {
  onHoverRoute: (data: HoverData) => void;
}

export function UpcomingEvents({ onHoverRoute }: Props) {
  const [{ eventFilter: filterState }] = useSessionSettings();
  const { result: events, loading } = useAsync(fetchEvents, []);
  const [settings] = useSettings();
  const [locationState, setLocationState] =
    useLocationState<LocationStateUpcomingEvents>();
  const setQuery = useStore((state) => state.setQuery);

  const backButton = (
    <SimpleListItem>
      <Button
        themeType="outline"
        onClick={() => {
          setQuery("");
          setLocationState({
            world: locationState.world,
            type: "default",
          });
        }}
      >
        <TextIconSpacing icon={<ListFontIcon />}>Route List</TextIconSpacing>
      </Button>
    </SimpleListItem>
  );

  if (!events) {
    if (loading) {
      return (
        <List>
          {backButton}
          <ListSubheader>Upcoming Event</ListSubheader>
          <LoadingSpinnerListItem />
        </List>
      );
    } else {
      return (
        <List>
          <ListSubheader>Upcoming Event</ListSubheader>
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
      {backButton}

      <ListSubheader>Upcoming Event</ListSubheader>

      <EventFilterButton />

      {events
        .filter((e) => e.sport.toLowerCase() === settings.sport)
        .filter((e) => filterState.eventTypes.includes(e.eventType))
        .map((event) => (
          <EventItem key={event.id} event={event} onHoverRoute={onHoverRoute} />
        ))}
    </List>
  );
}

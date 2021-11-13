import { Button } from "@react-md/button";
import { TextIconSpacing } from "@react-md/icon";
import { List, ListSubheader, SimpleListItem } from "@react-md/list";
import { ListFontIcon } from "@react-md/material-icons";
import { useAsync } from "react-async-hook";
import { useSettings } from "../../../../hooks/useSettings";
import { fetchEvents } from "../../../../services/events";
import {
  LocationStateUpcomingEvents,
  useLocationState,
} from "../../../../services/location-state";
import { HoverData } from "../../../../types";
import { LoadingSpinnerListItem } from "../../../Loading";
import { EventItem } from "./EventItem";

interface Props {
  onHoverRoute: (data: HoverData) => void;
}

export function UpcomingEvents({ onHoverRoute }: Props) {
  const { result: events, loading } = useAsync(fetchEvents, []);
  const [settings] = useSettings();
  const [locationState, setLocationState] =
    useLocationState<LocationStateUpcomingEvents>();

  const backButton = (
    <SimpleListItem>
      <Button
        themeType="outline"
        onClick={() => {
          setLocationState({
            world: locationState.world,
            query: "",
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

      {events
        .filter((e) => e.sport.toLowerCase() === settings.sport)
        .map((event) => (
          <EventItem key={event.id} event={event} onHoverRoute={onHoverRoute} />
        ))}
    </List>
  );
}

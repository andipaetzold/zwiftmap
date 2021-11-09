import { Button } from "@react-md/button";
import { TextIconSpacing } from "@react-md/icon";
import { List, ListSubheader, SimpleListItem } from "@react-md/list";
import { ListFontIcon } from "@react-md/material-icons";
import { CircularProgress } from "@react-md/progress";
import { useAsync } from "react-async-hook";
import { useLocationState } from "../../../../hooks/useLocationState";
import { useSettings } from "../../../../hooks/useSettings";
import { fetchEvents } from "../../../../services/fetchEvents";
import { EventItem } from "./EventItem";

interface Props {
  onHoverRoute: (route?: string) => void;
}

export function UpcomingEvents({ onHoverRoute }: Props) {
  const { result: events, loading } = useAsync(fetchEvents, []);
  const [settings] = useSettings();
  const [locationState, setLocationState] = useLocationState();

  if (!events) {
    if (loading) {
      return (
        <CircularProgress
          id={"upcoming-events-progress"}
          circleStyle={{ stroke: "black" }}
        />
      );
    } else {
      return (
        <List>
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

      <ListSubheader>Upcoming Event</ListSubheader>

      {events
        .filter((e) => e.sport.toLowerCase() === settings.sport)
        .map((event) => (
          <EventItem key={event.id} event={event} onHoverRoute={onHoverRoute} />
        ))}
    </List>
  );
}

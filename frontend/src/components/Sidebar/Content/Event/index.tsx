import { Button } from "@react-md/button";
import { TextIconSpacing } from "@react-md/icon";
import { List, SimpleListItem } from "@react-md/list";
import { ListFontIcon } from "@react-md/material-icons";
import { CircularProgress } from "@react-md/progress";
import { useAsync } from "react-async-hook";
import { fetchEvent } from "../../../../services/events";
import {
  DEFAULT_WORLD,
  LocationStateUpcomingEvent,
  useLocationState,
} from "../../../../services/location-state";
import { EventComponent } from "./component";

interface Props {
  onMouseHoverDistanceChange: (distance: number | undefined) => void;
  eventId: string;
}

export function Event({ eventId }: Props) {
  const { result: event, loading } = useAsync(fetchEvent, [eventId]);
  const [locationState, setLocationState] =
    useLocationState<LocationStateUpcomingEvent>();

  const backButton = (
    <SimpleListItem>
      <Button
        themeType="outline"
        onClick={() =>
          setLocationState({
            type: "events",
            query: locationState.query,
            world: locationState.world ?? DEFAULT_WORLD,
          })
        }
      >
        <TextIconSpacing icon={<ListFontIcon />}>
          Upcoming Events
        </TextIconSpacing>
      </Button>
    </SimpleListItem>
  );

  if (!event) {
    if (loading) {
      return (
        <List>
          {backButton}
          <CircularProgress
            id={`event-${eventId}`}
            circleStyle={{ stroke: "black" }}
          />
        </List>
      );
    } else {
      return (
        <List>
          {backButton}
          <SimpleListItem secondaryText="Error loading event">
            An error occurred
          </SimpleListItem>
        </List>
      );
    }
  }

  return (
    <List>
      {backButton}
      <EventComponent event={event} />
    </List>
  );
}

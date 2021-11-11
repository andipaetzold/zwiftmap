import { List, SimpleListItem } from "@react-md/list";
import { useAsync } from "react-async-hook";
import { fetchEvent } from "../../../../services/events";
import { LoadingSpinnerListItem } from "../../../Loading";
import { BackButton } from "./BackButton";
import { EventComponent } from "./component";

interface Props {
  onMouseHoverDistanceChange: (distance: number | undefined) => void;
  eventId: string;
}

export function Event(props: Props) {
  return (
    <List>
      <BackButton />
      <EventContent {...props} />
    </List>
  );
}

function EventContent({ eventId }: Props) {
  const { result: event, loading } = useAsync(fetchEvent, [eventId]);

  if (loading) {
    return <LoadingSpinnerListItem />;
  }

  if (!event) {
    return (
      <SimpleListItem secondaryText="Error loading event">
        An error occurred
      </SimpleListItem>
    );
  }

  return <EventComponent event={event} />;
}

import { SimpleListItem } from "@react-md/list";
import { useState } from "react";
import { BACKEND_HOST } from "../../../../config";
import { ZwiftEvent } from "../../../../types";

interface Props {
  event: ZwiftEvent;
}

export function EventWorkoutChart({ event }: Props) {
  const [error, setError] = useState(false);

  if (error) {
    return null;
  }

  if (event.type !== "EVENT_TYPE_GROUP_WORKOUT") {
    return null;
  }

  const url = new URL(`/events/${event.id}/workout`, BACKEND_HOST);
  return (
    <SimpleListItem>
      <img
        src={url.toString()}
        alt="Workout Chart"
        width="100%"
        onError={() => setError(true)}
      />
    </SimpleListItem>
  );
}

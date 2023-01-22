import { SimpleListItem } from "@react-md/list";
import { useState } from "react";
import { BACKEND_HOST } from "../../../../config";
import { EventSubgroup, ZwiftEvent } from "../../../../types";

interface Props {
  event: ZwiftEvent;
  subgroup: EventSubgroup | undefined;
}

export function EventWorkoutChart({ event, subgroup }: Props) {
  const [error, setError] = useState(false);

  if (error) {
    return null;
  }

  if (event.type !== "EVENT_TYPE_GROUP_WORKOUT") {
    return null;
  }

  const path = subgroup
    ? `/events/${event.id}/${subgroup.subgroupLabel}/workout`
    : `/events/${event.id}/workout`;
  const url = new URL(path, BACKEND_HOST);
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

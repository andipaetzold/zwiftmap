import round from "lodash/round";
import { worlds } from "zwift-data";
import { ZwiftEvent, ZwiftEventType } from "../../services/fetchEvents";
import { Distance } from "../Distance";

const FORMAT = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  weekday: "short",
});

interface Props {
  event: ZwiftEvent;
  showWorld?: boolean;
}

export function EventInfo({ event, showWorld = false }: Props) {
  const date = FORMAT.format(Date.parse(event.eventStart));
  const world = worlds.find((w) => w.id === event.mapId)?.name;
  const type = EVENT_TYPES[event.eventType] ?? event.eventType;
  const content = getEventContent(event);

  return (
    <>
      {date}
      {showWorld && world && (
        <>
          {" | "}
          {world}
        </>
      )}
      <br />
      {type}
      {content && (
        <>
          {" | "}
          {content}
        </>
      )}
    </>
  );
}

export const EVENT_TYPES: { [type in ZwiftEventType]: string } = {
  GROUP_RIDE: "Group Ride",
  GROUP_WORKOUT: "Workout",
  RACE: "Race",
  TIME_TRIAL: "Time Trial",
};

function getEventContent(event: ZwiftEvent) {
  if (event.distanceInMeters !== 0) {
    return <Distance distance={event.distanceInMeters / 1_000} />;
  } else if (event.durationInSeconds > 0) {
    <>{round(event.durationInSeconds) / 60}min</>;
  } else if (event.laps >= 1) {
    return <>{event.laps === 1 ? `1 lap` : `${event.laps} laps`}</>;
  }
}

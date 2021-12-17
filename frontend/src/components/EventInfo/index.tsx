import round from "lodash/round";
import { worlds } from "zwift-data";
import { ZwiftEvent } from "../../services/events";
import { EVENT_TYPES } from "../../services/events/constants";
import { formatEventStart } from "../../util/formats";
import { Distance } from "../Distance";

interface Props {
  event: ZwiftEvent;
  showWorld?: boolean;
}

export function EventInfo({ event, showWorld = false }: Props) {
  const world = worlds.find((w) => w.id === event.mapId)?.name;

  const type = EVENT_TYPES[event.eventType] ?? event.eventType;
  const content = getEventContent(event);

  return (
    <>
      <time dateTime={event.eventStart}>{formatEventStart(event)}</time>
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

function getEventContent(event: ZwiftEvent) {
  if (event.distanceInMeters !== 0) {
    return <Distance distance={event.distanceInMeters / 1_000} />;
  } else if (event.durationInSeconds > 0) {
    <>{round(event.durationInSeconds) / 60}min</>;
  } else if (event.laps >= 1) {
    return <>{event.laps === 1 ? `1 lap` : `${event.laps} laps`}</>;
  }
}

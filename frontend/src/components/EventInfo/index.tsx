import round from "lodash-es/round";
import { routes, worlds } from "zwift-data";
import { useSettings } from "../../hooks/useSettings";
import { EVENT_TYPES, getEventPaceRangeAsString } from "../../services/events";
import { ZwiftEvent } from "../../types";
import { formatEventStart } from "../../util/formats";
import { Distance } from "../Distance";

interface Props {
  event: ZwiftEvent;
  showWorld?: boolean;
}

export function EventInfo({ event, showWorld = false }: Props) {
  const worldSlug = routes.find((r) => r.id === event.routeId)?.world;
  const world = worlds.find((w) => w.slug === worldSlug);
  const units = useSettings((state) => state.units);

  const type = EVENT_TYPES[event.eventType] ?? event.eventType;
  const content = getEventContent(event);
  const paceRange = getEventPaceRangeAsString(event, units);

  return (
    <>
      <time dateTime={event.eventStart}>{formatEventStart(event)}</time>
      {showWorld && world && (
        <>
          {" | "}
          {world.name}
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
      {paceRange && (
        <>
          {" | "}
          {paceRange}
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

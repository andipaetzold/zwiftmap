import round from "lodash-es/round";
import { routes, worlds } from "zwift-data";
import { EVENT_TYPES } from "../../services/events";
import { PaceType, ZwiftEvent } from "../../types";
import { formatEventStart } from "../../util/formats";
import { Distance } from "../Distance";

interface Props {
  event: ZwiftEvent;
  showWorld?: boolean;
}

export function EventInfo({ event, showWorld = false }: Props) {
  const worldSlug = routes.find((r) => r.id === event.routeId)?.world;
  const world = worlds.find((w) => w.slug === worldSlug);

  const type = EVENT_TYPES[event.eventType] ?? event.eventType;
  const content = getEventContent(event);

  const paceRange = getPaceRange(event);
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

const PACE_NUMER_FORMAT = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});
function getPaceRange(event: ZwiftEvent): string | null {
  if (event.eventSubgroups.length === 0) {
    return null;
  }

  if (event.eventSubgroups.some((g) => g.paceType !== PaceType.WKG)) {
    return null;
  }

  const paceFrom = Math.min(
    ...event.eventSubgroups.map((g) => g.fromPaceValue)
  );
  const paceTo = Math.max(...event.eventSubgroups.map((g) => g.toPaceValue));

  if (paceFrom === paceTo) {
    return `${PACE_NUMER_FORMAT.format(paceFrom)} W/kg`;
  } else {
    // TODO: use formatRange once supported
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/formatRange
    return `${PACE_NUMER_FORMAT.format(paceFrom)} - ${PACE_NUMER_FORMAT.format(
      paceTo
    )} W/kg`;
  }
}

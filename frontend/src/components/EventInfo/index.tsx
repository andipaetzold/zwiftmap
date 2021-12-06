import * as Sentry from "@sentry/react";
import round from "lodash/round";
import { useMemo } from "react";
import { worlds } from "zwift-data";
import { ZwiftEvent } from "../../services/events";
import { EVENT_TYPES } from "../../services/events/constants";
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
  const date = useMemo(() => {
    try {
      return event.eventStart
        ? FORMAT.format(Date.parse(event.eventStart))
        : "Unknown start time";
    } catch (e) {
      // TODO: remove once bug was identified
      Sentry.captureException(e, {
        extra: {
          eventId: event.id,
          eventStart: event.eventStart,
        },
      });
    }
  }, [event]);
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

function getEventContent(event: ZwiftEvent) {
  if (event.distanceInMeters !== 0) {
    return <Distance distance={event.distanceInMeters / 1_000} />;
  } else if (event.durationInSeconds > 0) {
    <>{round(event.durationInSeconds) / 60}min</>;
  } else if (event.laps >= 1) {
    return <>{event.laps === 1 ? `1 lap` : `${event.laps} laps`}</>;
  }
}

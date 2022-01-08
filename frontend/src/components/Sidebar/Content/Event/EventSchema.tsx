import parseISO from "date-fns/parseISO";
import formatISO from "date-fns/formatISO";
import formatISODuration from "date-fns/formatISODuration";
import { JsonLd } from "react-schemaorg";
import { Event, WithContext } from "schema-dts";
import { getWorldFromEvent, ZwiftEvent } from "../../../../services/events";
import { createUrl } from "../../../../services/location-state";

interface Props {
  event: ZwiftEvent;
}

export function EventSchema({ event }: Props) {
  const world = getWorldFromEvent(event);

  if (!world) {
    return null;
  }

  const schema: WithContext<Event> = {
    "@id": `https://zwift.com/events/view/${event.id}`,
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    organizer: {
      "@type": "Organization",
      name: "Zwift",
      url: "https://zwift.com",
    },
    eventStatus: "EventScheduled",
    sport: event.sport === "RUNNING" ? "Virtual Cycling" : "Virtual Running",
    disambiguatingDescription: event.shortDescription
      ? event.shortDescription
      : undefined,
    name: event.name,
    alternateName: event.shortName ?? undefined,
    description: event.description,
    url: new URL(
      createUrl({ type: "event", world, eventId: event.id.toString() }),
      window.location.origin
    ).toString(),
    sameAs: `https://zwift.com/events/view/${event.id}`,
    eventAttendanceMode: "OnlineEventAttendanceMode",
    startDate: formatISO(parseISO(event.eventStart)),
    duration:
      event.durationInSeconds > 0
        ? formatISODuration({
            seconds: event.durationInSeconds,
          })
        : undefined,
    maximumAttendeeCapacity: event.timeTrialOptions
      ? event.timeTrialOptions.maxRidersPerRow * event.timeTrialOptions.maxRows
      : undefined,
    maximumVirtualAttendeeCapacity: event.timeTrialOptions
      ? event.timeTrialOptions.maxRidersPerRow * event.timeTrialOptions.maxRows
      : undefined,
    image: event.imageUrl,
    isAccessibleForFree: true,
    location: {
      "@type": "VirtualLocation",
      name: world.name,
      url: new URL(
        createUrl({ type: "default", world }),
        window.location.origin
      ).toString(),
    },
  };

  return <JsonLd<Event> item={schema} />;
}

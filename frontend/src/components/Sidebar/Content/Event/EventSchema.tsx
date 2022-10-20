import formatISO from "date-fns/formatISO";
import formatISODuration from "date-fns/formatISODuration";
import parseISO from "date-fns/parseISO";
import { JsonLd } from "react-schemaorg";
import { Event, WithContext } from "schema-dts";
import { getWorldFromEvent } from "../../../../services/events";
import { createUrl } from "../../../../services/location-state";
import { EventSubgroup, ZwiftEvent } from "../../../../types";

interface Props {
  name: string;
  event: ZwiftEvent;
  subgroup: EventSubgroup;
}

export function EventSchema({ name, event, subgroup }: Props) {
  const world = getWorldFromEvent(subgroup);

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
    name,
    alternateName: event.shortName ?? undefined,
    description: subgroup.description || event.description,
    url: new URL(
      createUrl({
        type: "event",
        world,
        eventId: event.id,
        subgroupLabel: subgroup.subgroupLabel,
      }),
      window.location.origin
    ).toString(),
    sameAs: `https://zwift.com/events/view/${event.id}`,
    eventAttendanceMode: "OnlineEventAttendanceMode",
    startDate: formatISO(parseISO(subgroup.eventSubgroupStart)),
    duration:
      subgroup.durationInSeconds > 0
        ? formatISODuration({
            seconds: subgroup.durationInSeconds,
          })
        : undefined,
    maximumAttendeeCapacity: subgroup.timeTrialOptions
      ? subgroup.timeTrialOptions.maxRidersPerRow *
        subgroup.timeTrialOptions.maxRows
      : undefined,
    maximumVirtualAttendeeCapacity: subgroup.timeTrialOptions
      ? subgroup.timeTrialOptions.maxRidersPerRow *
        subgroup.timeTrialOptions.maxRows
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

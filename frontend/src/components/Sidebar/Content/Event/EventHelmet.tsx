import parseISO from "date-fns/parseISO";
import { Helmet } from "react-helmet-async";
import { ZwiftEvent } from "../../../../types";
import { FORMAT_LONG } from "../../../../util/formats";

interface Props {
  event: ZwiftEvent;
}

export function EventHelmet({ event }: Props) {
  const description = `Event details for "${
    event.name
  }" starting ${FORMAT_LONG.format(parseISO(event.eventStart))} on Zwift`;
  return (
    <Helmet>
      <title>{event.name}</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={`${event.name} - ZwiftMap`} />
      <meta property="og:description" content={description} />
    </Helmet>
  );
}

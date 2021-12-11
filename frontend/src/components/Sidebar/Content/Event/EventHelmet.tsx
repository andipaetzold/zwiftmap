import { Helmet } from "react-helmet-async";
import { ZwiftEvent } from "../../../../services/events";

const FORMAT = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  weekday: "long",
  day: "numeric",
  month: "numeric",
  year: "numeric",
});

interface Props {
  event: ZwiftEvent;
}

export function EventHelmet({ event }: Props) {
  return (
    <Helmet>
      <title>{event.name}</title>
      <meta
        name="description"
        content={`Event details for "${event.name}" starting ${
          event.eventStart
            ? FORMAT.format(Date.parse(event.eventStart))
            : "soon"
        } on Zwift`}
      />
    </Helmet>
  );
}

import { SimpleListItem } from "@react-md/list";
import { Typography } from "@react-md/typography";
import { Helmet } from "react-helmet-async";
import { ZwiftEvent } from "../../../../services/events";
import { EventFacts } from "./EventFacts";
import { EventImage } from "./EventImage";
import { EventKit } from "./EventKit";
import { EventLinks } from "./EventLinks";
import { EventRules } from "./EventRules";
import { EventSchema } from "./EventSchema";
import { EventTimeTrial } from "./EventTimeTrial";
import { EventWorkoutChart } from "./EventWorkoutChart";

interface Props {
  event: ZwiftEvent;
}

export function EventComponent({ event }: Props) {
  return (
    <>
      <Helmet>
        <title>{event.name}</title>
      </Helmet>
      <EventSchema event={event} />

      <EventImage event={event} />

      <SimpleListItem>
        <Typography type="headline-6" style={{ margin: 0 }}>
          {event.name}
        </Typography>
      </SimpleListItem>

      <EventFacts event={event} />
      <EventWorkoutChart event={event} />
      <EventTimeTrial event={event} />
      <EventRules event={event} />
      <EventKit event={event} />
      <EventLinks event={event} />
    </>
  );
}

import { SimpleListItem } from "@react-md/list";
import { Typography } from "@react-md/typography";
import { ZwiftEvent } from "../../../../services/events";
import { EventFacts } from "./EventFacts";
import { EventImage } from "./EventImage";
import { EventKit } from "./EventKit";
import { EventLinks } from "./EventLinks";
import { EventRules } from "./EventRules";
import { EventTimeTrial } from "./EventTimeTrial";

interface Props {
  event: ZwiftEvent;
}

export function EventComponent({ event }: Props) {
  return <>
    <EventImage event={event} />

    <SimpleListItem>
      <Typography type="headline-6" style={{ margin: 0 }}>
        {event.name}
      </Typography>
    </SimpleListItem>

    <EventFacts event={event} />
    <EventTimeTrial event={event} />
    <EventRules event={event} />
    <EventKit event={event} />
    <EventLinks event={event} />
  </>;
}

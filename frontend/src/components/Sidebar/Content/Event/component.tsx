import { SimpleListItem } from "@react-md/list";
import { Typography } from "@react-md/typography";
import { ZwiftEvent } from "../../../../types";
import { EventFacts } from "./EventFacts";
import { EventHelmet } from "./EventHelmet";
import { EventImage } from "./EventImage";
import { EventKit } from "./EventKit";
import { EventLinks } from "./EventLinks";
import { EventPowerUps } from "./EventPowerUps";
import { EventRules } from "./EventRules";
import { EventSchema } from "./EventSchema";
import { EventSubgroupSelector } from "./EventSubgroupSelector";
import { EventTimeTrial } from "./EventTimeTrial";
import { EventWorkoutChart } from "./EventWorkoutChart";

interface Props {
  event: ZwiftEvent;
}

export default function EventComponent({ event }: Props) {
  return (
    <>
      <EventHelmet event={event} />
      <EventSchema event={event} />

      <EventImage event={event} />

      <SimpleListItem>
        <Typography type="headline-6" style={{ margin: 0 }}>
          {event.name}
        </Typography>
      </SimpleListItem>

      <EventSubgroupSelector event={event} />

      <EventFacts event={event} />
      <EventPowerUps event={event} />
      <EventWorkoutChart event={event} />
      <EventTimeTrial event={event} />
      <EventRules event={event} />
      <EventKit event={event} />
      <EventLinks event={event} />
    </>
  );
}

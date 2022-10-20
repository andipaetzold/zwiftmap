import { SimpleListItem } from "@react-md/list";
import { Typography } from "@react-md/typography";
import { getSubgroupFromEvent } from "../../../../services/events";
import { LocationStateUpcomingEvent } from "../../../../services/location-state";
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
  state: LocationStateUpcomingEvent;
}

export default function EventComponent({ event, state }: Props) {
  const subgroup = getSubgroupFromEvent(event, state.subgroupLabel);

  const name =
    event.eventSubgroups.length > 1 ? subgroup.name || event.name : event.name;

  return (
    <>
      <EventHelmet name={name} subgroup={subgroup} />
      <EventSchema name={name} event={event} subgroup={subgroup} />

      <EventImage event={event} />

      <SimpleListItem>
        <Typography type="headline-6" style={{ margin: 0 }}>
          {name}
        </Typography>
      </SimpleListItem>

      <EventSubgroupSelector event={event} state={state} />

      <EventFacts event={event} subgroup={subgroup} />
      <EventPowerUps event={event} subgroup={subgroup} />
      <EventWorkoutChart event={event} subgroup={subgroup} />
      <EventTimeTrial event={event} subgroup={subgroup} />
      <EventRules event={event} subgroup={subgroup} />
      <EventKit subgroup={subgroup} />
      <EventLinks event={event} subgroup={subgroup} />
    </>
  );
}

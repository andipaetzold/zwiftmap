import { SimpleListItem } from "@react-md/list";
import { Text } from "@react-md/typography";
import { ZwiftEvent } from "../../../../services/events";
import { EventFacts } from "./EventFacts";
import { EventLinks } from "./EventLinks";
import { EventRules } from "./EventRules";

interface Props {
  event: ZwiftEvent;
}

export function UpcomingEventComponent({ event }: Props) {
  return (
    <>
      <SimpleListItem>
        <Text type="headline-6" style={{ margin: 0 }}>
          {event.name}
        </Text>
      </SimpleListItem>

      <EventFacts event={event} />
      <EventRules event={event} />
      <EventLinks event={event} />
    </>
  );
}

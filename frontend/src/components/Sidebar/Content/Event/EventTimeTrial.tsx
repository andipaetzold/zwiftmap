import { ListSubheader, SimpleListItem } from "@react-md/list";
import { ZwiftEvent } from "../../../../types";

interface Props {
  event: ZwiftEvent;
}

export function EventTimeTrial({ event }: Props) {
  if (event.eventType !== "TIME_TRIAL" || !event.timeTrialOptions) {
    return null;
  }

  return (
    <>
      <ListSubheader>Time Trial</ListSubheader>

      <SimpleListItem>
        Row gap: {event.timeTrialOptions.timeGapBetweenRowsMs / 1_000}s
      </SimpleListItem>
      <SimpleListItem>
        Rider Limit:{" "}
        {event.timeTrialOptions.maxRidersPerRow *
          event.timeTrialOptions.maxRows}
      </SimpleListItem>
    </>
  );
}

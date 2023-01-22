import { ListSubheader, SimpleListItem } from "@react-md/list";
import { EventSubgroup, ZwiftEvent } from "../../../../types";

interface Props {
  event: ZwiftEvent;
  subgroup: EventSubgroup | undefined;
}

export function EventTimeTrial({ event, subgroup }: Props) {
  const timeTrialOptions = (subgroup ?? event).timeTrialOptions;
  if (event.eventType !== "TIME_TRIAL" || !timeTrialOptions) {
    return null;
  }

  return (
    <>
      <ListSubheader>Time Trial</ListSubheader>

      <SimpleListItem>
        Row gap: {timeTrialOptions.timeGapBetweenRowsMs / 1_000}s
      </SimpleListItem>
      <SimpleListItem>
        Rider Limit:{" "}
        {timeTrialOptions.maxRidersPerRow * timeTrialOptions.maxRows}
      </SimpleListItem>
    </>
  );
}

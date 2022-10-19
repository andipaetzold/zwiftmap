import { ListSubheader, SimpleListItem } from "@react-md/list";
import { EventSubgroup, ZwiftEvent } from "../../../../types";

interface Props {
  event: ZwiftEvent;
  subgroup: EventSubgroup;
}

export function EventTimeTrial({ event, subgroup }: Props) {
  if (event.eventType !== "TIME_TRIAL" || !subgroup.timeTrialOptions) {
    return null;
  }

  return (
    <>
      <ListSubheader>Time Trial</ListSubheader>

      <SimpleListItem>
        Row gap: {subgroup.timeTrialOptions.timeGapBetweenRowsMs / 1_000}s
      </SimpleListItem>
      <SimpleListItem>
        Rider Limit:{" "}
        {subgroup.timeTrialOptions.maxRidersPerRow *
          subgroup.timeTrialOptions.maxRows}
      </SimpleListItem>
    </>
  );
}

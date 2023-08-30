import { ListSubheader, SimpleListItem } from "@react-md/list";
import { EVENT_RULES } from "../../../../services/events";
import { EventSubgroup, ZwiftEvent } from "../../../../types";

interface Props {
  event: ZwiftEvent;
  subgroup: EventSubgroup | undefined;
}

export function EventRules({ event, subgroup }: Props) {
  const rulesSet = (subgroup ?? event).rulesSet.filter(
    (rule) => EVENT_RULES[rule],
  );
  if (rulesSet.length === 0 && !event.categoryEnforcement) {
    return null;
  }

  return (
    <>
      <ListSubheader>Rules</ListSubheader>

      {event.categoryEnforcement && (
        <SimpleListItem>Category enforced</SimpleListItem>
      )}
      {rulesSet.map((rule) => (
        <SimpleListItem key={rule}>{EVENT_RULES[rule]}</SimpleListItem>
      ))}
    </>
  );
}

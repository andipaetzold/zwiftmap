import { ListSubheader, SimpleListItem } from "@react-md/list";
import { EVENT_RULES } from "../../../../services/events";
import { ZwiftEvent } from "../../../../types";

interface Props {
  event: ZwiftEvent;
}

export function EventRules({ event }: Props) {
  if (event.rulesSet.length === 0 && !event.categoryEnforcement) {
    return null;
  }

  return (
    <>
      <ListSubheader>Rules</ListSubheader>

      {event.categoryEnforcement && (
        <SimpleListItem>Category enforced</SimpleListItem>
      )}
      {event.rulesSet.map((rule) => (
        <SimpleListItem key={rule}>{EVENT_RULES[rule]}</SimpleListItem>
      ))}
    </>
  );
}

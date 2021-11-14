import { Chip } from "@react-md/chip";
import { MenuItemInputToggle } from "@react-md/form";
import { List, SimpleListItem } from "@react-md/list";
import { FilterListFontIcon } from "@react-md/material-icons";
import { Menu } from "@react-md/menu";
import { BELOW_INNER_LEFT_ANCHOR, useToggle } from "@react-md/utils";
import { ZwiftEventType } from "../../../../services/events";
import { EVENT_TYPES } from "../../../../services/events/constants";

export const DEFAULT_FILTER_STATE: FilterState = {
  eventTypes: ["GROUP_WORKOUT", "GROUP_RIDE", "RACE", "TIME_TRIAL"],
};

export interface FilterState {
  eventTypes: ZwiftEventType[];
}

interface Props {
  state: FilterState;
  onChange: (newState: FilterState) => void;
}

export function EventFilterButton({ state, onChange }: Props) {
  const [menuVisible, , hideMenu, toggleMenu] = useToggle(false);

  const handleCheckedState = (
    checked: boolean,
    eventType: ZwiftEventType,
    e: React.MouseEvent<HTMLLIElement>
  ) => {
    e.stopPropagation();

    if (checked) {
      onChange({
        eventTypes: [...state.eventTypes, eventType],
      });
    } else {
      onChange({
        eventTypes: state.eventTypes.filter((type) => type !== eventType),
      });
    }
  };

  return (
    <>
      <SimpleListItem>
        <Chip
          id="filter-chip"
          onClick={(e) => {
            e.stopPropagation();
            toggleMenu();
          }}
          rightIcon={<FilterListFontIcon />}
        >
          Filter
        </Chip>

        <Menu
          id="filter-menu"
          controlId="filter-chip"
          aria-labelledby="filter-chip"
          visible={menuVisible}
          onRequestClose={hideMenu}
          anchor={BELOW_INNER_LEFT_ANCHOR}
          portal
        >
          <List>
            {Object.entries(EVENT_TYPES).map(([eventType, name]) => (
              <MenuItemInputToggle
                key={eventType}
                id={`filter-${eventType}`}
                disabled={
                  state.eventTypes.length === 1 &&
                  state.eventTypes.includes(eventType as ZwiftEventType)
                }
                checked={state.eventTypes.includes(eventType as ZwiftEventType)}
                onCheckedChange={(checked, e) => {
                  handleCheckedState(checked, eventType as ZwiftEventType, e);
                }}
                type="switch"
              >
                {name}
              </MenuItemInputToggle>
            ))}
          </List>
        </Menu>
      </SimpleListItem>
    </>
  );
}

import { Chip } from "@react-md/chip";
import { MenuItemInputToggle } from "@react-md/form";
import { List, SimpleListItem } from "@react-md/list";
import { FilterListFontIcon } from "@react-md/material-icons";
import { Menu } from "@react-md/menu";
import { BELOW_INNER_LEFT_ANCHOR, useToggle } from "@react-md/utils";
import { useSessionSettings } from "../../../../hooks/useSessionSettings";
import { ZwiftEventType } from "../../../../services/events";
import { EVENT_TYPES } from "../../../../services/events/constants";

export function EventFilterButton() {
  const [sessionSettings, setSessionSettings] = useSessionSettings();
  const { eventFilter: state } = sessionSettings;

  const [menuVisible, , hideMenu, toggleMenu] = useToggle(false);

  const handleCheckedState = (
    checked: boolean,
    eventType: ZwiftEventType,
    e: React.MouseEvent<HTMLLIElement>
  ) => {
    e.stopPropagation();

    if (checked) {
      setSessionSettings({
        ...sessionSettings,
        eventFilter: { eventTypes: [...state.eventTypes, eventType] },
      });
    } else {
      setSessionSettings({
        ...sessionSettings,
        eventFilter: {
          eventTypes: state.eventTypes.filter((type) => type !== eventType),
        },
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

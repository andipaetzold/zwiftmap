import { Chip } from "@react-md/chip";
import { MenuItemInputToggle } from "@react-md/form";
import { List, SimpleListItem } from "@react-md/list";
import { FilterListSVGIcon } from "@react-md/material-icons";
import { Menu, useMenu } from "@react-md/menu";
import { BELOW_INNER_LEFT_ANCHOR } from "@react-md/utils";
import { useState } from "react";
import { useSessionSettings } from "../../../../hooks/useSessionSettings";
import { EVENT_TYPES } from "../../../../services/events";
import { ZwiftEventType } from "../../../../types";

export function EventFilterButton() {
  const [sessionSettings, setSessionSettings] = useSessionSettings();
  const { eventFilter: state } = sessionSettings;

  const [visible, setVisible] = useState(false);
  const { menuRef, menuProps, toggleRef, toggleProps } =
    useMenu<HTMLButtonElement>({
      baseId: "filter-chip",
      visible,
      setVisible,
      anchor: BELOW_INNER_LEFT_ANCHOR,
    });

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
          rightIcon={<FilterListSVGIcon />}
          ref={toggleRef}
          {...toggleProps}
        >
          Filter
        </Chip>

        <Menu ref={menuRef} {...menuProps} portal>
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

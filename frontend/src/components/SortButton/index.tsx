import { Chip } from "@react-md/chip";
import { ListItem, SimpleListItem } from "@react-md/list";
import {
  LabelSVGIcon,
  LandscapeSVGIcon,
  SortSVGIcon,
  SpaceBarSVGIcon,
  StarSVGIcon,
} from "@react-md/material-icons";
import { Menu, useMenu } from "@react-md/menu";
import { BELOW_INNER_LEFT_ANCHOR } from "@react-md/utils";
import c from "classnames";
import { useState } from "react";
import { useSessionSettings } from "../../hooks/useSessionSettings";
import { SortKey } from "../../types";
import styles from "./index.module.scss";

const NAME_MAP: Record<SortKey, string> = {
  name: "Name",
  distance: "Distance",
  elevation: "Elevation",
  experience: "Experience",
  leadInDistance: "Lead-In Distance",
  leadInElevation: "Lead-In Elevation",
};

export function SortButton() {
  const [sessionSettings, setSessionSettings] = useSessionSettings();
  const { sortState: state } = sessionSettings;

  const [menuVisible, setMenuVisible] = useState(false);
  const { menuRef, menuProps, toggleRef, toggleProps } =
    useMenu<HTMLButtonElement>({
      baseId: "sort-button",
      visible: menuVisible,
      setVisible: setMenuVisible,
      anchor: BELOW_INNER_LEFT_ANCHOR,
    });

  const handleItemClick = (key: SortKey) => {
    if (state.key === key) {
      setSessionSettings({
        ...sessionSettings,
        sortState: { key, dir: state.dir === "ASC" ? "DESC" : "ASC" },
      });
    } else {
      setSessionSettings({
        ...sessionSettings,
        sortState: { key, dir: "ASC" },
      });
    }
  };

  return (
    <>
      <SimpleListItem role="presentation">
        <Chip
          aria-label="Sort List"
          role="listbox"
          rightIcon={
            <SortSVGIcon
              className={c({
                [styles.iconFlip]: state.dir === "ASC",
              })}
            />
          }
          ref={toggleRef}
          {...toggleProps}
        >
          {NAME_MAP[state.key]}
        </Chip>

        <Menu portal role="list" ref={menuRef} {...menuProps}>
          <ListItem
            onClick={() => handleItemClick("name")}
            leftAddon={<LabelSVGIcon />}
          >
            {NAME_MAP["name"]}
          </ListItem>
          <ListItem
            onClick={() => handleItemClick("distance")}
            leftAddon={<SpaceBarSVGIcon />}
          >
            {NAME_MAP["distance"]}
          </ListItem>
          <ListItem
            onClick={() => handleItemClick("elevation")}
            leftAddon={<LandscapeSVGIcon />}
          >
            {NAME_MAP["elevation"]}
          </ListItem>
          <ListItem
            onClick={() => handleItemClick("experience")}
            leftAddon={<StarSVGIcon />}
          >
            {NAME_MAP["experience"]}
          </ListItem>
          <ListItem
            onClick={() => handleItemClick("leadInDistance")}
            leftAddon={<SpaceBarSVGIcon />}
          >
            {NAME_MAP["leadInDistance"]}
          </ListItem>
          <ListItem
            onClick={() => handleItemClick("leadInElevation")}
            leftAddon={<LandscapeSVGIcon />}
          >
            {NAME_MAP["leadInElevation"]}
          </ListItem>
        </Menu>
      </SimpleListItem>
    </>
  );
}

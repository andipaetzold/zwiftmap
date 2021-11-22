import { Chip } from "@react-md/chip";
import { List, SimpleListItem } from "@react-md/list";
import {
  LabelFontIcon,
  LandscapeFontIcon,
  SortFontIcon,
  SpaceBarFontIcon,
  StarFontIcon,
} from "@react-md/material-icons";
import { Menu, MenuItem } from "@react-md/menu";
import { BELOW_INNER_LEFT_ANCHOR, useToggle } from "@react-md/utils";
import c from "classnames";
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
  const [menuVisible, , hideMenu, toggleMenu] = useToggle(false);

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
      <SimpleListItem>
        <Chip
          id="sort-chip"
          onClick={(e) => {
            e.stopPropagation();
            toggleMenu();
          }}
          rightIcon={
            <SortFontIcon
              className={c({
                [styles.iconFlip]: state.dir === "ASC",
              })}
            />
          }
        >
          {NAME_MAP[state.key]}
        </Chip>

        <Menu
          id="sort-menu"
          controlId="sort-chip"
          aria-labelledby="sort-chip"
          visible={menuVisible}
          onRequestClose={hideMenu}
          anchor={BELOW_INNER_LEFT_ANCHOR}
          portal
        >
          <List>
            <MenuItem
              onClick={() => handleItemClick("name")}
              leftAddon={<LabelFontIcon />}
            >
              {NAME_MAP["name"]}
            </MenuItem>
            <MenuItem
              onClick={() => handleItemClick("distance")}
              leftAddon={<SpaceBarFontIcon />}
            >
              {NAME_MAP["distance"]}
            </MenuItem>
            <MenuItem
              onClick={() => handleItemClick("elevation")}
              leftAddon={<LandscapeFontIcon />}
            >
              {NAME_MAP["elevation"]}
            </MenuItem>
            <MenuItem
              onClick={() => handleItemClick("experience")}
              leftAddon={<StarFontIcon />}
            >
              {NAME_MAP["experience"]}
            </MenuItem>
            <MenuItem
              onClick={() => handleItemClick("leadInDistance")}
              leftAddon={<SpaceBarFontIcon />}
            >
              {NAME_MAP["leadInDistance"]}
            </MenuItem>
            <MenuItem
              onClick={() => handleItemClick("leadInElevation")}
              leftAddon={<LandscapeFontIcon />}
            >
              {NAME_MAP["leadInElevation"]}
            </MenuItem>
          </List>
        </Menu>
      </SimpleListItem>
    </>
  );
}

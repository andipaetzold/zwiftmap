import { Chip } from "@react-md/chip";
import { ListItem, SimpleListItem } from "@react-md/list";
import {
  LabelSVGIcon,
  LandscapeSVGIcon,
  SortSVGIcon,
  SpaceBarSVGIcon,
  StarSVGIcon
} from "@react-md/material-icons";
import { Menu } from "@react-md/menu";
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
      <SimpleListItem role="presentation">
        <Chip
          id="sort-menu-button"
          aria-controls="sort-menu"
          aria-label="Sort List"
          role="listbox"
          onClick={(e) => {
            e.stopPropagation();
            toggleMenu();
          }}
          rightIcon={
            <SortSVGIcon
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
          controlId="sort-menu-button"
          aria-labelledby="sort-menu-button"
          visible={menuVisible}
          onRequestClose={hideMenu}
          anchor={BELOW_INNER_LEFT_ANCHOR}
          portal
          // @ts-ignore
          role="list"
        >
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

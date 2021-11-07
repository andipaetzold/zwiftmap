import { TextIconSpacing } from "@react-md/icon";
import { SimpleListItem } from "@react-md/list";
import {
  LabelFontIcon,
  LandscapeFontIcon,
  SortFontIcon,
  SpaceBarFontIcon,
  StarFontIcon,
} from "@react-md/material-icons";
import { DropdownMenu } from "@react-md/menu";
import { BELOW_INNER_LEFT_ANCHOR } from "@react-md/utils";
import c from "classnames";
import styles from "./SortButton.module.scss";

export type SortKey =
  | "name"
  | "distance"
  | "elevation"
  | "experience"
  | "leadInDistance"
  | "leadInElevation";
export type SortDir = "ASC" | "DESC";

export interface SortState {
  key: SortKey;
  dir: SortDir;
}

const NAME_MAP: Record<SortKey, string> = {
  name: "Name",
  distance: "Distance",
  elevation: "Elevation",
  experience: "Experience",
  leadInDistance: "Lead-In Distance",
  leadInElevation: "Lead-In Elevation",
};

interface Props {
  state: SortState;
  onChange: (newState: SortState) => void;
}

export function SortButton({ state, onChange }: Props) {
  const handleItemClick = (key: SortKey) => {
    if (state.key === key) {
      onChange({ key, dir: state.dir === "ASC" ? "DESC" : "ASC" });
    } else {
      onChange({ key, dir: "ASC" });
    }
  };

  return (
    <>
      <SimpleListItem>
        <DropdownMenu
          id="sort-button"
          themeType="outline"
          items={[
            {
              onClick: () => handleItemClick("name"),
              leftAddon: <LabelFontIcon />,
              children: NAME_MAP["name"],
            },
            {
              onClick: () => handleItemClick("distance"),
              leftAddon: <SpaceBarFontIcon />,
              children: NAME_MAP["distance"],
            },
            {
              onClick: () => handleItemClick("elevation"),
              leftAddon: <LandscapeFontIcon />,
              children: NAME_MAP["elevation"],
            },
            {
              onClick: () => handleItemClick("experience"),
              leftAddon: <StarFontIcon />,
              children: NAME_MAP["experience"],
            },
            {
              onClick: () => handleItemClick("leadInDistance"),
              leftAddon: <SpaceBarFontIcon />,
              children: NAME_MAP["leadInDistance"],
            },
            {
              onClick: () => handleItemClick("leadInElevation"),
              leftAddon: <LandscapeFontIcon />,
              children: NAME_MAP["leadInElevation"],
            },
          ]}
          anchor={BELOW_INNER_LEFT_ANCHOR}
        >
          <TextIconSpacing
            icon={
              <SortFontIcon
                className={c({
                  [styles.iconFlip]: state.dir === "ASC",
                })}
              />
            }
          >
            {NAME_MAP[state.key]}
          </TextIconSpacing>
        </DropdownMenu>
      </SimpleListItem>
    </>
  );
}

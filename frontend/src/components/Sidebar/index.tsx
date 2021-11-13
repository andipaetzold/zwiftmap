import { Divider } from "@react-md/divider";
import { List, SimpleListItem } from "@react-md/list";
import {
  KeyboardArrowDownFontIcon,
  KeyboardArrowUpFontIcon,
} from "@react-md/material-icons";
import c from "classnames";
import React, { useRef, useState } from "react";
import { useLocationState } from "../../services/location-state";
import { HoverData } from "../../types";
import { Content } from "./Content";
import styles from "./index.module.scss";
import { MenuButton } from "./MenuButton";
import { SearchInput } from "./SearchInput";

interface Props {
  onMouseHoverDistanceChange: (distance: number | undefined) => void;
  onHoverRoute: (data: HoverData) => void;
}

export function Sidebar({ onMouseHoverDistanceChange, onHoverRoute }: Props) {
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [locationState] = useLocationState();

  return (
    <>
      <div
        className={c(styles.Container, {
          [styles.BottomSheetOpen]: bottomSheetOpen,
        })}
        ref={containerRef}
      >
        <button
          className={styles.DragHandle}
          onClick={() => setBottomSheetOpen(false)}
        >
          <KeyboardArrowDownFontIcon />
        </button>
        <List className={styles.SearchBox}>
          <SimpleListItem>
            <SearchInput />
          </SimpleListItem>
          <Divider className={styles.NoGapDivider} />
        </List>

        <div className={styles.Content} key={locationState.key}>
          <Content
            onHoverRoute={onHoverRoute}
            onMouseHoverDistanceChange={onMouseHoverDistanceChange}
          />
        </div>

        <List className={styles.BottomMenu}>
          <Divider className={styles.NoGapDivider} />
          <MenuButton onBottomSheetClose={() => setBottomSheetOpen(false)} />
        </List>
      </div>

      <button
        className={c(styles.DragHandle, styles.DragHandleBottom, {
          [styles.BottomSheetOpen]: bottomSheetOpen,
        })}
        onClick={() => setBottomSheetOpen(true)}
      >
        <KeyboardArrowUpFontIcon />
      </button>
    </>
  );
}

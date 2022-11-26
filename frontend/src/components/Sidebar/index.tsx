import { List, SimpleListItem } from "@react-md/list";
import {
  KeyboardArrowDownSVGIcon,
  KeyboardArrowUpSVGIcon,
} from "@react-md/material-icons";
import { MenuItemSeparator } from "@react-md/menu";
import c from "classnames";
import { useRef, useState } from "react";
import { useLocationState } from "../../services/location-state";
import { Content } from "./Content";
import styles from "./index.module.scss";
import { MenuButton } from "./MenuButton";
import { SearchInput } from "./SearchInput";

export function Sidebar() {
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const state = useLocationState();

  return (
    <>
      <div
        className={c(styles.Container, {
          [styles.BottomSheetOpen]: bottomSheetOpen,
        })}
        ref={containerRef}
        role="main"
      >
        <button
          className={styles.DragHandle}
          onClick={() => setBottomSheetOpen(false)}
        >
          <KeyboardArrowDownSVGIcon />
        </button>

        <List className={styles.SearchBox}>
          <SimpleListItem>
            <SearchInput />
          </SimpleListItem>
          <MenuItemSeparator className={styles.NoGapDivider} />
        </List>

        <div className={styles.Content} key={state.key}>
          <Content />
        </div>

        <List className={styles.BottomMenu}>
          <MenuItemSeparator className={styles.NoGapDivider} />
          <MenuButton onBottomSheetClose={() => setBottomSheetOpen(false)} />
        </List>
      </div>

      <button
        className={c(styles.DragHandle, styles.DragHandleBottom, {
          [styles.BottomSheetOpen]: bottomSheetOpen,
        })}
        onClick={() => setBottomSheetOpen(true)}
      >
        <KeyboardArrowUpSVGIcon />
      </button>
    </>
  );
}

import { Divider } from "@react-md/divider";
import { List, SimpleListItem } from "@react-md/list";
import {
  KeyboardArrowDownFontIcon,
  KeyboardArrowUpFontIcon,
} from "@react-md/material-icons";
import c from "classnames";
import React, { useRef, useState } from "react";
import { Content } from "./Content";
import styles from "./index.module.scss";
import { SearchInput } from "./SearchInput";

interface Props {
  onMouseHoverDistanceChange: (distance: number | undefined) => void;
  onHoverRoute: (previewRoute: string | undefined) => void;
}

export function Sidebar({ onMouseHoverDistanceChange, onHoverRoute }: Props) {
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

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

        <Content
          onHoverRoute={onHoverRoute}
          onMouseHoverDistanceChange={onMouseHoverDistanceChange}
        />
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

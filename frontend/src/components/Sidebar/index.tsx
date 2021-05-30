import { Divider } from "@react-md/divider";
import { List, SimpleListItem } from "@react-md/list";
import {
  KeyboardArrowDownFontIcon,
  KeyboardArrowUpFontIcon,
} from "@react-md/material-icons";
import c from "classnames";
import React, { useRef, useState } from "react";
import { useLocationState } from "../../hooks/useLocationState";
import { Details } from "./Details";
import styles from "./index.module.scss";
import { MenuButton } from "./MenuButton";
import { RouteList } from "./RouteList";
import { SearchInput } from "./SearchInput";
import { SearchResultList } from "./SearchResultList";
import { StravaActivitiesList } from "./StravaActivitiesList";

interface Props {
  onMouseHoverDistanceChange: (distance: number | undefined) => void;
  onHoverRoute: (previewRoute: string | undefined) => void;
}

export function Sidebar({ onMouseHoverDistanceChange, onHoverRoute }: Props) {
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [locationState, setLocationState] = useLocationState();
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
        <div className={styles.Content}>
          {locationState.type === "route" ||
          locationState.type === "strava-activity" ? (
            <Details
              onMouseHoverDistanceChange={onMouseHoverDistanceChange}
              backButtonText={
                locationState.query === ""
                  ? "Route List"
                  : "Search Results"
              }
              onBackButtonClick={() => {
                setLocationState({
                  world: locationState.world,
                  query: locationState.query,
                  type: "default",
                });
              }}
            />
          ) : locationState.type === "strava-activities" ? (
            <StravaActivitiesList />
          ) : (
            <List>
              {locationState.query === "" ? (
                <RouteList onHoverRoute={onHoverRoute} />
              ) : (
                <SearchResultList onHoverRoute={onHoverRoute} />
              )}
            </List>
          )}
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

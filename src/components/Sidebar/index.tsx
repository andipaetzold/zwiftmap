import { Button } from "@react-md/button";
import { Divider } from "@react-md/divider";
import { TextField } from "@react-md/form";
import { FontIcon } from "@react-md/icon";
import { List, ListItem, SimpleListItem } from "@react-md/list";
import {
  KeyboardArrowDownFontIcon,
  KeyboardArrowUpFontIcon,
  SettingsFontIcon,
} from "@react-md/material-icons";
import c from "classnames";
import React, { useRef, useState } from "react";
import { routes, worlds } from "../../data";
import { useLocationState } from "../../hooks/useLocationState";
import { useSettings } from "../../hooks/useSettings";
import { search, SearchResult } from "../../services/search";
import { SettingsDialog } from "../SettingsDialog";
import { Details } from "./Details";
import styles from "./index.module.scss";
import { SearchResultCardRoute } from "./SearchResultCardRoute";
import { SearchResultList } from "./SearchResultList";

interface Props {
  onMouseHoverDistanceChange: (distance: number | undefined) => void;
  onHoverRoute: (previewRoute: string | undefined) => void;
}

export function Sidebar({ onMouseHoverDistanceChange, onHoverRoute }: Props) {
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [locationState, setLocationState] = useLocationState();
  const [query, setQuery] = useState("");
  const [settings] = useSettings();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [settingsDialogVisible, setSettingsDialogVisible] = useState(false);

  const searchResults = search(query, settings.sport);

  const handleSearchResultClick = (searchResult: SearchResult) => {
    switch (searchResult.type) {
      case "world":
        setLocationState({ world: searchResult.data });
        setQuery("");
        break;
      case "route":
        setLocationState({
          world: worlds.find((w) => w.slug === searchResult.data.world)!,
          route: searchResult.data,
        });
        break;
    }
  };

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
            <TextField
              id="search-input"
              style={{ width: "100%" }}
              placeholder="Search for worlds and routes…"
              value={query}
              onChange={(e) => {
                setLocationState({ world: locationState.world });
                setQuery(e.target.value);
              }}
              isRightAddon={false}
              rightChildren={
                query !== "" && (
                  <Button
                    buttonType="icon"
                    style={{ right: 0, position: "absolute" }}
                    onClick={() => {
                      setQuery("");
                    }}
                    aria-label="Clear search field"
                  >
                    <FontIcon>clear</FontIcon>
                  </Button>
                )
              }
            />
          </SimpleListItem>
          <Divider className={styles.NoGapDivider} />
        </List>
        <div className={styles.Content}>
          {locationState.route ? (
            <Details
              onMouseHoverDistanceChange={onMouseHoverDistanceChange}
              backButtonText={
                query === "" ? "Back to route list" : "Back to search results"
              }
              onBackButtonClick={() => {
                setLocationState({ ...locationState, route: undefined });
              }}
            />
          ) : (
            <List>
              {query === "" ? (
                <>
                  {routes
                    .filter((route) => route.world === locationState.world.slug)
                    .filter((route) => route.sports.includes(settings.sport))
                    .filter((route) => route.stravaSegmentId !== undefined)
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((route) => (
                      <SearchResultCardRoute
                        route={route}
                        key={route.slug}
                        onClick={() => {
                          setLocationState({
                            world: worlds.find((w) => w.slug === route.world)!,
                            route,
                          });
                        }}
                        onHoverRoute={onHoverRoute}
                      />
                    ))}
                </>
              ) : (
                <SearchResultList
                  searchResults={searchResults}
                  onResultClick={handleSearchResultClick}
                  onHoverRoute={onHoverRoute}
                />
              )}
            </List>
          )}
        </div>
        <List className={styles.BottomMenu}>
          <Divider className={styles.NoGapDivider} />
          <ListItem
            onClick={() => {
              setBottomSheetOpen(false);
              setSettingsDialogVisible(true);
            }}
            leftAddon={<SettingsFontIcon />}
            leftAddonType="icon"
          >
            Settings
          </ListItem>
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

      <SettingsDialog
        visible={settingsDialogVisible}
        onClose={() => setSettingsDialogVisible(false)}
      />
    </>
  );
}

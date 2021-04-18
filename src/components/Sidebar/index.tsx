import { Button } from "@react-md/button";
import { Divider } from "@react-md/divider";
import { TextField } from "@react-md/form";
import { FontIcon } from "@react-md/icon";
import { List, ListItem, SimpleListItem } from "@react-md/list";
import { DragHandleFontIcon, SettingsFontIcon } from "@react-md/material-icons";
import React, { useRef, useState } from "react";
import Draggable from "./BottomSheet/Draggable";
import useResizeObserver from "use-resize-observer";
import { routes, worlds } from "../../data";
import { useLocationState } from "../../hooks/useLocationState";
import { useSettings } from "../../hooks/useSettings";
import { search, SearchResult } from "../../services/search";
import { SettingsDialog } from "../SettingsDialog";
import { Details } from "./Details";
import styles from "./index.module.scss";
import { SearchResultCardRoute } from "./SearchResultCardRoute";
import { SearchResultList } from "./SearchResultList";
import { useIsDesktop } from "../../hooks/useIsDesktop";
import { useWindowHeight } from "../../hooks/useWindowHeight";

const DRAG_HANDLE_HEIGHT = 24;

interface Props {
  onMouseHoverDistanceChange: (distance: number | undefined) => void;
}

export function Sidebar({ onMouseHoverDistanceChange }: Props) {
  const windowHeight = useWindowHeight();
  const isDesktop = useIsDesktop();
  const [locationState, setLocationState] = useLocationState();
  const [query, setQuery] = useState("");
  const [settings] = useSettings();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { height: containerHeight } = useResizeObserver<HTMLDivElement>({
    ref: containerRef,
  });

  const [settingsDialogVisible, setSettingsDialogVisible] = useState(false);

  const searchResults = search(query, settings.sport);

  const handleSearchResultClick = (searchResult: SearchResult) => {
    switch (searchResult.type) {
      case "world":
        setLocationState({ world: searchResult.data });
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
      <Draggable
        defaultPosition={windowHeight - DRAG_HANDLE_HEIGHT}
        bounds={{
          top: windowHeight - (containerHeight ?? DRAG_HANDLE_HEIGHT),
          bottom: windowHeight - DRAG_HANDLE_HEIGHT,
        }}
        disabled={isDesktop}
        nodeRef={containerRef}
      >
        <div className={styles.Container} ref={containerRef}>
          <div className={styles.DragHandle}>
            <DragHandleFontIcon />
          </div>
          <List className={styles.SearchBox}>
            <SimpleListItem>
              <TextField
                id="search-input"
                style={{ width: "100%" }}
                placeholder="Search for worlds and routes…"
                value={query}
                onChange={(e) => {
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
                      .filter(
                        (route) => route.world === locationState.world.slug
                      )
                      .filter((route) => route.sports.includes(settings.sport))
                      .filter((route) => route.stravaSegmentId !== undefined)
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((route) => (
                        <SearchResultCardRoute
                          route={route}
                          key={route.slug}
                          onClick={() => {
                            setLocationState({
                              world: worlds.find(
                                (w) => w.slug === route.world
                              )!,
                              route,
                            });
                          }}
                        />
                      ))}
                  </>
                ) : (
                  <SearchResultList
                    searchResults={searchResults}
                    onResultClick={handleSearchResultClick}
                  />
                )}
              </List>
            )}
          </div>
          <List className={styles.BottomMenu}>
            <Divider className={styles.NoGapDivider} />
            <ListItem
              onClick={() => setSettingsDialogVisible(true)}
              leftAddon={<SettingsFontIcon />}
              leftAddonType="icon"
            >
              Settings
            </ListItem>
          </List>
        </div>
      </Draggable>
      <SettingsDialog
        visible={settingsDialogVisible}
        onClose={() => setSettingsDialogVisible(false)}
      />
    </>
  );
}

import { Button } from "@react-md/button";
import { Divider } from "@react-md/divider";
import { TextField } from "@react-md/form";
import { FontIcon } from "@react-md/icon";
import { List, ListItem, SimpleListItem } from "@react-md/list";
import React, { useState } from "react";
import { routes, worlds } from "../../data";
import { useLocationState } from "../../hooks/useLocationState";
import { useSettings } from "../../hooks/useSettings";
import { search, SearchResult } from "../../services/search";
import { SettingsDialog } from "../SettingsDialog";
import styles from "./index.module.css";
import { SearchResultCardRoute } from "./SearchResultCardRoute";
import { SearchResultList } from "./SearchResultList";

export function Sidebar() {
  const [locationState, setLocationState] = useLocationState();
  const [query, setQuery] = useState("");
  const [settings] = useSettings();

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
      <div className={styles.Container}>
        <List style={{ width: "100%" }} className={styles.SearchBox}>
          <SimpleListItem>
            <TextField
              id="search-input"
              style={{ width: "100%" }}
              placeholder={locationState.world.name}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              isRightAddon={false}
              rightChildren={
                query !== "" && (
                  <Button
                    buttonType="icon"
                    style={{ right: 0, position: "absolute" }}
                    onClick={() => setQuery("")}
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
        <List className={styles.List}>
          {query === "" ? (
            <>
              {routes
                .filter((route) => route.world === locationState.world.slug)
                .filter((route) => route.sport === settings.sport)
                .filter((route) => route.stravaSegmentId !== undefined)
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((route) => (
                  <SearchResultCardRoute
                    route={route}
                    key={route.slug}
                    onClick={() =>
                      setLocationState({
                        world: worlds.find((w) => w.slug === route.world)!,
                        route,
                      })
                    }
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
        <List className={styles.BottomMenu}>
          <Divider className={styles.NoGapDivider} />
          <ListItem onClick={() => setSettingsDialogVisible(true)}>
            Settings
          </ListItem>
        </List>
      </div>
      <SettingsDialog
        visible={settingsDialogVisible}
        onClose={() => setSettingsDialogVisible(false)}
      />
    </>
  );
}

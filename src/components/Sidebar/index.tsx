import { Button } from "@react-md/button";
import { Divider } from "@react-md/divider";
import { TextField } from "@react-md/form";
import { FontIcon } from "@react-md/icon";
import { List, ListItem, SimpleListItem } from "@react-md/list";
import React, { useState } from "react";
import { routes, worlds } from "../../data";
import { useSettings } from "../../hooks/useSettings";
import { search, SearchResult } from "../../services/search";
import { RouteSelection } from "../../types";
import { SettingsDialog } from "../SettingsDialog";
import styles from "./index.module.css";
import { SearchResultCardRoute } from "./SearchResultCardRoute";
import { SearchResultList } from "./SearchResultList";

interface Props {
  selection: RouteSelection;
  onChange: (route: RouteSelection) => void;
}
export function Sidebar({ selection, onChange }: Props) {
  const [query, setQuery] = useState("");
  const [settings] = useSettings();

  const [settingsDialogVisible, setSettingsDialogVisible] = useState(false);

  const searchResults = search(query, settings.sport);

  const handleSearchResultClick = (searchResult: SearchResult) => {
    switch (searchResult.type) {
      case "world":
        onChange({ world: searchResult.data.slug });
        break;
      case "route":
        onChange({ world: searchResult.data.world, route: searchResult.data });
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
              placeholder={worlds.find((w) => w.slug === selection.world)!.name}
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
                .filter((route) => route.world === selection.world)
                .filter((route) => route.sport === settings.sport)
                .filter((route) => route.stravaSegmentId !== undefined)
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((route) => (
                  <SearchResultCardRoute
                    route={route}
                    key={route.slug}
                    onClick={() =>
                      onChange({ world: route.world, route: route })
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

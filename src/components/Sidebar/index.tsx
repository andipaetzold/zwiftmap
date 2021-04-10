import { Button } from "@react-md/button";
import { Divider } from "@react-md/divider";
import { TextField } from "@react-md/form";
import { FontIcon } from "@react-md/icon";
import { List, ListItem, ListSubheader, SimpleListItem } from "@react-md/list";
import React, { useState } from "react";
import { routes, worlds } from "../../data";
import { search, SearchResult, searchResultTypes } from "../../services/search";
import { RouteSelection } from "../../types";
import styles from "./index.module.css";

interface Props {
  selection: RouteSelection;
  onChange: (route: RouteSelection) => void;
}
export function Sidebar({ selection, onChange }: Props) {
  const [query, setQuery] = useState("");

  const searchResults = search(query);

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
    <div className={styles.Container}>
      <List style={{ width: "100%" }}>
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
        {query === "" ? (
          <>
            <Divider />
            {routes
              .filter((route) => route.world === selection.world)
              .filter((route) => route.sport === "cycling")
              .filter((route) => route.stravaSegmentId !== undefined)
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((route) => (
                <ListItem
                  key={route.slug}
                  onClick={() => onChange({ world: route.world, route: route })}
                >
                  {route.name}
                </ListItem>
              ))}
          </>
        ) : (
          <div>
            {searchResults.map((searchResult, i) => (
              <>
                {searchResults[i - 1]?.type !== searchResult.type && (
                  <>
                    <Divider />
                    <ListSubheader>
                      {searchResultTypes[searchResult.type].title}
                    </ListSubheader>
                  </>
                )}
                <ListItem onClick={() => handleSearchResultClick(searchResult)}>
                  {searchResult.data.name}
                </ListItem>
              </>
            ))}
          </div>
        )}
      </List>
    </div>
  );
}

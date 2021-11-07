import { ListSubheader, SimpleListItem } from "@react-md/list";
import React, { useState } from "react";
import { Route, World } from "zwift-data";
import { useLocationState } from "../../hooks/useLocationState";
import { useSettings } from "../../hooks/useSettings";
import {
  search,
  SearchResult,
  SEARCH_RESULTS_ORDER,
  SEARCH_RESULTS_TYPES,
} from "../../services/search";
import { sortRoute, sortWorld } from "../../util/sort";
import { ListItemRoute } from "./ListItemRoute";
import { ListItemStravaActivity } from "./ListItemStravaActivity";
import { ListItemWorld } from "./ListItemWorld";
import { SortButton, SortState } from "./SortButton";

interface Props {
  onHoverRoute: (route?: string) => void;
}

export function SearchResultList({ onHoverRoute }: Props) {
  const [locationState] = useLocationState();
  const [settings] = useSettings();
  const [sortState, setSortState] = useState<SortState>({
    key: "name",
    dir: "ASC",
  });
  const searchResults = search(locationState.query, settings.sport);

  if (Object.values(searchResults).flat().length === 0) {
    return <SimpleListItem>No worlds or routes found</SimpleListItem>;
  }

  return (
    <>
      <SortButton onChange={setSortState} state={sortState} />

      {SEARCH_RESULTS_ORDER.map((type) => (
        <SearchResultsTypeList
          key={type}
          results={searchResults[type]}
          type={type}
          onHoverRoute={onHoverRoute}
          sortState={sortState}
        />
      ))}
    </>
  );
}

interface SearchResultsTypeListProps {
  results: ReadonlyArray<SearchResult>;
  type: SearchResult["type"];
  onHoverRoute: (route?: string) => void;
  sortState: SortState;
}
function SearchResultsTypeList({
  results,
  type,
  onHoverRoute,
  sortState,
}: SearchResultsTypeListProps) {
  if (results.length === 0) {
    return null;
  }
  return (
    <>
      <ListSubheader>{SEARCH_RESULTS_TYPES[type].title}</ListSubheader>

      {[...results]
        .sort((a, b) => {
          switch (type) {
            case "world":
              return sortWorld(sortState, a.data as World, b.data as World);
            case "route":
              return sortRoute(sortState, a.data as Route, b.data as Route);
            default:
              return 0;
          }
        })
        .map((result, resultIndex) => (
          <SearchResultCard
            key={resultIndex}
            searchResult={result}
            onHoverRoute={onHoverRoute}
          />
        ))}
    </>
  );
}

interface SearchResultCardProps {
  searchResult: SearchResult;
  onHoverRoute: (route?: string) => void;
}

function SearchResultCard({
  searchResult,
  onHoverRoute,
}: SearchResultCardProps) {
  switch (searchResult.type) {
    case "world":
      return <ListItemWorld world={searchResult.data} />;
    case "route":
      return (
        <ListItemRoute
          route={searchResult.data}
          onHoverRoute={onHoverRoute}
          showWorldName={true}
        />
      );
    case "strava-activity":
      return (
        <ListItemStravaActivity
          activity={searchResult.data}
          onHoverRoute={onHoverRoute}
        />
      );
    default:
      return null;
  }
}

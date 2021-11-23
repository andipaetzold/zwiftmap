import { List, ListSubheader, SimpleListItem } from "@react-md/list";
import React from "react";
import { Route, World } from "zwift-data";
import { useSessionSettings } from "../../../../hooks/useSessionSettings";
import { useSettings } from "../../../../hooks/useSettings";
import {
  search,
  SearchResult,
  SEARCH_RESULTS_ORDER,
  SEARCH_RESULTS_TYPES,
} from "../../../../services/search";
import { HoverData, SortState } from "../../../../types";
import { sortRoute, sortWorld } from "../../../../util/sort";
import { SortButton } from "../../../SortButton";
import { ListItemRoute } from "./Items/ListItemRoute";
import { ListItemStravaActivity } from "./Items/ListItemStravaActivity";
import { ListItemWorld } from "./Items/ListItemWorld";

interface Props {
  onHoverRoute: (data: HoverData) => void;
  query: string;
}

export function SearchResultList({ onHoverRoute, query }: Props) {
  const [settings] = useSettings();
  const [{ sortState }] = useSessionSettings();

  const searchResults = search(query, settings.sport);

  if (Object.values(searchResults).flat().length === 0) {
    return <SimpleListItem>No worlds or routes found</SimpleListItem>;
  }

  return (
    <List>
      <SortButton />

      {SEARCH_RESULTS_ORDER.map((type) => (
        <SearchResultsTypeList
          key={type}
          results={searchResults[type]}
          type={type}
          onHoverRoute={onHoverRoute}
          sortState={sortState}
        />
      ))}
    </List>
  );
}

interface SearchResultsTypeListProps {
  results: ReadonlyArray<SearchResult>;
  type: SearchResult["type"];
  onHoverRoute: (data: HoverData) => void;
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
  onHoverRoute: (data: HoverData) => void;
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

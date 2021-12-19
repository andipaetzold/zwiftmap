import { List, ListSubheader, SimpleListItem } from "@react-md/list";
import React from "react";
import { Helmet } from "react-helmet-async";
import { Route, Segment, World } from "zwift-data";
import { useSessionSettings } from "../../../../hooks/useSessionSettings";
import { useSettings } from "../../../../hooks/useSettings";
import {
  search,
  SearchResult,
  SEARCH_RESULTS_ORDER,
  SEARCH_RESULTS_TYPES,
} from "../../../../services/search";
import { SortState } from "../../../../types";
import { sortRoute, sortSegment, sortWorld } from "../../../../util/sort";
import { ListItemRoute } from "../../../ListItemRoute";
import { SortButton } from "../../../SortButton";
import { ListItemSegment } from "./Items/ListItemSegment";
import { ListItemStravaActivity } from "./Items/ListItemStravaActivity";
import { ListItemWorld } from "./Items/ListItemWorld";

interface Props {
  query: string;
}

export function SearchResultList({ query }: Props) {
  const [settings] = useSettings();
  const [{ sortState }] = useSessionSettings();

  const searchResults = search(query, settings.sport);

  if (Object.values(searchResults).flat().length === 0) {
    return <SimpleListItem>No worlds or routes found</SimpleListItem>;
  }

  return (
    <List>
      <Helmet>
        <title>Search Results</title>
        <meta property="og:title" content={`Search Results - ZwiftMap`} />
      </Helmet>

      <SortButton />

      {SEARCH_RESULTS_ORDER.map((type) => (
        <SearchResultsTypeList
          key={type}
          results={searchResults[type]}
          type={type}
          sortState={sortState}
        />
      ))}
    </List>
  );
}

interface SearchResultsTypeListProps {
  results: ReadonlyArray<SearchResult>;
  type: SearchResult["type"];
  sortState: SortState;
}
function SearchResultsTypeList({
  results,
  type,
  sortState,
}: SearchResultsTypeListProps) {
  if (results.length === 0) {
    return null;
  }

  return (
    <List
      style={{ marginTop: 0, marginBottom: 0 }}
      role="list"
      aria-labelledby={`${type}-header`}
    >
      <ListSubheader id={`${type}-header`} role="none">
        {SEARCH_RESULTS_TYPES[type].title}
      </ListSubheader>

      {[...results]
        .sort((a, b) => {
          switch (type) {
            case "world":
              return sortWorld(sortState, a.data as World, b.data as World);
            case "route":
              return sortRoute(sortState, a.data as Route, b.data as Route);
            case "segment":
              return sortSegment(
                sortState,
                a.data as Segment,
                b.data as Segment
              );
            default:
              return 0;
          }
        })
        .map((result, resultIndex) => (
          <SearchResultCard key={resultIndex} searchResult={result} />
        ))}
    </List>
  );
}

interface SearchResultCardProps {
  searchResult: SearchResult;
}

function SearchResultCard({ searchResult }: SearchResultCardProps) {
  switch (searchResult.type) {
    case "world":
      return <ListItemWorld world={searchResult.data} />;
    case "route":
      return <ListItemRoute route={searchResult.data} showWorldName={true} />;
    case "segment":
      return (
        <ListItemSegment segment={searchResult.data} showWorldName={true} />
      );
    case "strava-activity":
      return <ListItemStravaActivity activity={searchResult.data} />;
    default:
      return null;
  }
}

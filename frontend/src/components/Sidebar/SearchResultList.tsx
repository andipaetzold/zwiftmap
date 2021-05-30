import { Divider } from "@react-md/divider";
import { ListSubheader, SimpleListItem } from "@react-md/list";
import React, { Fragment } from "react";
import { useLocationState } from "../../hooks/useLocationState";
import { useSettings } from "../../hooks/useSettings";
import { search, SearchResult, searchResultTypes } from "../../services/search";
import { ListItemRoute } from "./ListItemRoute";
import { ListItemStravaActivity } from "./ListItemStravaActivity";
import { ListItemWorld } from "./ListItemWorld";

interface Props {
  onHoverRoute: (route?: string) => void;
}

export function SearchResultList({ onHoverRoute }: Props) {
  const [locationState] = useLocationState();
  const [settings] = useSettings();
  const searchResults = search(locationState.query, settings.sport);

  if (searchResults.length === 0) {
    return <SimpleListItem>No worlds or routes found</SimpleListItem>;
  }

  return (
    <>
      {searchResults.map((searchResult, i) => (
        <Fragment key={searchResult.data.slug}>
          {searchResults[i - 1]?.type !== searchResult.type && (
            <>
              {searchResults[i - 1] && <Divider />}
              <ListSubheader>
                {searchResultTypes[searchResult.type].title}
              </ListSubheader>
            </>
          )}
          <SearchResultCard
            searchResult={searchResult}
            onHoverRoute={onHoverRoute}
          />
        </Fragment>
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

import { Divider } from "@react-md/divider";
import { ListSubheader } from "@react-md/list";
import React, { Fragment } from "react";
import { SearchResult, searchResultTypes } from "../../services/search";
import { SearchResultCardRoute } from "./SearchResultCardRoute";
import { SearchResultCardWorld } from "./SearchResultCardWorld";

interface Props {
  searchResults: ReadonlyArray<SearchResult>;
  onResultClick: (searchResult: SearchResult) => void;
}

export function SearchResultList({ searchResults, onResultClick }: Props) {
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
            onClick={() => onResultClick(searchResult)}
          />
        </Fragment>
      ))}
    </>
  );
}

interface SearchResultCardProps {
  searchResult: SearchResult;
  onClick: () => void;
}

function SearchResultCard({ searchResult, onClick }: SearchResultCardProps) {
  switch (searchResult.type) {
    case "world":
      return (
        <SearchResultCardWorld world={searchResult.data} onClick={onClick} />
      );
    case "route":
      return (
        <SearchResultCardRoute route={searchResult.data} onClick={onClick} />
      );
    default:
      return null;
  }
}

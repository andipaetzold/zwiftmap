import { Divider } from "@react-md/divider";
import { ListItem, ListSubheader } from "@react-md/list";
import React from "react";
import { SearchResult, searchResultTypes } from "../../services/search";

interface Props {
  searchResults: ReadonlyArray<SearchResult>;
  onResultClick: (searchResult: SearchResult) => void;
}

export function SearchResultList({ searchResults, onResultClick }: Props) {
  return (
    <>
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
          <ListItem onClick={() => onResultClick(searchResult)}>
            {searchResult.data.name}
          </ListItem>
        </>
      ))}
    </>
  );
}

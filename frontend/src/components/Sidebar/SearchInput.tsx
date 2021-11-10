import { Button } from "@react-md/button";
import { TextField } from "@react-md/form";
import { FontIcon } from "@react-md/icon";
import React from "react";
import { DEFAULT_WORLD, useLocationState } from "../../services/location-state";

export function SearchInput() {
  const [locationState, setLocationState] = useLocationState();
  return (
    <TextField
      id="search-input"
      style={{ width: "100%" }}
      placeholder="Search for worlds and routes…"
      value={locationState.query}
      onChange={(e) => {
        setLocationState({
          world: locationState.world ?? DEFAULT_WORLD,
          type: "default",
          query: e.target.value,
        });
      }}
      isRightAddon={false}
      rightChildren={
        locationState.query !== "" && (
          <Button
            buttonType="icon"
            style={{ right: 0, position: "absolute" }}
            onClick={() => {
              setLocationState({ ...locationState, query: "" });
            }}
            aria-label="Clear search field"
          >
            <FontIcon>clear</FontIcon>
          </Button>
        )
      }
    />
  );
}

import { Button } from "@react-md/button";
import { TextField } from "@react-md/form";
import { FontIcon } from "@react-md/icon";
import React from "react";
import { useLocationState } from "../../hooks/useLocationState";

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
          world: locationState.world,
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

import { Button } from "@react-md/button";
import { TextField } from "@react-md/form";
import { ClearSVGIcon } from "@react-md/material-icons";
import { useStore } from "../../hooks/useStore";
import {
  DEFAULT_WORLD,
  navigate,
  useLocationState,
} from "../../services/location-state";

export function SearchInput() {
  const query = useStore((state) => state.query);
  const setQuery = useStore((state) => state.setQuery);
  const state = useLocationState();

  return (
    <TextField
      id="search-input"
      style={{ width: "100%" }}
      placeholder="Search for worlds, and routes"
      value={query}
      role="searchbox"
      onChange={(e) => {
        navigate({
          world: state.world ?? DEFAULT_WORLD,
          type: "default",
        });
        setQuery(e.target.value);
      }}
      isRightAddon={false}
      rightChildren={
        query !== "" && (
          <Button
            buttonType="icon"
            style={{ right: 0, position: "absolute" }}
            onClick={() => {
              setQuery("");
            }}
            aria-label="Clear search field"
          >
            <ClearSVGIcon />
          </Button>
        )
      }
    />
  );
}

import { Button } from "@react-md/button";
import { TextIconSpacing } from "@react-md/icon";
import { SimpleListItem } from "@react-md/list";
import { ListFontIcon } from "@react-md/material-icons";
import { DEFAULT_WORLD, LocationStateUpcomingEvent, useLocationState } from "../../../../services/location-state";

export function BackButton() {
    const [locationState, setLocationState] =
      useLocationState<LocationStateUpcomingEvent>();
      
    return <SimpleListItem>
      <Button
        themeType="outline"
        onClick={() =>
          setLocationState({
            type: "events",
            query: locationState.query,
            world: locationState.world ?? DEFAULT_WORLD,
          })
        }
      >
        <TextIconSpacing icon={<ListFontIcon />}>
          Upcoming Events
        </TextIconSpacing>
      </Button>
    </SimpleListItem>

}
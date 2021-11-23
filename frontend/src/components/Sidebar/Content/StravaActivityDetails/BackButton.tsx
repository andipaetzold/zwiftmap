import { Button } from "@react-md/button";
import { TextIconSpacing } from "@react-md/icon";
import { SimpleListItem } from "@react-md/list";
import { ListFontIcon } from "@react-md/material-icons";
import {
    DEFAULT_WORLD,
    LocationStateStravaActivity,
    useLocationState
} from "../../../../services/location-state";

export function BackButton() {
  const [locationState, setLocationState] =
    useLocationState<LocationStateStravaActivity>();

  return (
    <SimpleListItem>
      <Button
        themeType="outline"
        onClick={() => {
          setLocationState({
            world: locationState.world ?? DEFAULT_WORLD,
            type: "strava-activities",
          });
        }}
      >
        <TextIconSpacing icon={<ListFontIcon />}>
          Strava activities
        </TextIconSpacing>
      </Button>
    </SimpleListItem>
  );
}

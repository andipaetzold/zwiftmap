import { TextIconSpacing } from "@react-md/icon";
import { SimpleListItem } from "@react-md/list";
import { ListSVGIcon } from "@react-md/material-icons";
import {
  DEFAULT_WORLD,
  LocationStateStravaActivity,
  useLocationState
} from "../../../../services/location-state";
import { ButtonState } from "../../../ButtonState";

export function BackButton() {
  const [locationState] = useLocationState<LocationStateStravaActivity>();

  return (
    <SimpleListItem>
      <ButtonState
        themeType="outline"
        state={{
          world: locationState.world ?? DEFAULT_WORLD,
          type: "strava-activities",
        }}
      >
        <TextIconSpacing icon={<ListSVGIcon />}>
          Strava activities
        </TextIconSpacing>
      </ButtonState>
    </SimpleListItem>
  );
}

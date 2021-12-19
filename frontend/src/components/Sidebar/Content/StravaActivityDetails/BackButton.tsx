import { TextIconSpacing } from "@react-md/icon";
import { SimpleListItem } from "@react-md/list";
import { ListSVGIcon } from "@react-md/material-icons";
import {
  DEFAULT_WORLD,
  LocationStateStravaActivity,
} from "../../../../services/location-state";
import { ButtonState } from "../../../ButtonState";

interface Props {
  state: LocationStateStravaActivity;
}

export function BackButton({ state }: Props) {
  return (
    <SimpleListItem>
      <ButtonState
        themeType="outline"
        state={{
          world: state.world ?? DEFAULT_WORLD,
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

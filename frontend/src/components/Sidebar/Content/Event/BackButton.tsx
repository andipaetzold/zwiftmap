import { TextIconSpacing } from "@react-md/icon";
import { SimpleListItem } from "@react-md/list";
import { ListSVGIcon } from "@react-md/material-icons";
import {
  DEFAULT_WORLD,
  useLocationState,
} from "../../../../services/location-state";
import { ButtonState } from "../../../ButtonState";

export function BackButton() {
  const state = useLocationState();

  return (
    <SimpleListItem>
      <ButtonState
        themeType="outline"
        state={{
          type: "events",
          world: state.world ?? DEFAULT_WORLD,
        }}
      >
        <TextIconSpacing icon={<ListSVGIcon />}>
          Upcoming Events
        </TextIconSpacing>
      </ButtonState>
    </SimpleListItem>
  );
}

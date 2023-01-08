import { TextIconSpacing } from "@react-md/icon";
import { SimpleListItem } from "@react-md/list";
import { PlaceSVGIcon } from "@react-md/material-icons";
import { LocationStatePlaceEdit } from "../../../../services/location-state";
import { ButtonState } from "../../../ButtonState";

interface Props {
  state: LocationStatePlaceEdit;
}

export function BackButton({ state }: Props) {
  return (
    <SimpleListItem>
      <ButtonState
        themeType="outline"
        state={{
          type: "place",
          world: state.world,
          placeId: state.placeId,
        }}
      >
        <TextIconSpacing icon={<PlaceSVGIcon />}>Back</TextIconSpacing>
      </ButtonState>
    </SimpleListItem>
  );
}

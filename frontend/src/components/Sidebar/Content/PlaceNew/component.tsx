import { TextIconSpacing } from "@react-md/icon";
import { List, SimpleListItem } from "@react-md/list";
import { ListSVGIcon } from "@react-md/material-icons";
import { LocationStatePlaceNew } from "../../../../services/location-state";
import { ButtonState } from "../../../ButtonState";
import { PlaceEditForm } from "../../../PlaceEditForm";
import { PlaceNewHelmet } from "./PlaceNewHelment";

interface Props {
  state: LocationStatePlaceNew;
}

export default function PlaceNew({ state }: Props) {
  return (
    <>
      <List>
        <PlaceNewHelmet />
        <SimpleListItem>
          <ButtonState
            themeType="outline"
            query=""
            state={{
              world: state.world,
              type: "default",
            }}
          >
            <TextIconSpacing icon={<ListSVGIcon />}>Route List</TextIconSpacing>
          </ButtonState>
        </SimpleListItem>
        <PlaceEditForm world={state.world} />
      </List>
    </>
  );
}

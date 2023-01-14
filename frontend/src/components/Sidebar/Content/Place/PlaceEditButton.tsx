import { EditSVGIcon } from "@react-md/material-icons";
import { useAuthStatus } from "../../../../react-query";
import { LocationStatePlace } from "../../../../services/location-state";
import { Place } from "../../../../types";
import { ListItemState } from "../../../ListItemState";

interface Props {
  place: Place;
  state: LocationStatePlace;
}

export function PlaceEditButton({ place, state }: Props) {
  const { data: authStatus } = useAuthStatus();
  if (!authStatus || (!authStatus.adminUser && !authStatus.moderatorUser)) {
    return null;
  }

  return (
    <>
      <ListItemState
        leftAddonType="icon"
        leftAddon={<EditSVGIcon />}
        state={{
          type: "place-edit",
          world: state.world,
          placeId: place.id,
        }}
      >
        Edit
      </ListItemState>
    </>
  );
}

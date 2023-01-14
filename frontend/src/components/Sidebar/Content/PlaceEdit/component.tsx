import { LocationStatePlaceEdit } from "../../../../services/location-state";
import { Place } from "../../../../types";
import { PlaceEditForm } from "../../../PlaceEditForm";
import { PlaceEditHelmet } from "./PlaceHelmet";

interface Props {
  place: Place;
  state: LocationStatePlaceEdit;
}

export default function PlaceEditComponent({ place, state }: Props) {
  return (
    <>
      <PlaceEditHelmet name={place.name} />
      <PlaceEditForm place={place} world={state.world} />
    </>
  );
}

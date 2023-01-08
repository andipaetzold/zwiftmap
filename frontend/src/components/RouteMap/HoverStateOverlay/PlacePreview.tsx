import { COLORS } from "../../../constants";
import { HoverStatePlace } from "../../../types";
import { PlaceMarker } from "../../PlaceMarker";

interface Props {
  state: HoverStatePlace;
}

export function PlacePreview({ state }: Props) {
  return <PlaceMarker position={state.place.position} interactive={false} fill={COLORS.previewRoute} />;
}

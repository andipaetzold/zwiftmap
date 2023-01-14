import { Chip } from "@react-md/chip";
import { Divider } from "@react-md/divider";
import { SimpleListItem } from "@react-md/list";
import { Typography } from "@react-md/typography";
import { LocationStatePlace } from "../../../../services/location-state";
import { Place } from "../../../../types";
import { PlaceEditButton } from "./PlaceEditButton";
import { PlaceHelmet } from "./PlaceHelmet";
import { PlaceImage } from "./PlaceImage";
import { PlaceLinks } from "./PlaceLinks";
import { PlaceReport } from "./PlaceReport";

interface Props {
  place: Place;
  state: LocationStatePlace;
}

export default function PlaceComponent({ place, state }: Props) {
  return (
    <>
      <PlaceHelmet name={place.name} />
      <PlaceImage place={place} />

      <SimpleListItem>
        <Typography type="headline-6" style={{ margin: 0 }}>
          {place.name}
        </Typography>
      </SimpleListItem>

      {place.description.trim().length > 0 && (
        <SimpleListItem>{place.description}</SimpleListItem>
      )}

      {!place.verified && (
        <SimpleListItem>
          <Chip noninteractable>Unverified</Chip>
        </SimpleListItem>
      )}

      <PlaceLinks place={place} />

      <Divider />
      <PlaceEditButton place={place} state={state} />
      <PlaceReport place={place} />
    </>
  );
}

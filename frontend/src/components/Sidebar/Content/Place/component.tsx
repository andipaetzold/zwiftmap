import { SimpleListItem } from "@react-md/list";
import { Typography } from "@react-md/typography";
import { LocationStatePlace } from "../../../../services/location-state";
import { Place } from "../../../../types";
import { PlaceHelmet } from "./PlaceHelmet";
import { PlaceLinks } from "./PlaceLinks";
import { PlaceReport } from "./PlaceReport";

interface Props {
  place: Place;
  state: LocationStatePlace;
}

export default function PlaceComponent({ place }: Props) {
  return (
    <>
      <PlaceHelmet name={place.name} />

      <SimpleListItem>
        <Typography type="headline-6" style={{ margin: 0 }}>
          {place.name}
        </Typography>
      </SimpleListItem>

      {place.description.trim().length > 0 && (
        <SimpleListItem>{place.description}</SimpleListItem>
      )}

      <PlaceLinks place={place} />
      <PlaceReport place={place} />
    </>
  );
}

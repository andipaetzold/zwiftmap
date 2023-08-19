import { ListItemLink } from "@react-md/list";
import { EmailSVGIcon } from "@react-md/material-icons";
import { Place } from "../../../../types";

interface Props {
  place: Place;
}

export function PlaceReport({ place }: Props) {
  return (
    <>
      <ListItemLink
        leftAddonType="icon"
        leftAddon={<EmailSVGIcon />}
        href={`mailto:support@zwiftmap.com?subject=${encodeURIComponent(
          "Place report",
        )}&body=${encodeURIComponent(`\n\n\nPlace Id: ${place.id}`)}`}
      >
        Report
      </ListItemLink>
    </>
  );
}

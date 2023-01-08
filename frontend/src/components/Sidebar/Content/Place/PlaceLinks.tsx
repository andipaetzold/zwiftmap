import { ListItemLink, ListItemText, ListSubheader } from "@react-md/list";
import { OpenInNewSVGIcon } from "@react-md/material-icons";
import { Place } from "../../../../types";

interface Props {
  place: Place;
}

export function PlaceLinks({ place }: Props) {
  if (place.links.length === 0) {
    return null;
  }

  return (
    <>
      <ListSubheader>Links</ListSubheader>

      {place.links.map((link, linkIndex) => (
        <ListItemLink
          key={linkIndex}
          href={link}
          target="_blank"
          rightAddon={<OpenInNewSVGIcon />}
          rightAddonType="icon"
        >
          <ListItemText>{link}</ListItemText>
        </ListItemLink>
      ))}
    </>
  );
}

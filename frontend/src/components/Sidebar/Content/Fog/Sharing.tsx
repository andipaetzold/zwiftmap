import {
  ListItem,
  ListItemLink,
  ListItemText,
  ListSubheader,
} from "@react-md/list";
import { FileDownloadSVGIcon, ShareSVGIcon } from "@react-md/material-icons";
import { LocationStateFog } from "../../../../services/location-state";
import { getFogImageUrl } from "../../../../util/image";
import { shareImage } from "../../../../util/shareImage";

interface Props {
  state: LocationStateFog;
}

export function Sharing({ state }: Props) {
  const url = getFogImageUrl(state.world.slug);

  if ("share" in navigator) {
    return (
      <>
        <ListSubheader>Sharing</ListSubheader>
        <ListItem
          rightAddon={<ShareSVGIcon />}
          rightAddonType="icon"
          onClick={() => shareImage(url)}
        >
          <ListItemText>Share as image</ListItemText>
        </ListItem>
      </>
    );
  }

  return (
    <>
      <ListSubheader>Sharing</ListSubheader>
      <ListItemLink
        href={url}
        download
        target="_blank"
        rightAddon={<FileDownloadSVGIcon />}
        rightAddonType="icon"
      >
        <ListItemText>Download as image</ListItemText>
      </ListItemLink>
    </>
  );
}

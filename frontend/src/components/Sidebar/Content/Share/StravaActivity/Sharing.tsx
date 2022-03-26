import {
  ListItem,
  ListItemLink,
  ListItemText,
  ListSubheader,
} from "@react-md/list";
import { FileDownloadSVGIcon, ShareSVGIcon } from "@react-md/material-icons";
import { shareImage } from "../../../../../util/shareImage";

interface Props {
  url: string;
}

export function SharedStravaActivitySharing({ url }: Props) {
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

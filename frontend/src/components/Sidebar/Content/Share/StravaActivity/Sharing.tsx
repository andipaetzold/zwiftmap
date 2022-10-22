import {
  ListItem,
  ListItemLink,
  ListItemText,
  ListSubheader,
} from "@react-md/list";
import { FileDownloadSVGIcon, ShareSVGIcon } from "@react-md/material-icons";
import { ShareStravaActivity } from "../../../../../types";
import { getShareImageUrl } from "../../../../../util/image";
import { shareImage } from "../../../../../util/shareImage";

interface Props {
  share: ShareStravaActivity;
}

export function SharedStravaActivitySharing({ share }: Props) {
  const url = getShareImageUrl(share.id);

  if ("share" in navigator) {
    return (
      <>
        <ListSubheader>Sharing</ListSubheader>
        <ListItem
          rightAddon={<ShareSVGIcon />}
          rightAddonType="icon"
          onClick={() => shareImage(url, `share-${share.id}.png`)}
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

import {
  ListItem,
  ListItemLink,
  ListItemText,
  ListSubheader,
} from "@react-md/list";
import { FileDownloadSVGIcon, ShareSVGIcon } from "@react-md/material-icons";
import { useAsync } from "react-async-hook";
import { Share } from "../../../../../types";
import { shareImage } from "../../../../../util/shareImage";

interface Props {
  share: Share;
}

export function SharedStravaActivitySharing({ share }: Props) {
  const url = `https://res.cloudinary.com/zwiftmap/image/upload/s/${share.id}.png`;
  const { result: imageExists } = useAsync<boolean>(
    async (u: string) => {
      try {
        const response = await fetch(u, { method: "HEAD" });
        return response.ok;
      } catch {
        return false;
      }
    },
    [url]
  );

  if (!imageExists) {
    return null;
  }

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

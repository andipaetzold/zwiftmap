import { ListItem, ListItemLink, ListItemText } from "@react-md/list";
import { FileDownloadSVGIcon, ShareSVGIcon } from "@react-md/material-icons";
import { shareImage } from "../../util/shareImage";

interface Props {
  url: string;
  filename: string;
  label?: string;
}

export function ShareImageListItem({
  url,
  filename,
  label = "Share as image",
}: Props) {
  if ("share" in navigator) {
    return (
      <ListItem
        rightAddon={<ShareSVGIcon />}
        rightAddonType="icon"
        onClick={() => shareImage(url, filename)}
      >
        <ListItemText>{label}</ListItemText>
      </ListItem>
    );
  }

  return (
    <ListItemLink
      href={url}
      download
      target="_blank"
      rightAddon={<FileDownloadSVGIcon />}
      rightAddonType="icon"
    >
      <ListItemText>{label}</ListItemText>
    </ListItemLink>
  );
}

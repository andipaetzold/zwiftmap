import { Avatar } from "@react-md/avatar";
import { ListItem, ListItemLink, ListItemText } from "@react-md/list";
import { FileDownloadFontIcon, ShareFontIcon } from "@react-md/material-icons";
import { useCallback } from "react";
import { useAsync } from "react-async-hook";
import zwiftMapLogo from "../../../../../assets/ZwiftMap-40x40.png";
import { Share } from "../../../../../types";

interface Props {
  share: Share;
}

export function ImageButton({ share }: Props) {
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

  const handleShareImage = useCallback(async () => {
    const response = await fetch(url);
    const blob = await response.blob();

    const lastModified = response.headers.has("last-modified")
      ? +response.headers.get("last-modified")!
      : new Date().getTime();
    const files = [
      new File([blob], `${share.id}.png`, {
        type: "image/png",
        lastModified,
      }),
    ];

    await navigator.share({ files });
  }, [share.id, url]);

  if (!imageExists) {
    return null;
  }

  if ("share" in navigator) {
    return (
      <ListItem
        leftAddon={
          <Avatar>
            <img src={zwiftMapLogo} alt="" />
          </Avatar>
        }
        leftAddonType="avatar"
        rightAddon={<ShareFontIcon />}
        rightAddonType="icon"
        onClick={handleShareImage}
      >
        <ListItemText>Share as image</ListItemText>
      </ListItem>
    );
  }

  return (
    <ListItemLink
      href={url}
      download
      leftAddon={
        <Avatar>
          <img src={zwiftMapLogo} alt="" />
        </Avatar>
      }
      leftAddonType="avatar"
      rightAddon={<FileDownloadFontIcon />}
      rightAddonType="icon"
    >
      <ListItemText>Download as image</ListItemText>
    </ListItemLink>
  );
}

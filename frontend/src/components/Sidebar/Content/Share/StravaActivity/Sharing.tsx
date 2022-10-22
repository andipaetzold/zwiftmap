import { ListSubheader } from "@react-md/list";
import { ShareStravaActivity } from "../../../../../types";
import { getShareImageUrl } from "../../../../../util/image";
import { ShareImageListItem } from "../../../../ShareImageListItem";

interface Props {
  share: ShareStravaActivity;
}

export function SharedStravaActivitySharing({ share }: Props) {
  const url = getShareImageUrl(share.id);

  return (
    <>
      <ListSubheader>Sharing</ListSubheader>
      <ShareImageListItem url={url} filename={`share-${share.id}.png`} />
    </>
  );
}

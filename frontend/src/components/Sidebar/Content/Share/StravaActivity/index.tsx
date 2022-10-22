import { SimpleListItem } from "@react-md/list";
import { Typography } from "@react-md/typography";
import { ShareStravaActivity } from "../../../../../types";
import { getShareImageUrl } from "../../../../../util/image";
import { SharedStravaActivityElevationChart } from "./ElevationChart";
import { SharedStravaActivityFacts } from "./Facts";
import { SharedStravaActivityHelmet } from "./Helmet";
import { SharedStravaActivityLinks } from "./Links";
import { SharedStravaActivitySharing } from "./Sharing";
import { SharedStravaActivitySurface } from "./Surface";

interface Props {
  share: ShareStravaActivity;
}

export function SharedStravaActivity({ share }: Props) {
  const imageUrl = getShareImageUrl(share.id);

  return (
    <>
      <SharedStravaActivityHelmet share={share} imageUrl={imageUrl} />

      <SimpleListItem>
        <Typography type="headline-6" style={{ margin: 0 }}>
          {share.activity.name}
        </Typography>
      </SimpleListItem>

      <SharedStravaActivityFacts share={share} />

      <SharedStravaActivityElevationChart share={share} />
      <SharedStravaActivitySurface share={share} />

      <SharedStravaActivitySharing share={share} />
      <SharedStravaActivityLinks share={share} />
    </>
  );
}

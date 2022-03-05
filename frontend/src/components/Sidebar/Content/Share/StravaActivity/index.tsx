import { SimpleListItem } from "@react-md/list";
import { Typography } from "@react-md/typography";
import { useAsync } from "react-async-hook";
import { request } from "../../../../../services/request";
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
  const { result: imageExists } = useAsync<boolean>(
    async (u: string) => {
      try {
        await request(u, { method: "HEAD" });
        return true;
      } catch {
        return false;
      }
    },
    [share.id]
  );

  return (
    <>
      <SharedStravaActivityHelmet
        share={share}
        imageUrl={imageExists ? imageUrl : null}
      />

      <SimpleListItem>
        <Typography type="headline-6" style={{ margin: 0 }}>
          {share.activity.name}
        </Typography>
      </SimpleListItem>

      <SharedStravaActivityFacts share={share} />

      <SharedStravaActivityElevationChart share={share} />
      <SharedStravaActivitySurface share={share} />

      <SharedStravaActivitySharing url={imageExists ? imageUrl : null} />
      <SharedStravaActivityLinks share={share} />
    </>
  );
}

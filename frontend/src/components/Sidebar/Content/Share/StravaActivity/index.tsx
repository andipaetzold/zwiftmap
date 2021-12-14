import { SimpleListItem } from "@react-md/list";
import { Typography } from "@react-md/typography";
import { useAsync } from "react-async-hook";
import { Helmet } from "react-helmet-async";
import { ShareStravaActivity } from "../../../../../types";
import { SharedStravaActivityElevationChart } from "./ElevationChart";
import { SharedStravaActivityFacts } from "./Facts";
import { SharedStravaActivityHelmet } from "./Helmet";
import { SharedStravaActivityLinks } from "./Links";
import { SharedStravaActivitySharing } from "./Sharing";

interface Props {
  share: ShareStravaActivity;
  onMouseHoverDistanceChange: (distance: number | undefined) => void;
}

export function SharedStravaActivity({
  share,
  onMouseHoverDistanceChange,
}: Props) {
  const imageUrl = `https://res.cloudinary.com/zwiftmap/image/upload/s/${share.id}.png`;
  const { result: imageExists } = useAsync<boolean>(
    async (u: string) => {
      try {
        const response = await fetch(u, { method: "HEAD" });
        return response.ok;
      } catch {
        return false;
      }
    },
    [imageUrl]
  );

  return (
    <>
      <SharedStravaActivityHelmet share={share} imageUrl={imageExists ? imageUrl : null} />

      <SimpleListItem>
        <Typography type="headline-6" style={{ margin: 0 }}>
          {share.activity.name}
        </Typography>
      </SimpleListItem>

      <SharedStravaActivityFacts share={share} />

      <SharedStravaActivityElevationChart
        share={share}
        onMouseHoverDistanceChange={onMouseHoverDistanceChange}
      />

      <SharedStravaActivitySharing url={imageExists ? imageUrl : null} />
      <SharedStravaActivityLinks share={share} />
    </>
  );
}

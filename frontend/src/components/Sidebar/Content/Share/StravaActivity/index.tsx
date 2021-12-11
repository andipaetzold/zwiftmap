import { SimpleListItem } from "@react-md/list";
import { Typography } from "@react-md/typography";
import { Helmet } from "react-helmet-async";
import { ShareStravaActivity } from "../../../../../types";
import { SharedStravaActivityElevationChart } from "./ElevationChart";
import { SharedStravaActivityFacts } from "./Facts";
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
  return (
    <>
      <Helmet>
        <title>{share.activity.name}</title>
        <meta
          name="description"
          content={`Shared Zwift activity "${share.activity.name}"`}
        />
      </Helmet>

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

      <SharedStravaActivitySharing share={share} />
      <SharedStravaActivityLinks share={share} />
    </>
  );
}

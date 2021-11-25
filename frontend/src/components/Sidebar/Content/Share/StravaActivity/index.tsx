import { SimpleListItem } from "@react-md/list";
import { Typography } from "@react-md/typography";
import { ShareStravaActivity } from "../../../../../types";
import { ElevationChart } from "../../../../ElevationChart";
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
  return <>
    <SimpleListItem>
      <Typography type="headline-6" style={{ margin: 0 }}>
        {share.activity.name}
      </Typography>
    </SimpleListItem>

    <SharedStravaActivityFacts share={share} />

    <SimpleListItem>
      <ElevationChart
        distanceStream={share.streams.distance.data}
        altitudeStream={share.streams.altitude.data}
        onMouseHoverDistanceChange={onMouseHoverDistanceChange}
      />
    </SimpleListItem>

    <SharedStravaActivitySharing share={share} />
    <SharedStravaActivityLinks share={share} />
  </>;
}

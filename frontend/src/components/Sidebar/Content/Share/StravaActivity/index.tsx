import { SimpleListItem } from "@react-md/list";
import { Text } from "@react-md/typography";
import { ShareStravaActivity } from "@zwiftmap/shared";
import { ElevationChart } from "../../../../ElevationChart";
import { SharedStravaActivityFacts } from "./Facts";
import { SharedStravaActivityLinks } from "./Links";

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
      <SimpleListItem>
        <Text type="headline-6" style={{ margin: 0 }}>
          {share.activity.name}
        </Text>
      </SimpleListItem>

      <SharedStravaActivityFacts share={share} />

      <SimpleListItem>
        <ElevationChart
          distanceStream={share.streams.distance.data}
          altitudeStream={share.streams.altitude.data}
          onMouseHoverDistanceChange={onMouseHoverDistanceChange}
        />
      </SimpleListItem>

      <SharedStravaActivityLinks share={share} />
    </>
  );
}

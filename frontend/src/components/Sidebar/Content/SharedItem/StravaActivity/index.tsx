import { SimpleListItem } from "@react-md/list";
import { Text } from "@react-md/typography";
import { SharedItemStravaActivity } from "../../../../../types";
import { ElevationChart } from "../../../../ElevationChart";
import { SharedStravaActivityFacts } from "./Facts";
import { SharedStravaActivityLinks } from "./Links";

interface Props {
  sharedItem: SharedItemStravaActivity;
  onMouseHoverDistanceChange: (distance: number | undefined) => void;
}

export function SharedStravaActivity({
  sharedItem,
  onMouseHoverDistanceChange,
}: Props) {
  return (
    <>
      <SimpleListItem>
        <Text type="headline-6" style={{ margin: 0 }}>
          {sharedItem.activity.name}
        </Text>
      </SimpleListItem>

      <SharedStravaActivityFacts sharedItem={sharedItem} />

      <SimpleListItem>
        <ElevationChart
          distanceStream={sharedItem.activity.streams.distance.data}
          altitudeStream={sharedItem.activity.streams.altitude.data}
          onMouseHoverDistanceChange={onMouseHoverDistanceChange}
        />
      </SimpleListItem>

      <SharedStravaActivityLinks sharedItem={sharedItem} />
    </>
  );
}

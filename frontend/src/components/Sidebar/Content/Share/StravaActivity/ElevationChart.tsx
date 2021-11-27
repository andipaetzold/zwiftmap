import { ShareStravaActivity } from "../../../../../types";
import { ElevationChart } from "../../../../ElevationChart";

interface Props {
  share: ShareStravaActivity;
  onMouseHoverDistanceChange: (distance: number | undefined) => void;
}

export function SharedStravaActivityElevationChart({
  share,
  onMouseHoverDistanceChange,
}: Props) {
  return (
    <ElevationChart
      distanceStream={share.streams.distance.data}
      altitudeStream={share.streams.altitude.data}
      onMouseHoverDistanceChange={onMouseHoverDistanceChange}
    />
  );
}

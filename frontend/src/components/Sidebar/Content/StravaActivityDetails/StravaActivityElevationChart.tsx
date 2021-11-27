import { StravaActivity } from "../../../../services/StravaActivityRepository";
import { ElevationChart } from "../../../ElevationChart";

interface Props {
  activity: StravaActivity;
  onMouseHoverDistanceChange: (distance: number | undefined) => void;
}

export function StravaActivityElevationChart({
  activity,
  onMouseHoverDistanceChange,
}: Props) {
  return (
    <ElevationChart
      distanceStream={activity.streams.distance}
      altitudeStream={activity.streams.altitude}
      onMouseHoverDistanceChange={onMouseHoverDistanceChange}
    />
  );
}

import { StravaActivity } from "../../../../services/StravaActivityRepository";
import { ElevationChart } from "../../../ElevationChart";

interface Props {
  activity: StravaActivity;
}

export function StravaActivityElevationChart({ activity }: Props) {
  if (!activity.streams.distance || !activity.streams.altitude) {
    return null;
  }

  return (
    <ElevationChart
      distanceStream={activity.streams.distance}
      altitudeStream={activity.streams.altitude}
    />
  );
}

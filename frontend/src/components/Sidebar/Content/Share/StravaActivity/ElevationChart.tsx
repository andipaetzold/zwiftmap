import { ShareStravaActivity } from "../../../../../types";
import { ElevationChart } from "../../../../ElevationChart";

interface Props {
  share: ShareStravaActivity;
}

export function SharedStravaActivityElevationChart({ share }: Props) {
  return (
    <ElevationChart
      distanceStream={share.streams.distance.data}
      altitudeStream={share.streams.altitude.data}
    />
  );
}

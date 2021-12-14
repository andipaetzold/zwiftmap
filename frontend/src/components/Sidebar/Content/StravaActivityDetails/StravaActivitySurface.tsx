import { StravaActivity } from "../../../../services/StravaActivityRepository";
import { worldConfigs } from "../../../../worldConfigs";
import { SurfaceListItem } from "../../../SurfaceListItem";

interface Props {
  activity: StravaActivity;
}

export function StravaActivitySurface({ activity }: Props) {
  return (
    <SurfaceListItem
      distancStream={activity.streams.distance}
      latLngStream={activity.streams.latlng}
      distance={activity.distance}
      surfaces={worldConfigs[activity.world.slug].surfaces}
    />
  );
}

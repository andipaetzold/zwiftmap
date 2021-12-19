import { ShareStravaActivity } from "../../../../../types";
import { getWorld } from "../../../../../util/strava";
import { worldConfigs } from "../../../../../constants/worldConfigs";
import { SurfaceListItem } from "../../../../SurfaceListItem";

export interface Props {
  share: ShareStravaActivity;
}

export function SharedStravaActivitySurface({ share }: Props) {
  const world = getWorld(share.activity.start_latlng as [number, number])!;
  return (
    <SurfaceListItem
      distancStream={share.streams.distance.data}
      latLngStream={share.streams.latlng.data}
      surfaces={worldConfigs[world.slug].surfaces}
    />
  );
}

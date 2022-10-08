import { Route } from "zwift-data";
import { worldConfigs } from "../../../../constants/worldConfigs";
import { useStravaSegmentStream } from "../../../../react-query";
import { SurfaceListItem } from "../../../SurfaceListItem";

interface Props {
  route: Route;
}

export function RouteSurface({ route }: Props) {
  const { data: latLngStream } = useStravaSegmentStream({
    stravaSegmentId: route.stravaSegmentId,
    stream: "latlng",
  });
  const { data: distanceStream } = useStravaSegmentStream({
    stravaSegmentId: route.stravaSegmentId,
    stream: "distance",
  });

  if (!latLngStream || !distanceStream) {
    return null;
  }

  return (
    <SurfaceListItem
      distancStream={distanceStream}
      latLngStream={latLngStream}
      surfaces={worldConfigs[route.world].surfaces}
    />
  );
}

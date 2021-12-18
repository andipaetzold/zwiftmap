import { useAsync } from "react-async-hook";
import { Route } from "zwift-data";
import { getStravaSegmentStreams } from "../../../../services/StravaSegmentRepository";
import { StravaSegment } from "../../../../types";
import { worldConfigs } from "../../../../constants/worldConfigs";
import { SurfaceListItem } from "../../../SurfaceListItem";

interface Props {
  route: Route;
}

const REQUIRED_STREAMS = ["latlng", "distance"] as const;

export function RouteSurface({ route }: Props) {
  const { result: routeSegment } = useAsync<
    Pick<StravaSegment, "latlng" | "distance">
  >(getStravaSegmentStreams, [route.slug, "routes", REQUIRED_STREAMS]);

  if (!routeSegment) {
    return null;
  }

  return (
    <SurfaceListItem
      distancStream={routeSegment.distance}
      latLngStream={routeSegment.latlng}
      distance={route.distance}
      surfaces={worldConfigs[route.world].surfaces}
    />
  );
}

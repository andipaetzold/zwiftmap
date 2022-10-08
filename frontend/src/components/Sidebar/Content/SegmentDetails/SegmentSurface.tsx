import { Segment } from "zwift-data";
import { worldConfigs } from "../../../../constants/worldConfigs";
import { useStravaSegmentStream } from "../../../../react-query";
import { SurfaceListItem } from "../../../SurfaceListItem";

interface Props {
  segment: Segment;
}

export function SegmentSurface({ segment }: Props) {
  const { data: distanceStream } = useStravaSegmentStream({
    stravaSegmentId: segment.stravaSegmentId,
    stream: "distance",
  });
  const { data: latLngStream } = useStravaSegmentStream({
    stravaSegmentId: segment.stravaSegmentId,
    stream: "latlng",
  });

  if (!distanceStream || !latLngStream) {
    return null;
  }

  return (
    <SurfaceListItem
      distancStream={distanceStream}
      latLngStream={latLngStream}
      surfaces={worldConfigs[segment.world].surfaces}
    />
  );
}

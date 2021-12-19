import { useAsync } from "react-async-hook";
import { Segment } from "zwift-data";
import { getStravaSegmentStreams } from "../../../../services/StravaSegmentRepository";
import { StravaSegment } from "../../../../types";
import { worldConfigs } from "../../../../constants/worldConfigs";
import { SurfaceListItem } from "../../../SurfaceListItem";

interface Props {
  segment: Segment;
}

const REQUIRED_STREAMS = ["latlng", "distance"] as const;

export function SegmentSurface({ segment }: Props) {
  const { result: routeSegment } = useAsync<
    Pick<StravaSegment, "latlng" | "distance">
  >(getStravaSegmentStreams, [segment.slug, "segments", REQUIRED_STREAMS]);

  if (!routeSegment) {
    return null;
  }

  return (
    <SurfaceListItem
      distancStream={routeSegment.distance}
      latLngStream={routeSegment.latlng}
      surfaces={worldConfigs[segment.world].surfaces}
    />
  );
}

import { useAsync } from "react-async-hook";
import { Route, segments } from "zwift-data";
import { getStravaSegmentStreams } from "../../../../services/StravaSegmentRepository";
import { StravaSegment } from "../../../../types";
import { ElevationChart } from "../../../ElevationChart";
import { LoadingSpinnerListItem } from "../../../Loading";

interface Props {
  route: Route;
  onMouseHoverDistanceChange: (distance: number | undefined) => void;
}

const REQUIRED_STREAMS = ["altitude", "distance"] as const;

export function RouteElevationChart({
  route,
  onMouseHoverDistanceChange,
}: Props) {
  const { result: routeSegment, error } = useAsync<
    Pick<StravaSegment, "altitude" | "distance">
  >(getStravaSegmentStreams, [route.slug, "routes", REQUIRED_STREAMS]);

  if (error) {
    return null;
  }

  if (!routeSegment) {
    return <LoadingSpinnerListItem />;
  }

  return (
    <ElevationChart
      altitudeStream={routeSegment.altitude}
      distanceStream={routeSegment.distance}
      onMouseHoverDistanceChange={onMouseHoverDistanceChange}
      segments={route.segmentsOnRoute.map((sor) => ({
        range: [sor.from, sor.to],
        type: segments.find((s) => s.slug === sor.segment)!.type,
      }))}
    />
  );
}

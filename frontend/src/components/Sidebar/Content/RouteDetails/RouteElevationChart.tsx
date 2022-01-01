import { useAsync } from "react-async-hook";
import { Route, segments } from "zwift-data";
import { getStravaSegmentStreams } from "../../../../services/StravaSegmentRepository";
import { StravaSegment } from "../../../../types";
import { ElevationChart } from "../../../ElevationChart";
import { LoadingSpinnerListItem } from "../../../Loading";

interface Props {
  route: Route;
}

const REQUIRED_STREAMS = ["altitude", "distance"] as const;

export function RouteElevationChart({ route }: Props) {
  const { result: routeSegment, error } = useAsync<
    Pick<StravaSegment, "altitude" | "distance">
  >(getStravaSegmentStreams, [route.stravaSegmentId, REQUIRED_STREAMS]);

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
      segments={route.segmentsOnRoute.map((sor) => ({
        range: [sor.from, sor.to],
        type: segments.find((s) => s.slug === sor.segment)!.type,
      }))}
    />
  );
}

import { Route, segments } from "zwift-data";
import { useStravaSegmentStream } from "../../../../react-query";
import { ElevationChart } from "../../../ElevationChart";
import { LoadingSpinnerListItem } from "../../../Loading";

interface Props {
  route: Route;
}

export function RouteElevationChart({ route }: Props) {
  const {
    data: altitudeStream,
    isLoading: isLoadingAltitude,
    isError: isErrorAltitude,
  } = useStravaSegmentStream({
    stravaSegmentId: route.stravaSegmentId,
    stream: "altitude",
  });
  const {
    data: distanceStream,
    isLoading: isLoadingDistance,
    isError: isErrorDistance,
  } = useStravaSegmentStream({
    stravaSegmentId: route.stravaSegmentId,
    stream: "distance",
  });

  if (isLoadingAltitude || isLoadingDistance) {
    return <LoadingSpinnerListItem />;
  }

  if (
    isErrorAltitude ||
    isErrorDistance ||
    !altitudeStream ||
    !distanceStream
  ) {
    return null;
  }

  return (
    <ElevationChart
      altitudeStream={altitudeStream}
      distanceStream={distanceStream}
      segments={route.segmentsOnRoute.map((sor) => ({
        range: [sor.from, sor.to],
        type: segments.find((s) => s.slug === sor.segment)!.type,
      }))}
    />
  );
}

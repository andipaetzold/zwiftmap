import { Segment } from "zwift-data";
import { useStravaSegmentStream } from "../../../../react-query";
import { ElevationChart } from "../../../ElevationChart";
import { LoadingSpinnerListItem } from "../../../Loading";

interface Props {
  segment: Segment;
}

export function SegmentElevationChart({ segment }: Props) {
  const {
    data: altitudeStream,
    isLoading: isLoadingAltitude,
    isError: isErrorAltitude,
  } = useStravaSegmentStream({
    stravaSegmentId: segment.stravaSegmentId,
    stream: "altitude",
  });
  const {
    data: distanceStream,
    isLoading: isLoadingDistance,
    isError: isErrorDistance,
  } = useStravaSegmentStream({
    stravaSegmentId: segment.stravaSegmentId,
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
    />
  );
}

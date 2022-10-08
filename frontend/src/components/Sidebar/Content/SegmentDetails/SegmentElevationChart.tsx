import { Segment } from "zwift-data";
import { useStravaSegmentStream } from "../../../../react-query/useStravaSegmentStream";
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

  if (isErrorAltitude || isErrorDistance) {
    return null;
  }

  if (isLoadingAltitude || isLoadingDistance) {
    return <LoadingSpinnerListItem />;
  }

  return (
    <ElevationChart
      altitudeStream={altitudeStream}
      distanceStream={distanceStream}
    />
  );
}

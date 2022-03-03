import { useMemo } from "react";
import { useAsync } from "react-async-hook";
import { Route } from "zwift-data";
import { getStravaSegmentStreams } from "../../services/StravaSegmentRepository";
import { StravaSegment } from "../../types";
import { LoadingSpinner } from "../Loading";
import { REQUIRED_STREAMS, TARGET_RESOLUTION } from "./constants";
import { GenericElevationChartPreview } from "./GenericElevationChartPreview";
import { Data } from "./types";

interface RouteProps {
  route: Route;
}

export default function RouteElevationChartPreview({ route }: RouteProps) {
  const { result: streams, error } = useAsync<
    Pick<StravaSegment, "altitude" | "distance">
  >(getStravaSegmentStreams, [route.stravaSegmentId, REQUIRED_STREAMS]);

  const data: Data[] | undefined = useMemo(() => {
    if (streams === undefined) {
      return;
    }

    const filteredData = streams.distance
      .map((distance, index) => ({
        distance: distance / 1_000,
        elevation: streams.altitude[index],
      }))
      .filter(
        (_d, index) =>
          index %
            Math.max(
              1,
              Math.floor(streams.distance.length / TARGET_RESOLUTION)
            ) ===
          0
      );
    // remove negative elevation
    const lowestElevation = Math.min(...filteredData.map((d) => d.elevation));
    return filteredData.map((d) => ({
      ...d,
      elevation: d.elevation - lowestElevation,
    }));
  }, [streams]);

  if (error) {
    return null;
  }

  if (!data) {
    return <LoadingSpinner small />;
  }

  return <GenericElevationChartPreview data={data} />;
}

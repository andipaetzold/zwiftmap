import { useMemo } from "react";
import { LocationStateRoute } from "../../../../services/location-state";
import { DistanceStream, LatLngStream } from "../../../../types";
import { SectionsPane } from "./components/SectionsPane";
import { SegmentsPane } from "./components/SegmentsPane";
import { getRouteSections } from "./util";

const ID = "OverlaySegments-RouteOverlay";

interface Props {
  state: LocationStateRoute;

  streams?: {
    latlng: LatLngStream;
    distance: DistanceStream;
  };
}

export function RouteOverlay({ state, streams }: Props) {
  const unmatchedSegments = useMemo(() => {
    const matchedSegmentSlugs = state.route.segmentsOnRoute.map(
      (sor) => sor.segment,
    );

    return state.route.segments.filter(
      (segmentSlug) => !matchedSegmentSlugs.includes(segmentSlug),
    );
  }, [state.route]);

  if (!streams) {
    return null;
  }

  const sections = getRouteSections(streams, state.route.segmentsOnRoute);

  return (
    <>
      <SectionsPane id={`${ID}-route`} sections={sections} />
      <SegmentsPane segmentSlugs={unmatchedSegments} />
    </>
  );
}

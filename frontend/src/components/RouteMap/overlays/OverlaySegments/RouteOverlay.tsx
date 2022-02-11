import { useMemo } from "react";
import { useAsync } from "react-async-hook";
import { LocationStateRoute } from "../../../../services/location-state";
import { loadRoute } from "../../loaders/route";
import { SectionsPane } from "./components/SectionsPane";
import { SegmentsPane } from "./components/SegmentsPane";
import { getRouteSections } from "./util";

const ID = "OverlaySegments-RouteOverlay";

interface Props {
  state: LocationStateRoute;
}

export function RouteOverlay({ state }: Props) {
  const unmatchedSegments = useMemo(() => {
    const matchedSegmentSlugs = state.route.segmentsOnRoute.map(
      (sor) => sor.segment
    );

    return state.route.segments.filter(
      (segmentSlug) => !matchedSegmentSlugs.includes(segmentSlug)
    );
  }, [state.route]);

  const { result: streams } = useAsync(loadRoute, [state]);

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

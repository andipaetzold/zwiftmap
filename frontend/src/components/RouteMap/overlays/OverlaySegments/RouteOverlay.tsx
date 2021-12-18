import { useMemo } from "react";
import { useAsync } from "react-async-hook";
import {
  LocationStateRoute,
  useLocationState,
} from "../../../../services/location-state";
import { loadRoute } from "../../loaders/route";
import { RouteEnd } from "../../RouteEnd";
import { RouteStart } from "../../RouteStart";
import { SectionsPane } from "./components/SectionsPane";
import { SegmentsPane } from "./components/SegmentsPane";
import { getRouteSections } from "./util";

const ID = "OverlaySegments-RouteOverlay";

export function RouteOverlay() {
  const [state] = useLocationState<LocationStateRoute>();

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
      <RouteStart id={ID} latlng={streams.latlng[0]} />
      <RouteEnd id={ID} latlng={streams.latlng[streams.latlng.length - 1]} />
      <SegmentsPane segmentSlugs={unmatchedSegments} />
    </>
  );
}

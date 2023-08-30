import { useMemo } from "react";
import { useEvent } from "../../../../react-query";
import { getRouteFromEvent } from "../../../../services/events";
import { LocationStateUpcomingEvent } from "../../../../services/location-state";
import { DistanceStream, LatLngStream } from "../../../../types";
import { SectionsPane } from "./components/SectionsPane";
import { SegmentsPane } from "./components/SegmentsPane";
import { getRouteSections } from "./util";

const ID = "OverlaySegments-EventOverlay";

interface Props {
  state: LocationStateUpcomingEvent;

  streams?: {
    latlng: LatLngStream;
    distance: DistanceStream;
  };
}

export function EventOverlay({ state, streams }: Props) {
  const { data } = useEvent(state.eventId, {
    select: (event) => {
      const route = getRouteFromEvent(event);
      if (!route) {
        return undefined;
      }
      return { event, route };
    },
  });

  const unmatchedSegments = useMemo(() => {
    if (!data) {
      return undefined;
    }

    const matchedSegmentSlugs = data.route.segmentsOnRoute.map(
      (sor) => sor.segment,
    );

    return data.route.segments.filter(
      (segmentSlug) => !matchedSegmentSlugs.includes(segmentSlug),
    );
  }, [data]);

  if (!data || !streams || unmatchedSegments === undefined) {
    return null;
  }

  const sections = getRouteSections(
    { distance: streams.distance, latlng: streams.latlng },
    data.route.segmentsOnRoute,
  );

  return (
    <>
      <SectionsPane id={`${ID}-route`} sections={sections} />
      <SegmentsPane segmentSlugs={unmatchedSegments} />
    </>
  );
}

import { useMemo } from "react";
import { useAsync } from "react-async-hook";
import { Route } from "zwift-data";
import {
  fetchEvent,
  getEventStreams,
  getRouteFromEvent,
  ZwiftEvent,
} from "../../../../services/events";
import { LocationStateUpcomingEvent } from "../../../../services/location-state";
import { DistanceStream, LatLngStream } from "../../../../types";
import { SectionsPane } from "./components/SectionsPane";
import { SegmentsPane } from "./components/SegmentsPane";
import { getRouteSections } from "./util";

const ID = "OverlaySegments-EventOverlay";

interface Props {
  state: LocationStateUpcomingEvent;
}

export function EventOverlay({ state }: Props) {
  const { result: data } = useAsync(loadData, [state.eventId]);

  const unmatchedSegments = useMemo(() => {
    if (!data) {
      return undefined;
    }

    const matchedSegmentSlugs = data.route.segmentsOnRoute.map(
      (sor) => sor.segment
    );

    return data.route.segments.filter(
      (segmentSlug) => !matchedSegmentSlugs.includes(segmentSlug)
    );
  }, [data]);

  if (!data || unmatchedSegments === undefined) {
    return null;
  }

  const sections = getRouteSections(
    { distance: data.distance, latlng: data.latlng },
    data.route.segmentsOnRoute
  );

  return (
    <>
      <SectionsPane id={`${ID}-route`} sections={sections} />
      <SegmentsPane segmentSlugs={unmatchedSegments} />
    </>
  );
}

async function loadData(eventId: string): Promise<
  | {
      event: ZwiftEvent;
      route: Route;
      distance: DistanceStream;
      latlng: LatLngStream;
    }
  | undefined
> {
  const event = await fetchEvent(eventId);
  const route = getRouteFromEvent(event);
  const streams = await getEventStreams(event, ["distance", "latlng"]);

  if (route && streams) {
    return {
      event,
      route,
      ...streams,
    };
  }
}

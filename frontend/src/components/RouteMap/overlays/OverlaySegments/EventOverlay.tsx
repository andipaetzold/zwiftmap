import { useMemo } from "react";
import { useAsync } from "react-async-hook";
import { Route, routes } from "zwift-data";
import { fetchEvent, ZwiftEvent } from "../../../../services/events";
import {
  LocationStateUpcomingEvent,
  useLocationState
} from "../../../../services/location-state";
import { getStravaSegmentStreams } from "../../../../services/StravaSegmentRepository";
import { DistanceStream, LatLngStream } from "../../../../types";
import { RouteEnd } from "../../RouteEnd";
import { RouteStart } from "../../RouteStart";
import { SectionsPane } from "./components/SectionsPane";
import { SegmentsPane } from "./components/SegmentsPane";
import { getRouteSections } from "./util";

const ID = "OverlaySegments-EventOverlay";

export function EventOverlay() {
  const [state] = useLocationState<LocationStateUpcomingEvent>();

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
      <RouteStart id={ID} latlng={data.latlng[0]} />
      <RouteEnd id={ID} latlng={data.latlng[data.latlng.length - 1]} />

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
  const route = routes.find((r) => r.id === event.routeId);

  if (route && route.stravaSegmentId) {
    const segment = await getStravaSegmentStreams(route.slug, "routes", [
      "distance",
      "latlng",
    ]);
    return {
      event,
      route,
      distance: segment.distance,
      latlng: segment.latlng,
    };
  }
}

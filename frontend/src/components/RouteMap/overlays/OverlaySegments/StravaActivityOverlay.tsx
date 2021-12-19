import { LatLngTuple } from "leaflet";
import { useAsync } from "react-async-hook";
import { DetailedSegmentEffort } from "strava";
import { Segment, segments, SegmentType } from "zwift-data";
import {
  LocationStateStravaActivity,
  useLocationState,
} from "../../../../services/location-state";
import {
  getStravaActivity,
  StravaActivity,
} from "../../../../services/StravaActivityRepository";
import { getSectionsFromIntervals } from "../../../../util/sections";
import { RouteEnd } from "../../RouteEnd";
import { RouteStart } from "../../RouteStart";
import { SectionsPane } from "./components/SectionsPane";
import { Section } from "./types";

const ID = "OverlaySegments-StravaActivityOverlay";
const SEGMENTS_TO_DISPLAY: SegmentType[] = ["sprint", "climb"];

export function StravaActivityOverlay() {
  const [state] = useLocationState<LocationStateStravaActivity>();

  const { result: data } = useAsync(loadData, [state.stravaActivityId]);

  if (!data) {
    return null;
  }

  return (
    <>
      <SectionsPane id={`${ID}-route`} sections={data.sections} />
      <RouteStart id={ID} latlng={data.activity.streams.latlng[0]} />
      <RouteEnd
        id={ID}
        latlng={
          data.activity.streams.latlng[data.activity.streams.latlng.length - 1]
        }
      />
    </>
  );
}

async function loadData(
  stravaActivityId: number
): Promise<{ activity: StravaActivity; sections: Section[] }> {
  const activity = await getStravaActivity(stravaActivityId);

  const segmentEffortsWithSegment = activity.segmentEfforts
    .map((segmentEffort) => ({
      segmentEffort,
      segment: segments.find(
        (segment) => segment.stravaSegmentId === segmentEffort.segment.id
      ),
    }))
    .filter(
      ({ segment }) => segment && SEGMENTS_TO_DISPLAY.includes(segment.type)
    ) as {
    segmentEffort: DetailedSegmentEffort;
    segment: Segment;
  }[];

  const sections = getSectionsFromIntervals<
    LatLngTuple,
    { segmentEffort: DetailedSegmentEffort; segment: Segment }
  >(activity.streams.latlng, segmentEffortsWithSegment, ({ segmentEffort }) => [
    segmentEffort.start_index,
    segmentEffort.end_index,
  ]);

  return {
    activity,
    sections: sections.map((section) => ({
      latlng: section.stream,
      type:
        (section.interval?.segment.type as "sprint" | "climb" | undefined) ??
        "regular",
    })),
  };
}

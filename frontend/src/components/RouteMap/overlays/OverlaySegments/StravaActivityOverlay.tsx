import { useAsync } from "react-async-hook";
import { segments, SegmentType } from "zwift-data";
import {
  LocationStateStravaActivity,
  useLocationState,
} from "../../../../services/location-state";
import {
  getStravaActivity,
  StravaActivity,
} from "../../../../services/StravaActivityRepository";
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

  const latLngStream = activity.streams.latlng;

  const segmentEffortsWithSegment = activity.segmentEfforts
    .map((segmentEffort) => ({
      segmentEffort,
      segment: segments.find(
        (segment) => segment.stravaSegmentId === segmentEffort.segment.id
      ),
    }))
    .filter(
      ({ segment }) => segment && SEGMENTS_TO_DISPLAY.includes(segment.type)
    );

  if (segmentEffortsWithSegment.length === 0) {
    return {
      activity,
      sections: [{ latlng: latLngStream, type: "regular" }],
    };
  }

  const regularSections: Section[] = [
    ...segmentEffortsWithSegment.map(({ segmentEffort }, index) => [
      index === 0
        ? 0
        : segmentEffortsWithSegment[index - 1].segmentEffort.end_index,
      segmentEffort.start_index,
    ]),
    [
      segmentEffortsWithSegment[segmentEffortsWithSegment.length - 1]
        .segmentEffort.end_index,
      latLngStream.length - 1,
    ],
  ].map(([start, end]) => ({
    latlng: latLngStream.slice(start, end),
    type: "regular",
  }));

  const segmentSections: Section[] = segmentEffortsWithSegment.map(
    ({ segmentEffort, segment }) => ({
      latlng: latLngStream.slice(
        segmentEffort.start_index,
        segmentEffort.end_index
      ),
      type: segment!.type as "sprint" | "climb",
    })
  );

  return { activity, sections: [...regularSections, ...segmentSections] };
}

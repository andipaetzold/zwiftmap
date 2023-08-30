import { LatLngTuple } from "leaflet";
import { DetailedSegmentEffort, LatLngStream } from "strava";
import { Segment, segments, SegmentType } from "zwift-data";
import { useStravaActivity } from "../../../../react-query";
import { LocationStateStravaActivity } from "../../../../services/location-state";
import { DistanceStream } from "../../../../types";
import { getSectionsFromIntervals } from "../../../../util/sections";
import { SectionsPane } from "./components/SectionsPane";

const ID = "OverlaySegments-StravaActivityOverlay";
const SEGMENTS_TO_DISPLAY: SegmentType[] = ["sprint", "climb"];

interface Props {
  state: LocationStateStravaActivity;

  streams?: {
    latlng: LatLngStream;
    distance: DistanceStream;
  };
}

export function StravaActivityOverlay({ state }: Props) {
  const { data } = useStravaActivity(state.stravaActivityId, {
    select: (activity) => {
      const segmentEffortsWithSegment = activity.segmentEfforts
        .map((segmentEffort) => ({
          segmentEffort,
          segment: segments.find(
            (segment) => segment.stravaSegmentId === segmentEffort.segment.id,
          ),
        }))
        .filter(
          ({ segment }) =>
            segment && SEGMENTS_TO_DISPLAY.includes(segment.type),
        ) as {
        segmentEffort: DetailedSegmentEffort;
        segment: Segment;
      }[];

      if (!activity.streams.latlng) {
        throw new Error("Missing LatLng stream");
      }

      const sections = getSectionsFromIntervals<
        LatLngTuple,
        { segmentEffort: DetailedSegmentEffort; segment: Segment }
      >(
        activity.streams.latlng,
        segmentEffortsWithSegment,
        ({ segmentEffort }) => [
          segmentEffort.start_index,
          segmentEffort.end_index,
        ],
      );

      return {
        activity,
        sections: sections.map((section) => ({
          latlng: section.stream,
          type:
            (section.ref?.segment.type as "sprint" | "climb" | undefined) ??
            ("regular" as const),
        })),
      };
    },
  });

  if (!data) {
    return null;
  }

  if (!data.activity.streams.latlng) {
    return null;
  }

  return <SectionsPane id={`${ID}-route`} sections={data.sections} />;
}

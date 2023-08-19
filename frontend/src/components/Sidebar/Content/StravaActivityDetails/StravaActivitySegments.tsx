import { ListSubheader, SimpleListItem } from "@react-md/list";
import { DetailedSegment, DetailedSegmentEffort } from "strava";
import { Segment, segments } from "zwift-data";
import { useStore } from "../../../../hooks/useStore";
import { StravaActivity } from "../../../../services/StravaActivityRepository";
import { HoverStateType } from "../../../../types";
import { Distance } from "../../../Distance";
import { Time } from "../../../Time";

type SegmentEffort = DetailedSegmentEffort & {
  segment: DetailedSegment;
  average_watts: number | null;
};

interface Props {
  activity: StravaActivity;
}

export function StravaActivitySegments({ activity }: Props) {
  const setHoverState = useStore((state) => state.setHoverState);
  const routesInActivity = activity.segmentEfforts
    .map((segmentEffort) => ({
      segment: segments.find(
        (segment) =>
          (segmentEffort as SegmentEffort).segment.id ===
          segment.stravaSegmentId,
      ),
      segmentEffort,
    }))
    .filter(({ segment }) => !!segment) as {
    segment: Segment;
    segmentEffort: SegmentEffort;
  }[];

  if (routesInActivity.length === 0) {
    return null;
  }

  return (
    <>
      <ListSubheader>Segments</ListSubheader>

      {routesInActivity.map(({ segment, segmentEffort }) => (
        <SimpleListItem
          key={segmentEffort.id}
          threeLines
          primaryText={segment.name}
          secondaryText={<SecondaryText segmentEffort={segmentEffort} />}
          onMouseEnter={() =>
            setHoverState({
              type: HoverStateType.HighlightSegment,
              segment: segment.slug,
            })
          }
          onMouseLeave={() => setHoverState(undefined)}
        />
      ))}
    </>
  );
}

interface SecondaryTextProps {
  segmentEffort: SegmentEffort;
}

function SecondaryText({ segmentEffort }: SecondaryTextProps) {
  return (
    <>
      <Distance distance={segmentEffort.distance / 1_000} />
      <br />
      {segmentEffort.average_watts !== null ? (
        <>{Math.round(segmentEffort.average_watts)}W | </>
      ) : null}
      <Time seconds={segmentEffort.moving_time} />
    </>
  );
}

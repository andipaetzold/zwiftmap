import { List, ListSubheader, SimpleListItem } from "@react-md/list";
import { Typography } from "@react-md/typography";
import { Route, Segment, segments, SegmentType } from "zwift-data";
import { FORMAT_INCLINE, WORLDS_BY_SLUG } from "../../../../constants";
import { useStore } from "../../../../hooks/useStore";
import { useStravaSegment } from "../../../../react-query";
import { HoverStateType } from "../../../../types";
import { Distance } from "../../../Distance";
import { ListItemState } from "../../../ListItemState";
import { Time } from "../../../Time";

interface Props {
  route: Route;
}

export function RouteSegments({ route }: Props) {
  const setHoverState = useStore((state) => state.setHoverState);

  const segmentsOnRoute = segments
    .filter((s) => s.world === route.world)
    .filter((s) => route.segments.includes(s.slug))
    .sort((a, b) => a.name.localeCompare(b.name));

  if (segmentsOnRoute.length === 0) {
    return (
      <List
        role="list"
        aria-labelledby="route-segments-header"
        style={{ marginTop: 0, marginBottom: 0 }}
      >
        <ListSubheader role="presentation" id="route-segments-header">
          Segments
        </ListSubheader>
        <SimpleListItem>
          <Typography type="body-2">No segments on this route.</Typography>
        </SimpleListItem>
      </List>
    );
  }

  return (
    <List
      role="list"
      aria-labelledby="route-segments-header"
      style={{ marginTop: 0, marginBottom: 0 }}
    >
      <ListSubheader role="presentation" id="route-segments-header">
        Segments
      </ListSubheader>
      {segmentsOnRoute.map((segment) => (
        <ListItemState
          key={segment.slug}
          rightAddonType="icon"
          secondaryText={<SecondaryText segment={segment} />}
          threeLines
          state={{
            type: "segment",
            segment: segment,
            world: WORLDS_BY_SLUG[segment.world],
          }}
          onMouseEnter={() =>
            setHoverState({
              type: HoverStateType.HighlightSegment,
              segment: segment.slug,
            })
          }
          onMouseLeave={() => setHoverState(undefined)}
        >
          {segment.name}
        </ListItemState>
      ))}
    </List>
  );
}

interface SecondaryTextProps {
  segment: Segment;
}

function SecondaryText({ segment }: SecondaryTextProps) {
  const { data: stravaSegment } = useStravaSegment(segment.stravaSegmentId);
  const segmentPB =
    (stravaSegment?.athlete_segment_stats.effort_count ?? 0) > 0
      ? stravaSegment?.athlete_segment_stats.pr_elapsed_time
      : null;

  return (
    <>
      <Distance distance={segment.distance} />
      {segment.avgIncline && (
        <> | {FORMAT_INCLINE.format(segment.avgIncline / 100)}</>
      )}
      <br />
      {segmentPB ? (
        <>
          PB: <Time seconds={segmentPB} />
        </>
      ) : (
        segmentTypes[segment.type]
      )}
    </>
  );
}

const segmentTypes: { [type in SegmentType]: string } = {
  climb: "Climb",
  sprint: "Sprint",
  segment: "Segment",
};
